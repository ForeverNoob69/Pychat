from django.urls import path
from . import views
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile',views.profileAPI,name="profile"),
    path('message',views.messageAPI),
    path('room',views.roomAPI),
    path('user/<str:pk>',views.userAPI,name="user"),

]
