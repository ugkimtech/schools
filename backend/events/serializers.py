from rest_framework import serializers
from .models import Events, SchoolProfile
from staff.models import Staff


class EventsSerializer(serializers.ModelSerializer):
    school = serializers.CharField(source='school')
    class Meta:
        model = Events
        fields = ['school', 'date', 'event', 'details']
        
    def create(self, validated_data):
        print(validated_data)
        try:
            print(validated_data)
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
        except SchoolProfile.DoesNotExist:
            teacher = self.context['request'].user
            school = Staff.objects.get(staff_user=teacher).school
        except:
            raise serializers.ValidationError(
                    {'error':'School Not found!.'}
                )
            
        try:
            event = Events.objects.create(school=school, **validated_data)
            return event
        except:
            raise serializers.ValidationError({'error':'Error while registering event, try again'})