from rest_framework import serializers
from mydesksethubusers.models import User
from mydesksethubusers.models import Profile
from mydesksethubapp.models import UserPost
from mydesksethubapp.serializers import UserPostSerializer
from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer

class ProfileSerializer(serializers.ModelSerializer):
    user_userposts = serializers.SerializerMethodField()
    def get_user_userposts(self, obj):
        query = UserPost.objects.filter(user=obj.user)
        userposts_serialized = UserPostSerializer(query, many=True)
        return userposts_serialized.data
    
    class Meta:
        model = Profile
        fields = '__all__'
        
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('url', 'id', 'email', 'name', 'last_name', 'account_address', 'password', )
        
