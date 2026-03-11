from django.db import models
from django.contrib.auth import get_user_model
from school.models import SchoolProfile
from departments.models import Department
from academics.models import Subject
from classes.models import Classes

User = get_user_model()


class Staff(models.Model):
    #identification
    staff_user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    other_name = models.CharField(max_length=50,null=True)
    gender = models.CharField(max_length=20, null=True, choices=(('MALE', 'male'), ('FEMALE', 'female'), ('UNKNOWN', 'unknown')))
    date_of_birth = models.DateField(null=True)
    NIN = models.CharField(max_length=50,null=True)
    photo = models.ImageField(upload_to='staff_images/',null=True)
    #contact
    phone = models.CharField(max_length=50,null=True)
    alt_phone = models.CharField(max_length=50,null=True)
    email = models.EmailField(null=True)
    address = models.CharField(max_length=50,null=True)
    district = models.CharField(max_length=50,null=True)
    emergence_contact_name = models.CharField(max_length=50,null=True)
    emergence_phone = models.CharField(max_length=50,null=True)
    #employment
    departments = models.ManyToManyField(Department,null=True)
    employment_type = models.CharField(max_length=50,
                                       null=True,
                                       choices=(('PART_TIME','part-time'),
                                                ('FULL_TIME','full-time'),
                                                ('CONTRACT','contract'))
                                    )
    contract_start = models.DateField(null=True) #date
    contract_end = models.DateField(null=True)
    #professional info
    qualification = models.CharField(max_length=50,null=True)
    experience = models.CharField(max_length=50,null=True)
    subjects_taught = models.ManyToManyField(Subject, null=True)
    classes_taught = models.ManyToManyField(Classes, null=True)
    reg_number = models.CharField(max_length=50,null=True)
    license_number = models.CharField(max_length=50,null=True)
    #finance details
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True)
    bank_name = models.CharField(max_length=50,null=True)
    account_number = models.CharField(max_length=50,null=True)
    tin_number = models.CharField(max_length=50,null=True)
    nssf_number = models.CharField(max_length=50,null=True)
    #documents upload
    certificate = models.FileField(upload_to='staff_documents/', null=True)
    contract_document = models.FileField(upload_to='staff_documents/', null=True)