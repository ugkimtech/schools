from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ResetPassword, GetUser
from .views import GetGroups


router = DefaultRouter()
router.register('reset-password', ResetPassword, basename='reset_password')
router.register('getuser', GetUser, basename='getuser')
router.register('groups', GetGroups, basename='get_groups')

urlpatterns = router.urls