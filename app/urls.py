from django.urls import path, include

from app import views

urlpatterns = [
    path('', views.index, name='index'),
    path('home/', views.home, name='home'),
    path('textEditor/', views.textOCR, name='textEditor'),
    path('codeEditor/', views.codeOCR, name='codeConverter'),
    path('files/', views.myFiles, name='files'),
    path('virtualLab/', views.virtualLab, name='virtualLab')
    # path('app/', include('app.urls'))
]