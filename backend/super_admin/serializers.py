from rest_framework import serializers
from django.contrib.auth.models import User, Group
from school.models import SchoolProfile
        
        
class FetchSchoolSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    groups = serializers.SlugRelatedField(
                                          many=True, read_only=True, 
                                          slug_field='name', source='user.groups'
                                        )
    is_active = serializers.CharField(source='user.is_active')
    
    class Meta:
        model = SchoolProfile
        fields = [
                  'id', 'username', 'email', 'groups', 'is_active', 'subscription_expiry_date', 
                  'school_name', 'motto', 'level', 'phone', 'address', 'district', 
                  'region', 'website', 'reg_number', 'UNEB_No', 'badge'
        ]