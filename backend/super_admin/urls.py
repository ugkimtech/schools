from rest_framework.routers import DefaultRouter
from .views import FetchSchools


router = DefaultRouter()
router.register('all-schools', FetchSchools)

urlpatterns = router.urls