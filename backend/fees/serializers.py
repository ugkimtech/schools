from rest_framework import serializers
from .models import FeeItem, StudentFee, Payment
from school.models import SchoolProfile
from school.serializers import SchoolPublicSerializer


class CreateFeeItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeItem
        fields = ['item','description','amount','is_optional']
        
    def create(self, validated_data):
        try:
            school_admin = self.context['request'].user
            school = SchoolProfile.objects.get(school_admin=school_admin)
            fee_item = FeeItem.objects.create(school=school, **validated_data)
            return fee_item
        except SchoolProfile.DoesNotExist:
            raise serializers.ValidationError(
                        {'error':'Not a school admin, please login as a school admin to continue.'}
                    )
            
class StudentFeeSerializer(serializers.ModelSerializer):
    school = SchoolPublicSerializer(read_only=True)
    class Meta:
        model = StudentFee
        fields = ['school', 'student', 'payable_amount']
        
        
class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ['school','student','item_paid','amount_paid','received_by',
                  'payment_method','receipt_number','date', 'term_paid']