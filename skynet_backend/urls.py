from django.urls import path, include
from django.contrib import admin

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('skynet_resources.urls')),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider'))
]
