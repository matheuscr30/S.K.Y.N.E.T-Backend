from django.views.decorators.csrf import csrf_exempt
from skynet_resources.decorators import token_check
from oauth2_provider.views import TokenView
from skynet_resources import views
from django.urls import path

urlpatterns = [
    path('o/token/', csrf_exempt(token_check(TokenView.as_view())), name='token'),

    path('devices/', views.DevicesView.as_view(), name='devices'),
    path('devices/<int:device_id>/', views.DevicesView.as_view(), name='specific_device'),

    path('rooms/', views.RoomsView.as_view(), name='rooms'),
    path('rooms/<int:room_id>/', views.RoomsView.as_view(), name='specific_room')
]
