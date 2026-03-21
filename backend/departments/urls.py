from rest_framework.routers import DefaultRouter
from .views import ManageDepartments

router = DefaultRouter()
router.register(r'manage-departments',ManageDepartments, basename='manage_departments')

urlpatterns = router.urls