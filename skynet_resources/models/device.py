from skynet_resources.models import DeviceType
from django.db import models


class Device(models.Model):
    _name = models.CharField(max_length=150)
    _type = models.IntegerField(choices=[(tag.value, tag) for tag in DeviceType])
    _port_number = models.IntegerField()
    _created_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

    def __unicode__(self):
        return '/%s/' % self.name

    # <editor-fold desc="Setter and Getter">
    @property
    def name(self):
        return self._name

    @name.setter
    def name(self, value):
        self._name = value

    @property
    def type(self):
        return self._type

    @type.setter
    def type(self, value):
        self._type = value

    @property
    def port_number(self):
        return self._port_number

    @port_number.setter
    def port_number(self, value):
        self._port_number = value

    @property
    def created_date(self):
        return int(self._created_date.timestamp())

    @created_date.setter
    def created_date(self, value):
        self._created_date = value
    # </editor-fold>
