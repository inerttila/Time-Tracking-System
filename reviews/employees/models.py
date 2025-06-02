from django.db import models

# Create your models here.
class Employee(models.Model):
    fullname = models.CharField(max_length=100, null=True)
    dep = models.TextField(max_length=30, null=True)
    birthdate = models.CharField(max_length=30, null=True)
    salary = models.TextField(max_length=30, null=True)


    def __str__(self):
        return self.fullname

class Review(models.Model):
    COMPANY_CHOICES = [
        ('company 1', 'company 1'),
        ('company 2', 'company 2'),
    ]

    userName = models.CharField(max_length=100, null=True, unique=True)
    timein = models.DateTimeField(null=True, blank=True)
    timeout = models.DateTimeField(null=True, blank=True)
    company = models.CharField(max_length=20, choices=COMPANY_CHOICES, null=True)

    def __str__(self):
        return self.userName
