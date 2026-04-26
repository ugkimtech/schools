from django.apps import AppConfig


class UsersConfig(AppConfig):
    name = 'users'
    default_auto_field = 'django.db.models.BigAutoField'
    
    def ready(self):
        from django.contrib.auth.models import Group
        grous = [
            'super_admin', 'school', 'Deputy', 'DOS', 'Accountant', 
            'Bursar', 'Teacher', 'Library', 'Student', 'Others'
        ]
        try:
            for group_name in grous:
                Group.objects.get_or_create(name=group_name)
        except Exception as e:
            return e