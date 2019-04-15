from skynet_backend.settings.settings import *

SECRET_KEY = 'hqpvu7f89@dkbhcibhwitutvow=!*w$bkh(@a@rwe$#fu9b&ss'
DEBUG = True

ALLOWED_HOSTS = ['*']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'HOST': 'localhost',
        'PORT': '5432',
        'NAME': 'skynet',
        'USER': 'postgres',
        'PASSWORD': ''
    }
}
