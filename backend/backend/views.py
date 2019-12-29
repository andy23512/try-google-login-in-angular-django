from django.http import HttpResponse
from django.views.decorators.csrf import ensure_csrf_cookie


@ensure_csrf_cookie
def csrf(request):
    response = HttpResponse()
    response.status_code = 204
    return response
