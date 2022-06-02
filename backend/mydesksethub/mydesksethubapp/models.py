# from cgitb import text
from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()

# Create your models here.
class UserPost(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    
    name = models.CharField(blank=True, max_length=200, null=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(blank=True, max_length=200, null=True)
    category = models.CharField(blank=True, max_length=200, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)    
    
    def __str__(self):
        return self.name
    
# class PostComment(models.Model):
#     id = models.AutoField(primary_key=True, editable=False)
        
#     post = models.ForeignKey('UserPost', on_delete=models.CASCADE, null=True)
        
#     text = models.CharField(blank=True, max_length=200, null=True)
#     rating = models.IntegerField(blank=True, null=True, default=0)
        
#     def __str__(self):
#         return self.text