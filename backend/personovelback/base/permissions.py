from rest_framework.permissions import BasePermission

class IsPaidUserOrAdmin(BasePermission):
    """
    Custom permission to allow access to paid users or admin.
    """

    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.is_paid or request.user.is_admin)