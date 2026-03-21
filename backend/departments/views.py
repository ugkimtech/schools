from rest_framework.viewsets import ModelViewSet
from .serializers import DepartmentsSerializer
from .models import Department
from school.models import SchoolProfile
from users.permissions import IsSchooolAdmin
from django.contrib.auth import get_user_model
User = get_user_model()


class ManageDepartments(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentsSerializer
    permission_classes = [IsSchooolAdmin]