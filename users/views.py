from django.shortcuts import render
from rest_framework import mixins, viewsets

from rest_framework.viewsets import ModelViewSet

from .models import TodoUser
from .serializers import TodoModelSerializer


class TodoModelViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoModelSerializer