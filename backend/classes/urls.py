from rest_framework.routers import DefaultRouter
from .views import ManageClasses

router = DefaultRouter()
router.register(r'manage-classes', ManageClasses, basename='manage_classes')

urlpatterns = router.urls