from django.urls import path
from . import views
from . import views as mydesksethub_api_views


urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    # path('posts/', views.getPosts, name="posts"),
    # path('posts/<str:pk>/', views.getPost, name="post"),
    # path('create/', views.postPost, name="createPost"),
    
    path('posts/', mydesksethub_api_views.UserPostList.as_view()),
    path('posts/create/', mydesksethub_api_views.UserPostCreate.as_view()),

]