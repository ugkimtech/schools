from rest_framework import serializers
from django.contrib.auth import get_user_model
User = get_user_model()
from django.contrib.auth.models import Group
from .models import StudentProfile
from school.models import SchoolProfile
from users.services import generate_password, IDGenerator
from fees.models import StudentFee


class StudentSeralizer(serializers.ModelSerializer):
    first_name = serializers.CharField(write_only=True)
    last_name = serializers.CharField(write_only=True)
    payable_amount = serializers.DecimalField(max_digits=10, decimal_places=2,write_only=True)
    
    class Meta:
        model = StudentProfile
        fields = ['first_name','last_name','other_name','admission_number','current_class',
        'stream','gender','photo','status','guardian_name','guardian_phone',
        'guardian_email','relationship','address','allergies','medical_conditions',
        'special_needs','fee_category','boarding_status', 'payable_amount']
    
    def create(self, validated_data):
        try:
            username = 'default-student'
            password = generate_password()
            print('\n\n',password,'\n\n')
            first_name = validated_data.pop('first_name')
            last_name = validated_data.pop('last_name')
            
            try:
                student = User.objects.create_user(
                    username=username,
                    password=password,
                    first_name=first_name,
                    last_name=last_name
                )
                student.username = IDGenerator().student_ID(student.id,'STU',8)
                student.save()
                
                student_group, _created = Group.objects.get_or_create(name='student')
                student.groups.add(student_group)
            except Exception as e:
                raise serializers.ValidationError({'error':'An error occured while registering a student','e':e})
            
            try:
                school_admin = self.context['request'].user
                school = SchoolProfile.objects.get(school_admin=school_admin)
            except SchoolProfile.DoesNotExist:
                student = User.objects.get(id=student.id)
                student.delete()
                raise serializers.ValidationError(
                            {'student_profile':'Not a school admin, please login as a school admin to continue.'}
                        )
                
            payable_amount = validated_data.pop('payable_amount')
                
            student_profile = StudentProfile.objects.create(
                student_user = student,
                school = school,
                **validated_data
            )
            
            #fees allocation
            StudentFee.objects.create(
                school=school,
                student = student_profile,
                payable_amount=payable_amount
            )
            
            return student_profile
        except Exception as e:
            _student = User.objects.get(id=student.id)
            _student.delete()
            raise serializers.ValidationError({'student_error':'An error occured during student registration! please try again'})
        
        
class ManageStudentSeralizer(serializers.ModelSerializer):
    username = serializers.CharField(source='student_user.username')
    first_name = serializers.CharField(source='student_user.first_name')
    last_name = serializers.CharField(source='student_user.last_name')
    groups = serializers.SlugRelatedField(
                                    many=True,
                                    slug_field='name',
                                    source='student_user.groups',
                                    read_only=True
                                )
    
    class Meta:
        model = StudentProfile
        fields = ['username', 'groups', 'first_name','last_name','other_name','admission_number','current_class',
        'stream','gender','photo','status','guardian_name','guardian_phone',
        'guardian_email','relationship','address','allergies','medical_conditions',
        'special_needs','fee_category','boarding_status']