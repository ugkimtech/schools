from django.db import models
from school.models import SchoolProfile
from django.contrib.auth import get_user_model
User = get_user_model()
    
    
class Classes(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=50)
    class_teacher = models.ForeignKey(User, on_delete=models.SET, blank=True, null=True)
    meta_data = models.JSONField(default=dict, null=True)
    
    
'''example: 
Subjects.objects.create(
                        subject_name='MTC',
                        meta_data={
                            'level': 'Advanced',
                            'papers:[
                                {
                                    'code':'001',
                                    ---more
                                },
                                {
                                    'code':'002'
                                    m---more
                                }
                            ],
                        }
                        )
                        stream={
                            'name': ,
                            'block': ,
                            'class_teacher': ,
                        }
                        '''