from rest_framework import serializers
from .models import StudentAttendence, StaffAttendence, SchoolProfile
from staff.models import Staff


class StudentAttendenceSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school')
    class Meta:
        model = StudentAttendence
        fields = ['school', 'date', 'term', 'student', 'session', 'checkin', 'checkout', 'total_attendence']
        
    def create(self, validated_data):
        print(validated_data)
        try:
            print(validated_data)
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            teacher = self.context['request'].user
            school = Staff.objects.get(staff_user=teacher).school
        except:
            raise serializers.ValidationError(
                    {'error':'School Not found!.'}
                )
            
        try:
            student_attendence = StudentAttendence.objects.create(school=school, **validated_data)
            return student_attendence
        except:
            raise serializers.ValidationError({'error':'Error while registering attendence, try again'})

class StaffAttendenceSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school')
    class Meta:
        model = StaffAttendence
        fields = ['school', 'date', 'term', 'staff_member', 'session', 'checkin', 'checkout', 'total_attendence']
        
    def create(self, validated_data):
        print(validated_data)
        try:
            print(validated_data)
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            teacher = self.context['request'].user
            school = Staff.objects.get(staff_user=teacher).school
        except:
            raise serializers.ValidationError(
                    {'error':'School Not found!.'}
                )
            
        try:
            staff_attendence = StaffAttendence.objects.create(school=school, **validated_data)
            return staff_attendence
        except:
            raise serializers.ValidationError({'error':'Error while registering attendence, try again'})