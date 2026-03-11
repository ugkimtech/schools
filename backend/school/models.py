from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()


class SchoolProfile(models.Model):
    school_admin = models.OneToOneField(User, on_delete=models.CASCADE)
    school_name = models.CharField(max_length=100)
    motto = models.CharField(max_length=100, null=True)
    level = models.CharField(max_length=100, 
                             choices=(
                                        ('PRIMARY', 'primary'), 
                                        ('SECONDARY', 'secondary')
                                    ))
    phone = models.CharField(max_length=15)
    address = models.CharField(max_length=100, null=True)
    district = models.CharField(max_length=100, null=True)
    region = models.CharField(max_length=100, null=True)
    website = models.URLField(null=True)
    reg_number = models.CharField(max_length=15, null=True)
    ownership = models.CharField(max_length=10, 
                                 choices=(
                                     ('GOVERNMENT','government'), 
                                     ('PRIVATE', 'private'), 
                                     ('OTHERS', 'others')
                                     ),
                                 default='PRIVATE')
    UNEB_No = models.CharField(max_length=15, null=True)
    badge = models.ImageField(upload_to='badges', null=True)
    subscription_expiry_date = models.DateField(null=True)


    def __str__(self):
        return self.school_name