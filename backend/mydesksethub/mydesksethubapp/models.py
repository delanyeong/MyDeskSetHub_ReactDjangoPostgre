from django.db import models
from django.conf import settings

# Create your models here.
class UserPost(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    
    name = models.CharField(blank=True, max_length=200, null=True)
    image = models.ImageField(null=True, blank=True)
    brand = models.CharField(blank=True, max_length=200, null=True)
    category = models.CharField(blank=True, max_length=200, null=True)
    description = models.TextField(blank=True, null=True)
    link = models.TextField(blank=True, null=True)
    price = models.DecimalField(max_digits=7, decimal_places=2, null=True, blank=True)
    
    vote_rank = models.IntegerField(blank=True, null=True, default=0)
    votes = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name='userpost_user', blank=True, through='PostVote')
    
    comment_count = models.IntegerField(blank=True, null=True, default=0)
    
    createdAt = models.DateTimeField(blank=True, auto_now_add=True)
    
    def __str__(self):
        return self.name
    
class PostComment(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
        
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey('UserPost', on_delete=models.CASCADE, null=True)
        
    name = models.CharField(blank=True, max_length=200, null=True)
    rating = models.IntegerField(blank=True, null=True, default=0)
    comment = models.TextField(blank=True, null=True)
        
    def __str__(self):
        return self.user
    
class PostVote(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
        
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True)
    post = models.ForeignKey('UserPost', on_delete=models.CASCADE, null=True)
        
    def __str__(self):
        return self.user
    