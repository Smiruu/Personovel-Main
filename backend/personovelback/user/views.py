from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from user.utils import Util
from user.serializers import SendPasswordResetEmailSerializer, UserChangePasswordSerializer, UserPasswordResetSerializer, UserRegistrationSerializers, UserLoginSerializer, UserProfileSerializer
from django.contrib.auth import authenticate
from user.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken, Token
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from .models import *
from .serializers import UserProfileSerializer
import pyotp
from rest_framework.permissions import IsAdminUser
from datetime import datetime, timedelta

from rest_framework.exceptions import NotFound, PermissionDenied
from django.shortcuts import get_object_or_404
# Generate token Manually
def get_tokens_for_user(user):
    # Generate refresh token
    refresh = RefreshToken.for_user(user)

    # Include user's name and email in the token payload
    access_token_payload = {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'name': user.name,  # Assuming 'name' is a field in your user model
        'email': user.email,  # Assuming 'email' is a field in your user model
        'id' : user.id,
        'is_paid': user.is_paid,
        'paid_at': user.paid_at,
    }

    return access_token_payload

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        print("Request data:", request.data)
        serializer = UserRegistrationSerializers(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            otp_key = pyotp.random_base32()
            otp_instance = pyotp.TOTP(otp_key, digits =6)
            otp_code = otp_instance.now()
            token = get_tokens_for_user(user)

            otp = OTP.objects.create(user=user, otp_secret=otp_key)

            send_otp_email(user.email, otp_code)


            return Response({'otp_id': otp.id, 'user_id' : user.id, 'token': token, 'msg':'Register Succcess'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

def send_otp_email(email, otp_code):
    data = {
        'email_subject': 'OTP Verification',
        'email_body': f'Hi, your otp is {otp_code}',
        'to_email': email,
    }
    Util.send_email(data)

@api_view(['POST'])
def verify_otp(request):
    data = request.data
    print(data)
    try:
        user_id = data['user_id']
        otp_id = data['otp_id']
        otp_code = data['otp_code']

        user = User.objects.get(id=user_id)
        otp = OTP.objects.get(id=otp_id, user=user)
        print(otp_code)
        print(otp.otp_secret)

        if user.is_active:
            return Response({'message': 'User is already verified'}, status=status.HTTP_400_BAD_REQUEST)

        if otp.is_verified:
            return Response({'message': 'OTP is already verified'}, status=status.HTTP_400_BAD_REQUEST)
        
        totp = pyotp.TOTP(otp.otp_secret)

        if totp.verify(otp_code, valid_window=7):
            user.is_active = True
            user.save()

            otp.is_verified = True
            otp.save()

            return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
        else:
            raise Exception('OTP verification failed')
        
    except Exception as e:
        message = {'message': str(e)}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)
    
from django.utils import timezone

# Define a constant for the cooldown duration (2 minutes)
COOLDOWN_DURATION = 120  # 2 minutes in seconds

@api_view(['POST'])
def resend_otp(request):
    try:
        data = request.data
        user_id = data['user_id']
        user = User.objects.get(id=user_id)
        
        if user.is_active:
            return Response({'message': 'Account is already active. Cannot resend OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check if there's a previous OTP request within the cooldown duration
        now = timezone.now()
        last_otp_request_time = request.session.get('last_otp_request_time')
        if last_otp_request_time and (now - last_otp_request_time).total_seconds() < COOLDOWN_DURATION:
            time_remaining = COOLDOWN_DURATION - (now - last_otp_request_time).total_seconds()
            return Response({'message': f'Please wait {time_remaining} seconds before requesting another OTP'}, status=status.HTTP_429_TOO_MANY_REQUESTS)
        
        otp = OTP.objects.get(user=user)
        otp_key = otp.otp_secret
        otp_instance = pyotp.TOTP(otp_key, digits=6)
        otp_code = otp_instance.now()
        send_otp_email(user.email, otp_code)
        
        # Update the last OTP request time in the session
        request.session['last_otp_request_time'] = now
        
        return Response({'message': 'OTP has been sent to your email'}, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        return Response({'message': 'User does not exist'}, status=status.HTTP_404_NOT_FOUND)




class UserLoginView(APIView):
    renderer_classes = [UserRenderer]

    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.data.get('email')
            password = serializer.data.get('password')
            user = authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                
                # Check if the user's subscription has expired
                subscription_expired = user.is_paid_expired()
                
                if subscription_expired:
                    # Perform any action if the subscription has expired
                    # For example, return a response indicating the subscription has expired
                    return Response({'token': token, 'msg': 'Subscription expired'}, status=status.HTTP_200_OK)
                else:
                    # Subscription is active, proceed with login
                    return Response({'token': token, 'msg': 'Login success'}, status=status.HTTP_200_OK)
            else: 
                return Response({'errors': {'non_field_errors': ['Email or Password is not valid']}}, status=status.HTTP_400_BAD_REQUEST)



class UserLists(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAdminUser]  # Only admin users can access this view

    def get(self, request, format=None):
        users = User.objects.all()  # Assuming User model is imported correctly
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    

class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        context = {'user': request.user}
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':'Change Password Succcessfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = SendPasswordResetEmailSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password Reset link send. Please check your Email'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self,request, uid, token , format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context = {'uid':uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg':"Password Reset Succesfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    
@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_to_paid(request, pk):
    try:
        user = User.objects.get(pk=pk)
        user.is_paid = True
        user.paid_at = datetime.now()  # Set the paid_at field to current date
        user.save()
        return Response({'detail': 'User payment status updated successfully'})
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=404)
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def userProfile(request):
    user = request.user
    print(user)
    profile = get_object_or_404(Profile, user=user)
    serializer = UserProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateProfile(request):
    user = request.user
    profile = get_object_or_404(Profile, user=user)
    serializer = UserProfileSerializer(profile, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)