from rest_framework.viewsets import ModelViewSet
from .serializers import TermSerializer, ExamSerializer, ResultsSerializer, SubjectSerializer
from users.permissions import IsSchooolAdmin, IsStaffMember, IsStudent
from school.models import SchoolProfile
from staff.models import Staff
from .models import Term, Exam, Results, Subject


class Terms(ModelViewSet):
    serializer_class = TermSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Term.objects.filter(school=school)
        else:
            staff = Staff.objects.filter(staff_user=user)
            return Term.objects.filter(school=staff.school)


class Exams(ModelViewSet):
    serializer_class = ExamSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Exam.objects.filter(school=school)
        else:
            staff = Staff.objects.filter(staff_user=user)
            return Exam.objects.filter(school=staff.school)


class Subjects(ModelViewSet):
    serializer_class = SubjectSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Subject.objects.filter(school=school)
        else:
            staff = Staff.objects.filter(staff_user=user)
            return Subject.objects.filter(school=staff.school)


class StudentResults(ModelViewSet):
    serializer_class = ResultsSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember | IsStudent]
    
    def initial(self, request, *args, **kwargs):
        if request.user.groups.filter(name='student').exists():
            self.http_method_names = ['get']
            super().initial(request, *args, **kwargs)
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Results.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            staff = Staff.objects.filter(staff_user=user)
            return Results.objects.filter(school=staff.school)
        return Results.objects.filter(student_user=user)