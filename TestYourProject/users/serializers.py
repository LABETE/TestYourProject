from rest_framework import serializers
from .models import User
#from .forms import UserForm


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
