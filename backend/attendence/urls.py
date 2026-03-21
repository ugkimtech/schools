from rest_framework.routers import DefaultRouter
from .views import StudentAttendenceView, StaffAttendenceView

router = DefaultRouter()
router.register(r'student', StudentAttendenceView, basename='student_attendence')
router.register(r'staff', StaffAttendenceView, basename='staff_attendence')

urlpatterns = router.urls