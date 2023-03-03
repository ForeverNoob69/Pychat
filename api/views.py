from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from app.models import *
from .serializers import *
from .pusher import pusher_client

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['name'] = user.username
        # ...

        return token
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
def profileAPI(request):
    if request.method=='POST':
        serializer = profileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
    
    if request.method=="GET":
        user = request.user
        item = user.profile_set.all()
        serializer = profileSerializer(item,many=True)
    return Response(serializer.data)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def roomAPI(request):
    if request.method == "POST":
        rooms = Room.objects.filter(user1=request.data['user1'],user2=request.data['user2']) or Room.objects.filter(user1=request.data['user2'],user2=request.data['user1'])
        if len(rooms)==0:
            profile1 = Profile.objects.get(user=request.data['user1'])
            profile2 = Profile.objects.get(user=request.data['user2'])
            user1 = User.objects.get(id=request.data['user1'])
            user2 = User.objects.get(id=request.data['user2'])

            # Create and save the Room instance to the database
            # room = Room.objects.create(user1=user1, user2=user2, profile1=profile1, profile2=profile2)

            # Serialize the Room instance and return the serialized data
            serializer = roomSerializer(data={'user1':request.data['user1'],'user2':request.data['user2'],'profile1':profile1.name,'profile2':profile2.name})
            if serializer.is_valid():
                # print(serializer)
                # print("id:",serializer.data["id"])
                rooom = serializer.save()
                pusher_client.trigger('chat', 'room', {
                    'user1':request.data['user1'],
                    "user2":request.data['user2'],
                    "profile1":profile1.name,
                    "profile2":profile2.name,
                    "id":rooom.id,
                    })
                return Response(serializer.data)
            else:
                return Response(serializer.errors)
        else:
            serializer = roomSerializer(rooms, many=True, data=rooms)
            print(serializer)
            return Response(serializer.data)
    if request.method=="GET":
        user = request.user
        item = Room.objects.filter(user1=user.id) | Room.objects.filter(user2=user.id)
        print(user.id)
        serializer = roomSerializer(item, many=True, data=item)

        # user = request.user
        # query = request.GET.get('q', '')  # Get the search query from the URL parameter 'q'
        # item = Room.objects.filter(
        #     Q(name__icontains=query) & (Q(user1=user.id) | Q(user2=user.id)) & Q(pk=pk)
        # )[:10]  # Get the rooms containing the search query in their name, and limit to 10 results
        serializer = roomSerializer(item, many=True)
    
    return Response(serializer.data)

@api_view(["GET","POST"])
@permission_classes([IsAuthenticated])
def messageAPI(request):
    if request.method == 'POST':
        serializer = messageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            pusher_client.trigger('chat', 'message', {
                'room': request.data['room'],
                'sender':request.data['sender'],
                'reciever':request.data['receiver'],
                'message':request.data['message'],
                "sent_at":request.data["sent_at"]
                })
    if request.method=="GET":
        user = request.user
        item = Message.objects.filter(sender_ID=user.id) | Message.objects.filter(receiver_ID=user.id)
        serializer = messageSerializer(item,many=True)

    return Response(serializer.data)

@api_view(['GET','POST'])
def userAPI(request,pk):
    try:
        if request.method == 'POST':
            username = request.data.get('username')
            password = request.data.get('password')
            if not username or not password:
                return Response({'error': 'username and password are required'})
            user = User.objects.create_user(username=username, password=password)
            serializer = userSerializer(user)
            Profile.objects.create(user=user, name=username)
            return Response(serializer.data)
        if request.method == 'GET':
            items = User.objects.filter(username__contains=pk)[:5]
            serializer = userSerializer(items, many=True)
            if len(items)==0:
                return Response([{"username":"No User found!","id":0}])
            else:
                return Response(serializer.data)
        else:
            return Response({'error': 'method not allowed'})
    except Exception as e:
        return Response({'error': str(e)})