from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=20,blank=True,null=True)
    image = models.ImageField(blank=True,null=True)

    def __str__(self):
        return self.name
    
class Room(models.Model):
    user1 = models.ForeignKey(User, related_name='user_1', on_delete=models.CASCADE)
    user2 = models.ForeignKey(User,related_name='user_2',on_delete=models.CASCADE)
    profile1 = models.CharField(max_length=50,blank=True,null=True)
    profile2 = models.CharField(max_length=50,blank=True,null=True)


class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name='messages')
    sender = models.CharField(max_length=50,blank=False,null=False)
    sender = models.CharField(max_length=50,blank=False,null=False)
    sender_ID = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True,related_name='user1')
    receiver_ID = models.ForeignKey(User, on_delete=models.CASCADE,blank=True,null=True,related_name='user2')
    message = models.TextField(max_length=500,blank=False,null=False)
    sent_at = models.CharField(max_length=50,blank=False,null=False)
    seen = models.BooleanField(default=False)


