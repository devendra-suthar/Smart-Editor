from app.firebase_config import *
from django.shortcuts import render, render_to_response
from django.template.context_processors import csrf

def index(request):
    c = {}
    c.update(csrf(request))
    return render_to_response('index.html', c)

def home(request):
    return render_to_response('home.html')

def textOCR(request):
    return render_to_response('textEditor.html')

def codeOCR(request):
    return render_to_response('codeConverter.html')

def virtualLab(request):
    return render_to_response('virtualLab.html')

# def logInWithEmail(request):
# if request.method == "POST":
#     print("LoginWithEmail")
#     emailAddress = request.POST.get("email_field")
#     password = request.POST.get("password_field")