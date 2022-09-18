from django.shortcuts import render
from rest_framework import mixins, viewsets, permissions

from .models import TodoUser
from .serializers import TodoModelSerializer


class TodoModelViewSet(mixins.CreateModelMixin, mixins.ListModelMixin,
                       mixins.RetrieveModelMixin, viewsets.GenericViewSet):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = TodoUser.objects.all()
    serializer_class = TodoModelSerializer