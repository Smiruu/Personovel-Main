from django.urls import path, include
from user.views import get_user_profile,SendPasswordResetEmailView, UserPasswordResetView, UserRegistrationView, UserLoginView, UserProfileView, UserChangePasswordView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('profile/<int:pk>/', get_user_profile, name='profile'),
    path('changepassword/', UserChangePasswordView.as_view(), name='changepassword'),
    path('send-reset-password-email/', SendPasswordResetEmailView.as_view(), name='send-reset-password-email'),
    path('reset-password/<uid>/<token>', UserPasswordResetView.as_view(), name='reset-password'),
    # path('profile/', UserProfileView.as_view(), name='user-profile'),
]