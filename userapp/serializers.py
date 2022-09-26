from rest_framework.serializers import ModelSerializer

from users.models import TodoUser


class UserModelSerializer(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email')


class UserModelSerializerFlag(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email', 'is_staff', 'is_superuser')
