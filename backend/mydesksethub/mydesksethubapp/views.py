from django.shortcuts import render
from .serializers import *
from .models import *
# from rest_framework.decorators import api_view
# from rest_framework.response import Response

from rest_framework import generics
# Create your views here.

# @api_view(['GET','POST'])
# def getRoutes(request):
#     return Response('Hello')

# @api_view(['GET','POST'])
# def getPosts(request):
#     posts = UserPost.objects.all()
#     serializer = UserPostSerializer(posts, many=True)
#     return Response(serializer.data)


# @api_view(['GET','POST'])
# def getPost(request, pk):
#     post = UserPost.objects.get(id=pk)
#     serializer = UserPostSerializer(post, many=False)
#     return Response(serializer.data)

# @api_view(['POST'])
# def postPost(request):
#     createPost = UserPost.objects.create()
#     serializer = UserPostCreateSerializer(createPost, many=False)
#     return Response(serializer.data)

#

class UserPostList(generics.ListAPIView):
    queryset = UserPost.objects.all()
    serializer_class = UserPostSerializer
    
class UserPostCreate(generics.CreateAPIView):
    queryset = UserPost.objects.all()
    serializer_class = UserPostSerializer
    
class UserPostDetail(generics.RetrieveAPIView):
    queryset = UserPost.objects.all()
    serializer_class = UserPostSerializer
    lookup_field = 'id'
    
class UserPostDelete(generics.DestroyAPIView):
    queryset = UserPost.objects.all()
    serializer_class = UserPostSerializer
    lookup_field = 'id'
