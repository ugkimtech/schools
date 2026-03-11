from rest_framework.viewsets import ModelViewSet
from school.models import SchoolProfile
from .serializers import FetchSchoolSerializer
from users.permissions import IsSuperAdmin
    
    
class FetchSchools(ModelViewSet):
    queryset = SchoolProfile.objects.all()
    serializer_class = FetchSchoolSerializer
    permission_classes = [IsSuperAdmin]