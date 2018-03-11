from django.urls import path, include

from app import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('textEditor/', views.textOCR, name='textEditor'),
    path('codeEditor/', views.codeOCR, name='codeConverter')
    # path('app/', include('app.urls'))
]