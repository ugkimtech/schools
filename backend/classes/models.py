from django.db import models
from school.models import SchoolProfile
    
    
class Classes(models.Model):
    school = models.ForeignKey(SchoolProfile, on_delete=models.CASCADE)
    class_name = models.CharField(max_length=50)
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