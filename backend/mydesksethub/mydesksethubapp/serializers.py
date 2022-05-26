from rest_framework import serializers
from .models import *

class UserPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPost
        fields = '__all__'
        
class PostCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostComment
        fields = '__all__'

class PostVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostVote
        fields = '__all__'