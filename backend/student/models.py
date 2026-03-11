from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from school.models import SchoolProfile
from classes.models import Classes
from fees.models import FeeItem


class StudentProfile(models.Model):
    #student details
    student_user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    other_name = models.CharField(max_length=50, null=True)
    admission_number = models.CharField(max_length=50, null=True)
    current_class = models.ForeignKey(Classes, on_delete=models.SET_NULL, null=True)
    stream = models.CharField(max_length=50)
    gender = models.CharField(max_length=50, choices=(
                                ('MALE','male'),('FEMALE', 'female'),('UNKNOWN','unknown')
                                ))
    photo = models.ImageField(upload_to='students_photos', null=True)
    status = models.CharField(max_length=50,
                                 choices=(
                                     ('ACTIVE', 'active'), ('SUSPENDED', 'suspended')
                                 ))
    #guardian
    guardian_name = models.CharField(max_length=50, null=True)
    guardian_phone = models.CharField(max_length=50)
    guardian_email = models.CharField(max_length=50, null=True)
    relationship = models.CharField(max_length=50, null=True)
    address = models.CharField(max_length=50, null=True)
    #health
    allergies = models.CharField(max_length=50, null=True)
    medical_conditions = models.CharField(max_length=50, null=True)
    special_needs = models.CharField(max_length=50, null=True)
    fee_category = models.CharField(max_length=50, null=True)
    boarding_status = models.CharField(max_length=50, null=True,
                                       choices=(
                                           ('BOARDING', 'boarding'),('DAY','day'), ('OTHERS','others')
                                       ))