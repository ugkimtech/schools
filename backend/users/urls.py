from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ResetPassword, GetUser


router = DefaultRouter()
router.register('reset-password', ResetPassword, basename='reset_password')
router.register('getuser', GetUser, basename='getuser')

urlpatterns = router.urls