from rest_framework.serializers import HyperlinkedModelSerializer,ModelSerializer


from  .models import TodoUser


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = TodoUser
        fields = ('username', 'first_name', 'last_name', 'email')