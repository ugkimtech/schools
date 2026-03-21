from rest_framework.routers import DefaultRouter
from .views import ManageEvents


router = DefaultRouter()
router.register(r'manage-events', ManageEvents, basename='manage_events')

urlpatterns = router.urls