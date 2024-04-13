from rest_framework import serializers
from user.utils import Util
from user.models import User
from xml.dom import ValidationErr
from django.utils.encoding import smart_str, force_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .models import *

class UserRegistrationSerializers(serializers.ModelSerializer):
    # We are writing this because we need to confirm password field in our Registration Request
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)
    class Meta:
        model = User
        fields = ['email', 'name', 'password', 'password2']
        extra_kwargs={
            'password':{'write_only':True}
        }

    #Validating Password and Confirm Password while Registration
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        return attrs
    
    def create(self, validate_data):
        return User.objects.create_user(**validate_data)
    
class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = ['email', 'password']

class UserProfileSerializer(serializers.ModelSerializer):
    user_email = serializers.EmailField(source='user.email', read_only=True)
    user_created_at = serializers.DateTimeField(source='user.created_at', read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'user', 'user_email', 'image', 'cover_photo', 'name', 'bio', 'user_created_at']
        read_only_fields = ['user', 'user_email']
        extra_kwargs = {
            'name': {'required': False}  # Setting name field as not required
        }

    def update(self, instance, validated_data):
        instance.image = validated_data.get('image', instance.image)
        instance.cover_photo = validated_data.get('cover_photo', instance.cover_photo)
        instance.name = validated_data.get('name', instance.name)
        
        # Only update bio if it is provided in the request data and not None
        if 'bio' in validated_data and validated_data['bio'] is not None:
            instance.bio = validated_data['bio']
        
        instance.save()
        return instance

class UserWithProfileSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    class Meta:
        model = User
        fields = ['id', 'email', 'name', 'is_active', 'is_admin', 'is_paid', 'paid_at', 'created_at', 'updated_at', 'profile']

class UserChangePasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password != password2:
            raise serializers.ValidationError("Password and Confirm Password doesn't match")
        user.set_password(password)
        user.save()
        return attrs
    

class SendPasswordResetEmailSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        fields = ['email']

    def validate(self, attrs):
        email = attrs.get('email')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email = email)
            uid = urlsafe_base64_encode(force_bytes(user.pk))
            print('Encoded UID', uid)
            token = PasswordResetTokenGenerator().make_token(user)
            print('Password Reset Token', token)
            link = 'http://localhost:3000/api/user/reset/'+uid+'/'+token
            print('Password Reset Link', link)
            # Send EMail
            Util.send_email({'to_email': email, 'email_subject': 'Password Reset', 'email_body': link})
            return attrs
        else:
            raise serializers.ValidationError('You are not a Registered User')
        
class UserPasswordResetSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    password2 = serializers.CharField(max_length=255, style={'input_type' : 'password'}, write_only=True)
    class Meta:
        fields = ['password', 'password2']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            password2 = attrs.get('password2')
            uid = self.context.get('uid')
            token = self.context.get('token')
            if password != password2:
                raise serializers.ValidationError("Password and Confirm Password doesn't match")
            id = smart_str(urlsafe_base64_decode(uid))
            user = User.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                raise ValidationErr('Token is not Valid or Expired')
                    
            user.set_password(password)
            user.save()
            return attrs
        except DjangoUnicodeDecodeError as identifier:
            PasswordResetTokenGenerator().check_token(user, token)
            raise ValidationErr('Token is not Valid or Expired')



class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['name', 'is_paid', 'paid_at']
