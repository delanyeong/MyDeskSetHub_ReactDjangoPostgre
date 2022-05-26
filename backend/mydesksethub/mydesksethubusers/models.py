from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    email = models.EmailField(unique=True)
    profile_name = models.CharField(blank=True, max_length=200, null=True)
    profile_pic = models.ImageField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    id = models.UUIDField(default=uuid.uuid4,  unique=True, primary_key=True, editable=False)