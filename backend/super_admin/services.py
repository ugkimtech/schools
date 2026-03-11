from django.utils import timezone
from datetime import timedelta
from school.models import SchoolProfile


class Subscriptions:
    def update_subscription(self, user):
        school = SchoolProfile.objects.get(user = user)
        school.subscription_expiry_date = timezone.now()+timedelta(days=2)
        school.save()