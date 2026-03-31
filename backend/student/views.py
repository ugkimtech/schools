from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from .serializers import StudentSeralizer, ManageStudentSeralizer
from .models import StudentProfile
from school.models import SchoolProfile
from staff.models import Staff
from users.permissions import IsSchooolAdmin, IsStaffMember, IsStudent


class RegisterStudent(CreateAPIView):
    queryset = StudentProfile.objects.all()
    serializer_class = StudentSeralizer
    permission_classes = [IsSchooolAdmin]
    
    
class ManageStudent(ModelViewSet):
    serializer_class = ManageStudentSeralizer
    permission_classes = [IsSchooolAdmin | IsStaffMember | IsStudent]
    
    def initial(self, request, *args, **kwargs):
        if request.user.groups.filter(name='student').exists():
            self.http_method_names = ['get', 'head', 'options']
        super().initial(request, *args, **kwargs)
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return StudentProfile.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(user=user).school
            return StudentProfile.objects.filter(school=school)
        return StudentProfile.objects.filter(student_user=user)