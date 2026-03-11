from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.models import Group
from django.db import IntegrityError
from rest_framework.validators import UniqueValidator
from school.models import SchoolProfile
from departments.models import Department
from classes.models import Classes
from academics.models import Subject
from .models import Staff
from school.serializers import SchoolPublicSerializer


class StaffSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    allowed_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
    groups = serializers.PrimaryKeyRelatedField(queryset=Group.objects.filter(name__in=allowed_groups), many=True, write_only=True)
    departments = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all(), many=True)#user should send id, not text
    subjects_taught = serializers.PrimaryKeyRelatedField(queryset=Subject.objects.all(), many=True)
    classes_taught = serializers.PrimaryKeyRelatedField(queryset=Classes.objects.all(), many=True)
    
    class Meta:
        model = Staff
        fields=['password', 'first_name', 'last_name', 'email', 'groups',
                'staff_id','other_name','gender', 
                'date_of_birth', 'NIN','photo','phone','alt_phone','email',
                'address' ,'district', 'emergence_contact_name','emergence_phone',
                'departments','employment_type' ,'contract_start','contract_end' ,
                'qualification','experience','subjects_taught','classes_taught',
                'reg_number','license_number', 'salary','bank_name','account_number',
                'tin_number', 'nssf_number', 'certificate', 'contract_document']
        
        #NOTE: role = grous in users.app
        
    
    def create(self, validated_data):
        try:
            username = 'default-username'
            password = validated_data.pop('password')
            email = validated_data.pop('email')
            first_name = validated_data.pop('first_name')
            last_name = validated_data.pop('last_name')
            
            try:
                staff_user = User.objects.create_user(
                    username=username,
                    password=password,
                    email=email,
                    first_name=first_name,
                    last_name=last_name
                )
                from users.services import IDGenerator
                username = IDGenerator().staff_ID(staff_user.id, 'STA-', 6)
                staff_user.username = username
                staff_user.save()
                groups = validated_data.pop('groups', [])
                staff_user.groups.set(groups)
            except IntegrityError:
                raise serializers.ValidationError(
                                {'username':'Error while generating Staff ID, please try again'}
                            )
            
            try:
                school_admin = self.context['request'].user
                staff_school = SchoolProfile.objects.get(school_admin=school_admin)
            except SchoolProfile.DoesNotExist:
                staff = User.objects.get(id=staff_user.id)
                staff.delete()
                raise serializers.ValidationError(
                            {'school_profile':'Not a school admin, please login as a school admin to continue.'}
                        )
            
            try:
                departments = validated_data.pop('departments', [])
                subjects_taught = validated_data.pop('subjects_taught', [])
                classes_taught= validated_data.pop('classes_taught', [])
                
                staff_member = Staff.objects.create(
                    staff_user=staff_user,
                    school=staff_school,
                    **validated_data
                )
                #To match the staff_id with their username
                gen_username = IDGenerator().staff_ID(staff_member.id, 'STA-', 6)
                staff_member.staff_user.username = gen_username
                staff_member.staff_user.save()

                staff_member.departments.set(departments)
                staff_member.subjects_taught.set(subjects_taught)
                staff_member.classes_taught.set(classes_taught)
                return staff_member
            except Exception as e:
                staff = User.objects.get(id=staff_user.id)
                staff.delete()
                raise serializers.ValidationError(
                            {'staff_error':'An Error occured during addition of a Staff member.', 'error':e}
                        )
        except Exception as e:
            raise serializers.ValidationError(
                            {'staff_error':'An Error occured in the process. Try again', 'error':e}
                        )


class ManageStaffSerializer(serializers.ModelSerializer):
    school = SchoolPublicSerializer(read_only=True)
    username = serializers.CharField(source='staff_user.username')
    first_name = serializers.CharField(source='staff_user.first_name')
    last_name = serializers.CharField(source='staff_user.last_name')
    email = serializers.EmailField(source='staff_user.email')
    allowed_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
    groups = serializers.SlugRelatedField(
                                    many=True,
                                    slug_field='name',
                                    source='staff_user.groups',
                                    read_only=True
                                )
    is_active = serializers.CharField(source='staff_user.is_active')
    
    class Meta:
        model = Staff
        fields=['school', 'username', 'groups', 'first_name', 'last_name', 'email', 'is_active', 'groups',
                'staff_id','other_name','gender', 
                'date_of_birth', 'NIN','photo','phone','alt_phone','email',
                'address' ,'district', 'emergence_contact_name','emergence_phone',
                'departments','employment_type' ,'contract_start','contract_end' ,
                'qualification','experience','subjects_taught','classes_taught',
                'reg_number','license_number', 'salary','bank_name','account_number',
                'tin_number', 'nssf_number', 'certificate', 'contract_document']