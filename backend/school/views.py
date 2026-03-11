from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.parsers import MultiPartParser, FormParser
from .models import SchoolProfile
from .serializers import SchoolSerializer, MySchoolSerializer
from users.permissions import IsSchooolAdmin, IsSuperAdmin
from super_admin.services import Subscriptions
from django.contrib.auth import get_user_model
User = get_user_model()


class CreateSchool(CreateAPIView):
    queryset = SchoolProfile.objects.all()
    serializer_class = SchoolSerializer
    parser_classes = [MultiPartParser, FormParser]


class MySchool(ListAPIView):
    serializer_class = MySchoolSerializer
    permission_classes = [IsSchooolAdmin | IsSuperAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.is_superuser:
            return SchoolProfile.objects.all()
        return SchoolProfile.objects.filter(school_admin=user)