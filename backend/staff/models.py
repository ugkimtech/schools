from django.db import models
from django.contrib.auth import get_user_model
from school.models import SchoolProfile
from departments.models import Department
from academics.models import Subject
from classes.models import Classes

User = get_user_model()


class Staff(models.Model):
    #identification
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    other_name = models.CharField(max_length=50,null=True, blank=True)
    gender = models.CharField(max_length=20, null=True, blank=True, choices=(('MALE', 'male'), ('FEMALE', 'female'), ('UNKNOWN', 'unknown')))
    date_of_birth = models.DateField(null=True, blank=True)
    NIN = models.CharField(max_length=50,null=True, blank=True)
    photo = models.ImageField(upload_to='staff_images/',null=True, blank=True)
    #contact
    phone = models.CharField(max_length=50,null=True, blank=True)
    alt_phone = models.CharField(max_length=50,null=True, blank=True)
    email = models.EmailField(null=True, blank=True)
    address = models.CharField(max_length=50,null=True, blank=True)
    district = models.CharField(max_length=50,null=True, blank=True)
    emergence_contact_name = models.CharField(max_length=50,null=True, blank=True)
    emergence_phone = models.CharField(max_length=50,null=True, blank=True)
    #employment
    departments = models.ManyToManyField(Department, blank=True)
    employment_type = models.CharField(max_length=50,
                                       null=True, blank=True,
                                       choices=(('PART_TIME','part-time'),
                                                ('FULL_TIME','full-time'),
                                                ('CONTRACT','contract'))
                                    )
    contract_start = models.DateField(null=True, blank=True) #date
    contract_end = models.DateField(null=True, blank=True)
    #professional info
    qualification = models.CharField(max_length=50,null=True, blank=True)
    experience = models.CharField(max_length=50,null=True, blank=True)
    subjects_taught = models.ManyToManyField(Subject, blank=True)
    classes_taught = models.ManyToManyField(Classes, blank=True)
    reg_number = models.CharField(max_length=50,null=True, blank=True)
    license_number = models.CharField(max_length=50,null=True, blank=True)
    #finance details
    salary = models.DecimalField(max_digits=12, decimal_places=2, null=True, blank=True)
    bank_name = models.CharField(max_length=50,null=True, blank=True)
    account_number = models.CharField(max_length=50,null=True, blank=True)
    tin_number = models.CharField(max_length=50,null=True, blank=True)
    nssf_number = models.CharField(max_length=50,null=True, blank=True)
    #documents upload
    certificate = models.FileField(upload_to='staff_documents/', null=True, blank=True)
    contract_document = models.FileField(upload_to='staff_documents/', null=True, blank=True)