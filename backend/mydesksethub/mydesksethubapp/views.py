from django.shortcuts import render
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
# Create your views here.

@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')

@api_view(['GET'])
def getPosts(request):
    posts = UserPost.objects.all()
    serializer = UserPostSerializer(posts, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getPost(request, pk):
    post = UserPost.objects.get(id=pk)
    serializer = UserPostSerializer(post, many=False)
    return Response(serializer.data)
