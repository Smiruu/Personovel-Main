from django.urls import path
from user.views import SendPasswordResetEmailView, UserPasswordResetView, UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView, resend_otp, verify_otp, UserLists

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>/', UserPasswordResetView.as_view(), name='reset-password'),
    path('profile/', UserProfileView.as_view(), name='user-profile'),
    path('profile/list/', UserLists.as_view(), name='user-profile-list'),  # Add this line
    path('verify-otp/', verify_otp, name='verify_otp'),
    path('resend-otp/', resend_otp, name='resend_otp'),
]
