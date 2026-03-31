from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group


class GetUserSerializer(serializers.ModelSerializer):
    groups = serializers.SlugRelatedField(
                                    many=True,
                                    slug_field='name',
                                    read_only=True
                                )
    class Meta:
        model = User
        fields = ['username', 'email', 'groups', 'first_name', 'last_name']


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ['id', 'name']


class ResetPasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password']