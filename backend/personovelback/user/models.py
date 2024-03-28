from django.db import models
from django.contrib.auth.models import BaseUserManager,AbstractBaseUser
import pyotp
from datetime import datetime, timedelta
from django.utils import timezone

#Custom User Manager
class UserManager(BaseUserManager):
    def create_user(self, email, name,  password=None, password2=None):
        """
        Creates and saves a User with the given email, name, tc and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            name =  name,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name,  password=None):
        """
        Creates and saves a superuser with the given email, name, tc and password.
        """
        user = self.create_user(
            email,
            password=password,
            name= name, 
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

#Custom User Model
class User(AbstractBaseUser):
    email = models.EmailField(
        verbose_name="Email",
        max_length=255,
        unique=True,
    )
    name = models.CharField(max_length=200)
    is_active = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_paid = models.BooleanField(default=False)
    paid_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name"]

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        "Does the user have a specific permission?"
        # Simplest possible answer: Yes, always
        return self.is_admin

    def has_module_perms(self, app_label):
        "Does the user have permissions to view the app `app_label`?"
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        "Is the user a member of staff?"
        # Simplest possible answer: All admins are staff
        return self.is_admin
    
    def is_paid_expired(self):
        if self.is_paid and self.paid_at:
            # Get today's date as a datetime object
            today = datetime.now().date()
            print("Today's date:", today)
            
            # Convert paid_at to a date object
            paid_date = self.paid_at.date()
            print("Paid date:", paid_date)
            
            # Calculate the difference in days between today and the paid_at date
            days_difference = (today - paid_date).days
            print("Days difference:", days_difference)
            
            # Check if the difference is greater than or equal to 90 days (3 months)
            if days_difference >= 90:
                print("Paid status is expired.")
                # Update is_paid to False
                self.is_paid = False
                # Save the changes to the database
                self.save()
                print("is_paid status updated to False.")
                return True
        print("Paid status is not expired.")
        return False

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    profile_photo = models.ImageField(upload_to='profile_photos/', blank=True, null=True)
    cover_photo = models.ImageField(upload_to='cover_photos/', blank=True, null=True)

    def __str__(self):
        return self.user.username
    

class OTP(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  otp_secret = models.CharField(max_length=255)
  is_verified = models.BooleanField(default=False)

  def __str__(self):
      return self.user.name
  
  def generate_otp(self):
     totp = pyotp.TOTP(self.otp_secret)
     return totp.now()
  
  def verify(self, entered_otp):
     totp = pyotp.TOTP(self.otp_secret)
     return totp.verify(entered_otp)
    