from rest_framework.permissions import BasePermission
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.models import Group
from staff.models import Staff
from student.models import StudentProfile


class IsSuperAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        return bool(user and user.is_authenticated and user.is_superuser)


class IsSchooolAdmin(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        is_school = user.groups.filter(name='school').exists()
        return bool(
                    user and user.is_authenticated and 
                    user.is_active and is_school
                )


class IsStaffMember(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        allowed_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        is_staff = user.groups.filter(name__in=allowed_groups).exists()
        is_school_active = False
        if is_staff:
            user = User.objects.get(username=user.username)
            staff = Staff.objects.get(user=user)
            is_school_active = staff.school.school_admin.is_active
        return bool(
                    user and user.is_authenticated and user.is_active
                    and is_staff and is_school_active
                )
        
        
class IsStudent(BasePermission):
    def has_permission(self, request, view):
        user = request.user
        is_student = user.groups.filter(name = 'student').exists()
        is_school_active = False
        if is_student:
            user = User.objects.get(username=user.username)
            student = StudentProfile.objects.get(student_user=user)
            is_school_active = student.school.school_admin.is_active
        return bool(
                    user and user.is_authenticated and user.is_active
                    and is_student and is_school_active
                )
        

class GrantPermisions:
    def add_permission(self, user, permission):#permission is a group
        permission, _created = Group.objects.get_or_create(name=permission)
        user = User.objects.get(username=user.username)
        user.groups.add(name=permission)
    
    def remove_permission(self, user, permission):
        permission, _created = Group.objects.get_or_create(name=permission)
        user = User.objects.get(username=user.username)
        user.groups.remove(name=permission)