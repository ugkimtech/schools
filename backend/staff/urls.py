from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CreateStaff, ManageStaff


router = DefaultRouter()
router.register(r'manage-staff', ManageStaff, basename='manage_staff')

urlpatterns = [
    path('new-staff/', CreateStaff.as_view()),
    path('', include(router.urls))
]