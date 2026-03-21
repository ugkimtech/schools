from rest_framework.viewsets import ModelViewSet
from .serializers import EventsSerializer
from school.models import SchoolProfile
from .models import Events
from staff.models import Staff


class ManageEvents(ModelViewSet):
    serializer_class = EventsSerializer
    
    def get_queryset(self):
        user = self.request.user
        staff_groups = ['administration', 'finance', 'academics', 
            'teacher', 'burser', 'headteacher', 'secretary', 'other_staff']
        if user.groups.filter(name='school').exists():
            school = SchoolProfile.objects.get(school_admin=user)
            return Events.objects.filter(school=school)
        elif user.groups.filter(name__in=staff_groups).exists():
            school = Staff.objects.get(staff_user=user).school
            return Events.objects.filter(school=school)
        return Events.objects.filter(school=school)