from rest_framework import serializers
from django.contrib.auth.models import User, Group
from django.db import IntegrityError
from .models import SchoolProfile


class SchoolSerializer(serializers.ModelSerializer):
    username = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True)
    
    class Meta:
        model = SchoolProfile
        fields = [
            'username', 'password', 'email', 'school_name', 'motto', 'level', 'phone', 'address', 'district', 'region',
            'website', 'reg_number', 'ownership', 'UNEB_No', 'badge']
            
        
    def create(self, validated_data):
        try:
            username = validated_data.pop('username')
            password = validated_data.pop('password')
            email = validated_data.pop('email')
            
            school_admin = User.objects.create_user(
                username=username,
                password=password,
                email=email
            )
            groups, _created = Group.objects.get_or_create(name='school')
            school_admin.groups.add(groups)
        except IntegrityError:
            raise serializers.ValidationError({'username':'Username alresdy exists, try another one'})
        try:
            school_profile = SchoolProfile.objects.create(school_admin=school_admin, **validated_data)
            return school_profile
        except Exception as Se:
            print(Se)
            return Se


class MySchoolSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='school_admin.username')
    email = serializers.EmailField(source='school_admin.email')
    groups = serializers.SlugRelatedField(
                                          many=True, read_only=True, 
                                          slug_field='name', 
                                          source='school_admin.groups'
                                        )
    is_active = serializers.CharField(source='school_admin.is_active')
    class Meta:
        model = SchoolProfile
        fields = [
                  'username', 'email', 'groups', 'is_active', 
                  'subscription_expiry_date', 'school_name', 'motto', 
                  'level', 'ownership', 'phone', 'address', 'district', 
                  'region', 'website', 'reg_number', 'UNEB_No', 'badge'
                ]


class SchoolPublicSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='school_admin.email')
    is_active = serializers.CharField(source='school_admin.is_active')
    class Meta:
        model = SchoolProfile
        fields = [
                  'email','is_active', 'school_name', 'motto', 
                  'level', 'ownership', 'phone', 'address', 'district', 
                  'region', 'website', 'reg_number', 'UNEB_No', 'badge'
                ]