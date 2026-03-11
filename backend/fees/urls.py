from rest_framework.routers import DefaultRouter
from .views import CreateFeeItem, StudentPayments


router = DefaultRouter()
router.register(r'new-fee-item', CreateFeeItem, basename='new_fee_item')
router.register(r'payments',StudentPayments, basename='payments')

urlpatterns = router.urls