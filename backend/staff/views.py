from rest_framework.generics import CreateAPIView
from rest_framework.viewsets import ModelViewSet
from users.permissions import IsSchooolAdmin, IsStaffMember
from .serializers import StaffSerializer, ManageStaffSerializer
from .models import Staff
from school.models import SchoolProfile


class CreateStaff(CreateAPIView):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [IsSchooolAdmin]
    

class ManageStaff(ModelViewSet):
    serializer_class = ManageStaffSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    http_method_names = ['get', 'put', 'patch' 'delete']
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Staff.objects.filter(school=school)
        return Staff.objects.filter(staff_user=user)