from rest_framework import serializers
from .models import Classes, SchoolProfile


class ClassSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school')
    class Meta:
        model = Classes
        fields = ['school', 'class_name', 'meta_data']
        
    def create(self, validated_data):
        print(validated_data)
        try:
            print(validated_data)
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            raise serializers.ValidationError(
                    {'error':'Not a school admin, please login as a school admin to continue.'}
                )
            
        try:
            classes = Classes.objects.create(school=school, **validated_data)
            return classes
        except:
            raise serializers.ValidationError({'error':'Error while creating a class, try again'})