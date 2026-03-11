from django.db import models
from django.contrib.auth import get_user_model
User = get_user_model()
from school.models import SchoolProfile

class FeeItem(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    item = models.CharField(max_length=50)
    description = models.TextField(null=True)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    is_optional = models.BooleanField()
    
    
class StudentFee(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    student = models.ForeignKey('student.StudentProfile', on_delete=models.CASCADE)
    payable_amount = models.JSONField(default=dict)
    '''{
        'item:amount,
        ...
        }'''


class Payment(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    student = models.ForeignKey('student.StudentProfile', on_delete=models.SET_NULL, null=True)
    item_paid = models.ForeignKey(FeeItem, on_delete=models.SET_NULL, null=True)
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2)
    received_by = models.ForeignKey('staff.Staff', on_delete=models.SET_NULL, null=True)
    payment_method = models.CharField(max_length=50)
    receipt_number = models.CharField(max_length=50, null=True)
    date = models.DateField(auto_now_add=True)
    term_paid = models.ForeignKey('academics.Term', on_delete=models.SET_NULL, null=True)