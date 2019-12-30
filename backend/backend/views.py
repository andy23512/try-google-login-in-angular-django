from django.conf import settings
from django.http import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def get_auth_setting(request):
    return JsonResponse({
        'googleClientId': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY
    })


def index(request):
    return render(request, 'backend/index.html')
