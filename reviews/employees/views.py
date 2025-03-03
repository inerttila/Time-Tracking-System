from django.utils.timezone import now
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .models import Employee, Review
from .serializers import EmployeeSerializer, ReviewSerializer

class EmployeeViewSet(ModelViewSet):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class ReviewViewSet(ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    @action(detail=True, methods=['patch'])
    def update_thumbs_timestamp(self, request, pk=None):
        print('update_thumbs_timestamp')
        review = self.get_object()
        print('review', review)

        thumbs_up = request.data.get('thumbsUp')
        thumbs_down = request.data.get('thumbsDown')

        if thumbs_up:
            review.thumbsUppAt = now()
            print('Thumbs up timestamp updated:', review.thumbsUppAt)

        if thumbs_down:
            review.thumbsDownAt = now()
            print('Thumbs down timestamp updated:', review.thumbsDownAt)

        review.save()
        serializer = self.get_serializer(review)
        return Response(serializer.data, status=status.HTTP_200_OK)
