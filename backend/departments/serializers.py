from rest_framework import serializers
from .models import Department, SchoolProfile
from django.contrib.auth import get_user_model
User= get_user_model()


class DepartmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ['id', 'dep_name', 'dep_head']
        
    # handle get
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.dep_head:
            data['dep_head'] = instance.dep_head.first_name
        return data
    
    def create(self, validated_data):
        print(validated_data)
        try:
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            raise serializers.ValidationError(
                    {'school_profile':'Not a school admin, please login as a school admin to continue.'}
                )
            
        try:
            department = Department.objects.create(school=school, **validated_data)
            return department
        except:
            raise serializers.ValidationError({'dept_error':'Error while creating a department, try again'})