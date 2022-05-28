from rest_framework import serializers
from .models import *

class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = '__all__'
        
# class UserPostCreateSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserPost
#         fields = '__all__'
        
class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = '__all__'

