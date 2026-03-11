from rest_framework.routers import DefaultRouter
from .views import Exams, StudentResults, Terms, Subjects


router = DefaultRouter()
router.register(r'exams', Exams, basename='exams')
router.register(r'results', StudentResults, basename='results')
router.register(r'terms', Terms, basename='terms')
router.register(r'subjects', Subjects, basename='subjects')

urlpatterns = router.urls