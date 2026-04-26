from rest_framework import serializers
from .models import Classes, SchoolProfile
from django.contrib.auth import get_user_model
User = get_user_model()


class ClassSerializer(serializers.ModelSerializer):
    class_teacher = serializers.PrimaryKeyRelatedField(
        queryset = User.objects.all()
    )
    
    class Meta:
        model = Classes
        fields = ['id', 'class_teacher', 'class_name', 'meta_data']
        
    # handle get
    def to_representation(self, instance):
        data = super().to_representation(instance)
        if instance.class_teacher:
            data['class_teacher'] = instance.class_teacher.first_name
        return data
        
    def create(self, validated_data):
        print(validated_data)
        try:
            print(validated_data)
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
            print('\n\n',school)
            classes = Classes.objects.create(school=school, **validated_data)
            return classes
        except SchoolProfile.DoesNotExist:
            raise serializers.ValidationError(
                    {'error':'Not a school admin, please login as a school admin to continue.'}
                )
            
        # try:
        # except:
        #     raise serializers.ValidationError({'error':'Error while creating a class, try again'})