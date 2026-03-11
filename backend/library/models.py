from django.db import models
from school.models import SchoolProfile
from staff.models import Staff
from student.models import StudentProfile
from django.contrib.auth import get_user_model
User = get_user_model()


class Book(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    title = models.CharField(max_length=50)
    author = models.CharField(max_length=50)
    isbn = models.CharField(max_length=50)
    category = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    is_active = models.BooleanField(default=False)
    
    
class BookCopy(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    copy_code = models.CharField(max_length=100)
    is_available = models.BooleanField(default=False)
    condition = models.CharField(max_length=100, blank=True)

class BookBorrowing(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    borrower = models.ForeignKey(User, on_delete=models.PROTECT)
    book_copy = models.ForeignKey(BookCopy, on_delete=models.PROTECT)
    borrow_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    return_date = models.DateField()
    fine_amount = models.DecimalField(max_digits=8, decimal_places=2)
    paid = models.DecimalField(max_digits=8, decimal_places=2)