from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

# Show weather page (only if logged in)
@login_required(login_url='login')
def home(request):
    return render(request, 'weather_app/home.html')

# Login View
def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('home')
        else:
            return render(request, 'weather_app/login.html', {'error': 'Invalid credentials'})
    return render(request, 'weather_app/login.html')

# Logout View
def logout_view(request):
    logout(request)
    return redirect('login')
