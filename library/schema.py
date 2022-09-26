import graphene
from graphene_django import DjangoObjectType
from todoApp.models import ToDo, Project
from users.models import TodoUser


class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'


class Query(graphene.ObjectType):
    all_todos = graphene.List(ToDoType)
    all_projects = graphene.List(ProjectType)
    all_users = graphene.List(TodoUserType)

    def resolve_all_todos(root, info):
        return ToDo.objects.all()

    def resolve_all_projects(root, info):
        return Project.objects.all()

    def resolve_all_users(root, info):
        return TodoUser.objects.all()


schema = graphene.Schema(query=Query)

'''
{
  allTodos {
    id
    text
    dateCreate
    dateUpdate
    client {
      id
    }
    project {
      id
      users {
        id
      }
    }
  }
  allProjects{
    id
    name
    repository
    users {
      id
    }
  }
  allUsers{
    username
    firstName
    lastName
    email
  }
}

'''