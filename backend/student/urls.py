from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterStudent, ManageStudent


router = DefaultRouter()
router.register(r'student', ManageStudent, basename='manage_student')

urlpatterns = [
    path('new-student/', RegisterStudent.as_view()),
    path('', include(router.urls)),
]