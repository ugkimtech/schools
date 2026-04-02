from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.models import Group
from django.db import transaction, IntegrityError
from rest_framework.validators import UniqueValidator
from school.models import SchoolProfile
from departments.models import Department
from classes.models import Classes
from academics.models import Subject
from .models import Staff
from school.serializers import SchoolPublicSerializer


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']
        
        
class StaffSerializer(serializers.ModelSerializer):
    user = UserSerializer(write_only=True)
    subjects_taught = serializers.PrimaryKeyRelatedField(
        queryset=Subject.objects.all(),
        many=True,
        required=False
    )
    classes_taught = serializers.PrimaryKeyRelatedField(
        queryset=Classes.objects.all(),
        many=True,
        required=False
    )
    departments = serializers.PrimaryKeyRelatedField(
        queryset=Department.objects.all(),
        many=True,
        required=False
    )
    groups = serializers.PrimaryKeyRelatedField(
        queryset=Group.objects.all(),
        many=True,
        required=False,
        write_only=True
    )
    
    class Meta:
        model = Staff
        fields=['user', 'groups', 'other_name','gender', 'date_of_birth', 
                'NIN','photo','phone','alt_phone', 'address' ,'district', 
                'emergence_contact_name','emergence_phone', 'departments',
                'employment_type' ,'contract_start','contract_end', 'qualification',
                'experience','subjects_taught','classes_taught', 'reg_number',
                'license_number', 'salary','bank_name','account_number',
                'tin_number', 'nssf_number', 'certificate', 'contract_document']
    
    def to_internal_value(self, data):
        user_data = {
            'email':data.get('user.email'),
            'first_name':data.get('user.first_name'),
            'last_name':data.get('user.last_name'),
            'password':data.get('user.password')
        }
        data['user'] = user_data
        return super().to_internal_value(data)
        
    @transaction.atomic
    def create(self, validated_data):
        user_data = validated_data.pop('user')
        groups = validated_data.pop('groups', [])
        # user
        user = User.objects.create_user(
            username = 'default-username',
            email=user_data['email'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            password=user_data['password']
        )
        from users.services import IDGenerator
        username = IDGenerator().staff_ID(user.id, 'STA-', 6)
        user.username = username
        user.save()
        
        # profile
        try:
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            staff = User.objects.get(id=user.id)
            staff.delete()
            raise serializers.ValidationError(
                        {'school_profile':'Not a school admin, please login as a school admin to continue.'}
                    )
        
        try:
            subjects_taught = validated_data.pop('subjects_taught')
            classes_taught = validated_data.pop('classes_taught')
            departments = validated_data.pop('departments')
            
            staff = Staff.objects.create(user=user, school=school, **validated_data)
            
            if 'subjects_taught' in validated_data:
                staff.subjects_taught.set(subjects_taught)
                
            if 'classes_taught' in validated_data:
                staff.classes_taught.set(classes_taught)
            
            if 'departments' in validated_data:
                staff.departments.set(departments)
            
            if groups:
                user.groups.set(groups)
                
            return staff
        except Exception as e:
            staff = User.objects.get(id=user.id)
            staff.delete()
            raise serializers.ValidationError(
                        {'staff_error':'An Error occured during addition of a Staff member.', 'error':e}
                    )


class ManageStaffSerializer(serializers.ModelSerializer):
    school = SchoolPublicSerializer(read_only=True)
    username = serializers.CharField(source='user.username')
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    allowed_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
    groups = serializers.SlugRelatedField(
                                    many=True,
                                    slug_field='name',
                                    source='user.groups',
                                    read_only=True
                                )
    is_active = serializers.CharField(source='user.is_active')
    
    class Meta:
        model = Staff
        fields=['school', 'username', 'groups', 'first_name', 'last_name', 'email', 'is_active', 'groups',
                'other_name','gender', 
                'date_of_birth', 'NIN','photo','phone','alt_phone','email',
                'address' ,'district', 'emergence_contact_name','emergence_phone',
                'departments','employment_type' ,'contract_start','contract_end' ,
                'qualification','experience','subjects_taught','classes_taught',
                'reg_number','license_number', 'salary','bank_name','account_number',
                'tin_number', 'nssf_number', 'certificate', 'contract_document']