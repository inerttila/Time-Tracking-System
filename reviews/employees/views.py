from rest_framework.viewsets import ModelViewSet
from .models import Employee, Review
from .serializers import EmployeeSerializer, ReviewSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import action
from django.utils import timezone

# Employee ViewSet
class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

# Review ViewSet
class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @action(detail=True, methods=['patch'], url_path='update-time')
    def update_time_field(self, request, pk=None):
        review = self.get_object()
        update_type = request.data.get('type')

        if update_type == 'timein':
            review.timein = timezone.now()
        elif update_type == 'timeout':
            review.timeout = timezone.now()
        else:
            return Response(
                {'error': f"Invalid type '{update_type}'. Must be 'timein' or 'timeout'."},
                status=status.HTTP_400_BAD_REQUEST
            )

        review.save()
        serializer = self.get_serializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)
