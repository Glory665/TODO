import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, APIClient, APITestCase
from mixer.backend.django import mixer

from users.models import TodoUser
from users.views import TodoModelViewSet
from .models import Project
from .views import ToDoViewSet, ProjectViewSet


class TestTodoViewSet(TestCase):

    def setUp(self):
        self.url = '/api/todo/'
        self.todo = {'text': 'Good Day', 'project': 'Good', 'client': 'glory'}
        self.format = 'json'

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ToDoViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.todo, self.format)
        view = ToDoViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self) -> None:
        pass


class TestProjectViewSet(TestCase):

    def setUp(self):
        self.url = '/api/project/'
        self.format = 'json'

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = ProjectViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def tearDown(self) -> None:
        pass


class TestTodoUserViewSet(TestCase):

    def setUp(self):
        self.url = '/api/users/'
        self.user_dict = {'username': 'glory66', 'first_name': 'L', 'last_name': 'Li', 'email': 'glory66@gmail.com'}
        self.user_dict_fake = {'username': 'glo6', 'first_name': 'M', 'last_name': 'N', 'email': 'glory6@gmail.com'}
        self.format = 'json'
        self.login = 'admin'
        self.password = 'pass_WhjkUJjkh12'
        self.admin = TodoUser.objects.create_superuser(self.login, 'admin@mail.com', self.password)
        self.users = TodoUser.objects.create(**self.user_dict)

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        view = TodoModelViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.user_dict, self.format)
        view = TodoModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_detail(self):
        client = APIClient()
        response = client.get(f'{self.url}{self.users.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_client_update_guest(self):
        client = APIClient()
        response = client.put(f'{self.url}{self.users.id}/', self.user_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_api_client_update_admin(self):
        client = APIClient()
        client.force_authenticate(user=self.admin)
        response = client.put(f'{self.url}{self.users.id}/', self.user_dict_fake, format=self.format)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.users.refresh_from_db()
        self.assertEqual(self.users.username, self.user_dict_fake.get('username'))
        self.assertEqual(self.users.first_name, self.user_dict_fake.get('first_name'))
        self.assertEqual(self.users.last_name, self.user_dict_fake.get('last_name'))
        self.assertEqual(self.users.email, self.user_dict_fake.get('email'))
        client.logout()

    def tearDown(self) -> None:
        pass


class TestTodoUsers(APITestCase):

    def setUp(self):
        self.url = '/api/users/'
        self.user_dict = {'username': 'glory66', 'first_name': 'L', 'last_name': 'Li', 'email': 'glory66@gmail.com'}
        self.user_dict_fake = {'username': 'glo6', 'first_name': 'M', 'last_name': 'N', 'email': 'glory6@gmail.com'}
        self.format = 'json'
        self.login = 'admin'
        self.password = 'pass_WhjkUJjkh12'
        self.admin = TodoUser.objects.create_superuser(self.login, 'admin@mail.com', self.password)
        self.users = TodoUser.objects.create(**self.user_dict)

    def test_api_test_case_list(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_api_test_case_update_admin(self):
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'{self.url}{self.users.id}/', self.user_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mixer(self):
        users = mixer.blend(TodoUser)
        self.client.force_authenticate(user=self.admin)
        response = self.client.put(f'{self.url}{users.id}/', self.user_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_mixer_1(self):
        users = mixer.blend(TodoUser)
        response = self.client.put(f'{self.url}{users.id}/', self.user_dict_fake)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def tearDown(self) -> None:
        pass
