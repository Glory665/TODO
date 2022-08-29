from django.db import models
from users.models import TodoUser


class Project(models.Model):
    name = models.CharField(max_length=64)
    repository = models.URLField(blank=True)
    users = models.ManyToManyField(TodoUser)

    def __str__(self):
        return self.name


class ToDo(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    text = models.TextField()
    date_create = models.DateTimeField(auto_now_add=True)
    date_update = models.DateTimeField(auto_now=True)
    client = models.ForeignKey(TodoUser, on_delete=models.PROTECT)
    is_active = models.BooleanField(default=True)
