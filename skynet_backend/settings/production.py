from skynet_backend.settings.settings import *
import dj_database_url
import django_heroku

SECRET_KEY = os.environ.get('SECRET_KEY')
DEBUG = os.environ.get('DEBUG') == '1'
ALLOWED_HOSTS = ['0.0.0.0', '127.0.0.1', 'localhost']

DATABASES = {
    'default': dj_database_url.parse(os.environ.get('DATABASE_URL')),
}
