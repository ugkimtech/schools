from rest_framework.viewsets import ModelViewSet
from .serializers import StudentAttendenceSerializer, StaffAttendenceSerializer
from .models import StaffAttendence, StudentAttendence, SchoolProfile
from staff.models import Staff


class StudentAttendenceView(ModelViewSet):
    serializer_class = StudentAttendenceSerializer
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return StudentAttendence.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(user=user).school
            return StudentAttendence.objects.filter(school=school)
        return StudentAttendence.objects.filter(school=school)

class StaffAttendenceView(ModelViewSet):
    serializer_class = StaffAttendenceSerializer
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return StaffAttendence.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(user=user).school
            return StaffAttendence.objects.filter(school=school)