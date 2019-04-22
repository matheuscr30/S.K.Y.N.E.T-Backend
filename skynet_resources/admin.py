from .models import Device, Room
from django.contrib import admin


class DeviceAdmin(admin.ModelAdmin):
    list_display = ('id', '_name', '_type', '_port_number')
    search_fields = ('_name', '_type', '_port_number')


class RoomAdmin(admin.ModelAdmin):
    list_display = ('id', '_name', '_type')
    search_fields = ('_name', '_type')


admin.site.register(Device, DeviceAdmin)
admin.site.register(Room, RoomAdmin)
