from rest_framework.viewsets import ModelViewSet
from fees.models import FeeItem, Payment
from .serializers import CreateFeeItemSerializer, PaymentSerializer, StudentFeeSerializer
from users.permissions import IsSchooolAdmin, IsStudent, IsStaffMember
from school.models import SchoolProfile
from staff.models import Staff
from student.models import StudentProfile


class CreateFeeItem(ModelViewSet):
    queryset = FeeItem.objects.all()
    serializer_class = CreateFeeItemSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]


class StudentPayments(ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember | IsStudent]
    http_method_names = ['post',' get', 'put', 'patch' 'delete']
    
    def initial(self, request, *args, **kwargs):
        if request.user.groups.filter(name='student').exists():
            self.http_method_names = ['get']
            super().initial(request, *args, **kwargs)
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Payment.objects.filter(school=school)
        elif user.groups.filter(name='student').exists():
            student = StudentProfile.objects.get(student_user=user)
            return Payment.objects.filter(student=student)
        else:
            school = Staff.objects.get(staff_user=user).school
            return Payment.objects.filter(school=school)
        
    '''def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Payment.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(staff_user=user).school
            return Payment.objects.filter(school=school)
        self.http_method_names = ['get']
        student = StudentProfile.objects.get(student_user=user)
        return Payment.objects.filter(student=student)'''