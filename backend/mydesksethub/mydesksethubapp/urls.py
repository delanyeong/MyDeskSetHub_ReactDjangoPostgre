from django.urls import path
# from . import views
from . import views as mydesksethub_api_views
from mydesksethubusers.api import views as mydesksethubusers_api_views


urlpatterns = [
    # path('', views.getRoutes, name="routes"),
    # path('posts/', views.getPosts, name="posts"),
    # path('posts/<str:pk>/', views.getPost, name="post"),
    # path('create/', views.postPost, name="createPost"),
    
    path('posts/', mydesksethub_api_views.UserPostList.as_view()),
    path('posts/create/', mydesksethub_api_views.UserPostCreate.as_view()),
    path('posts/<uuid:user>/delete/', mydesksethub_api_views.UserPostDelete.as_view()),
    
    path('profiles/', mydesksethubusers_api_views.ProfileList.as_view()),
    path('profiles/<uuid:user>/', mydesksethubusers_api_views.ProfileDetail.as_view()),
    path('profiles/<uuid:user>/update/', mydesksethubusers_api_views.ProfileUpdate.as_view()),
    
    path('users/', mydesksethubusers_api_views.UserList.as_view()),


]