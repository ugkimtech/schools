from rest_framework import serializers
from .models import Book, BookCopy, BookBorrowing
from school.models import SchoolProfile
from staff.models import Staff


class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['title','author','isbn','category','description','is_active']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            book = Book.objects.create(school=school, **validated_data)
            return book
        else:
            staff = Staff.objects.get(user=user)
            book = Book.objects.create(school=staff.school, **validated_data)
            return book


class BookCopySerializer(serializers.ModelSerializer):
    class Meta:
        model = BookCopy
        fields = ['book','copy_code','is_available','condition']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            copy = BookCopy.objects.create(school=school, **validated_data)
            return copy
        else:
            staff = Staff.objects.get(user=user)
            copy = BookCopy.objects.create(school=staff.school, **validated_data)
            return copy
        

class BookBorrowingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookBorrowing
        fields = ['borrower','book_copy','borrow_date','due_date','return_date','fine_amount','paid']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            borrow = BookBorrowing.objects.create(school=school, **validated_data)
            return borrow
        else:
            staff = Staff.objects.get(user=user)
            borrow = BookBorrowing.objects.create(school=staff.school, **validated_data)
            return borrow