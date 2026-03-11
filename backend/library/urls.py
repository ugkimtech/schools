from rest_framework.routers import DefaultRouter
from .views import Books, Copies, Borrowing

router = DefaultRouter()
router.register(r'books', Books, basename='books')
router.register(r'copies', Copies, basename='copies')
router.register(r'borrowing', Borrowing, basename='borrowing')

urlpatterns = router.urls