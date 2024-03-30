from django.urls import path
from user.views import *
from . import views

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('profile/', views.userProfile, name='profile'),
    path('profile/update/', updateProfile, name='update_profile'),
    path('profile/list/', UserLists.as_view(), name='user-profile-list'),  # Add this line
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('resend-otp/', resend_otp, name='resend_otp'),
    path('pay/<str:pk>/', update_user_to_paid, name='update_user_to_paid'),
]
