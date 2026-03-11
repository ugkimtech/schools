from django.urls import path
from .views import CreateSchool, MySchool


urlpatterns = [
    path('create-school/',CreateSchool.as_view()),
    path('my-school/', MySchool.as_view())
]