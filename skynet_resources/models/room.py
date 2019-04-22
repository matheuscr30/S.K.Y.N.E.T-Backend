from skynet_resources.models import RoomType, Device
from django.db import models


class Room(models.Model):
    _name = models.CharField(max_length=100)
    _type = models.IntegerField(choices=[(tag.value, tag) for tag in RoomType])
    _devices = models.ManyToManyField(Device)
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
    def created_date(self):
        return int(self._created_date.timestamp())

    @created_date.setter
    def created_date(self, value):
        self._created_date = value
    # </editor-fold>
