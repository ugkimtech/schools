from rest_framework import serializers
from .models import Term, Subject, Exam, Results
from school.models import SchoolProfile
from staff.models import Staff


class TermSerializer(serializers.ModelSerializer):
    class Meta:
        model = Term
        fields = ['term_name','start_date','end_date','year','is_promotional']
        
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            term = Term.objects.create(school=school, **validated_data)
            return term
        else:
            staff = Staff.objects.get(user=user)
            term = Term.objects.create(school=staff.school, **validated_data)
            return term
            


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ['id', 'subject_name','meta_data']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            subject = Subject.objects.create(school=school, **validated_data)
            return subject
        else:
            staff = Staff.objects.get(user=user)
            subject = Subject.objects.create(school=staff.school, **validated_data)
            return subject


class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['exam_name','max_marks']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            exam = Exam.objects.create(school=school, **validated_data)
            return exam
        else:
            staff = Staff.objects.get(user=user)
            exam = Exam.objects.create(school=staff.school, **validated_data)
            return exam


class ResultsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Results
        fields = ['student','term','exam','subject','marks','remarks','teacher']
    
    def create(self, validated_data):
        user = self.context['request'].user
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            resuls = Results.objects.create(school=school, **validated_data)
            return resuls
        else:
            staff = Staff.objects.get(user=user)
            resuls = Results.objects.create(school=staff.school, **validated_data)
            return resuls