from django.conf.urls import url
from django.contrib import admin
from django.urls import include, path
from rest_framework import serializers, viewsets, routers
from rest_framework.authtoken.admin import User
from rest_framework.documentation import include_docs_urls
from rest_framework.schemas import get_schema_view

from django.urls import path, include

# Serializers define the API representation.
from snippets.views import UserViewSet


API_TITLE = 'Pastebin API'
API_DESCRIPTION = 'A Web API for creating and viewing highlighted code snippets.'
schema_view = get_schema_view(title=API_TITLE)

urlpatterns = [
    path('polls/', include('polls.urls')),
    path('admin/', admin.site.urls),
    url(r'^', include('snippets.urls')),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^schema/$', schema_view),
    url(r'^docs/', include_docs_urls(title=API_TITLE, description=API_DESCRIPTION))
]