from rest_framework.serializers import ModelSerializer
from .models import Employee, Review

class EmployeeSerializer(ModelSerializer):
    class Meta:
        model = Employee
        fields = ["id", "fullname", "dep", "birthdate", "salary", "created_at"]

class ReviewSerializer(ModelSerializer):
    class Meta:
        model = Review
        fields = ["id", "userName", "thumbsUppAt", "thumbsDownAt", "shop", "created_at"]
