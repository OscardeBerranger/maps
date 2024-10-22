from django.urls import path, include
from website.views import Maps


urlpatterns = [
    path('home', Maps.as_view(), name='home'),
]