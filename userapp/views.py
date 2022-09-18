from rest_framework import generics, permissions
from users.models import TodoUser
from .serializers import UserModelSerializer, UserModelSerializerFlag


class UserListAPIView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = TodoUser.objects.all()
    serializer_class = UserModelSerializer

    def get_serializer_class(self):
        if self.request.version == 'v2':
            return UserModelSerializerFlag
        return UserModelSerializer
