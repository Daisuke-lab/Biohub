from rest_framework import serializers


def is_negative(value):
    if value < 0:
        raise serializers.ValidationError("Number can't be negative")
    

class FibonacciSerializer(serializers.Serializer):
    number = serializers.IntegerField(validators=[is_negative])
    should_be_async = serializers.SerializerMethodField()
    email = serializers.CharField(max_length=100, required=False)


    def get_should_be_async(self, obj):
        if obj.get("email", "") != "":
            return True
        else:
            return False