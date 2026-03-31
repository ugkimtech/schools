from rest_framework.viewsets import ModelViewSet
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import ResetPasswordSerializer, GetUserSerializer, GroupSerializer
from django.contrib.auth.models import Group


class GetUser(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [IsAuthenticated]
    
    
class GetGroups(ModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer


class ResetPassword(ModelViewSet):
    serializer_class = ResetPasswordSerializer
    
    def get_queryset(self):
        user = self.request.user
        #Logic for password change here
        return [user]
        