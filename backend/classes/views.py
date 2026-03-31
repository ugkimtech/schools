from rest_framework.viewsets import ModelViewSet
from .serializers import ClassSerializer
# from users.permissions import IsSchooolAdmin, IsStaffMember, IsStudent
from .models import Classes
from school.models import SchoolProfile
from staff.models import Staff

class ManageClasses(ModelViewSet):
    serializer_class = ClassSerializer
    # permission_classes = [IsSchooolAdmin, IsStaffMember, IsStudent]
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Classes.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(user=user).school
            return Classes.objects.filter(school=school)
        return Classes.objects.filter(school=school)