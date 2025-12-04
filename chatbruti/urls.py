from django.contrib import admin
from django.urls import path
from chatbot import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    path('ask/', views.ask_patoche, name='ask'),
]