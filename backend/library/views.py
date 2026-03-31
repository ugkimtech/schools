from rest_framework.viewsets import ModelViewSet
from .serializers import BookSerializer, BookCopySerializer, BookBorrowingSerializer
from users.permissions import IsSchooolAdmin, IsStaffMember, IsStudent
from school.models import SchoolProfile
from staff.models import Staff
from student.models import StudentProfile
from .models import Book, BookCopy, BookBorrowing


class Books(ModelViewSet):
    serializer_class = BookSerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Book.objects.filter(school=school)
        else:
            staff = Staff.objects.filter(user=user)
            return Book.objects.filter(school=staff.school)


class Copies(ModelViewSet):
    serializer_class = BookCopySerializer
    permission_classes = [IsSchooolAdmin | IsStaffMember]
    
    def get_queryset(self):
        user = self.request.user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return BookCopy.objects.filter(school=school)
        else:
            staff = Staff.objects.filter(user=user)
            return BookCopy.objects.filter(school=staff.school)


class Borrowing(ModelViewSet):
    serializer_class = BookBorrowingSerializer
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
            return BookBorrowing.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            staff = Staff.objects.filter(user=user)
            return BookBorrowing.objects.filter(school=staff.school)
        student = StudentProfile.objects.get(student_user=user)
        return BookBorrowing.objects.filter(borrower=student.student_user)