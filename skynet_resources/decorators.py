from skynet_resources.helpers.api_library import APIResponse
from django.contrib.auth.models import User as AuthUser
from skynet_resources.proto import APIV1_pb2 as API
from oauth2_provider.models import AccessToken
from django.contrib.auth import authenticate
from datetime import datetime
import json


def token_check(func):
    def wrapper(request, *args, **kwargs):
        auth_request = API.AuthRequest()
        auth_request.ParseFromString(request.body)

        if auth_request.grant_type == 'refresh_token':
            fill_post(request, auth_request, 1)

            try:
                response = func(request, *args, **kwargs)
            except Exception as e:
                return APIResponse.api_error_response(401, 'Wrong Credentials')

            auth_response = fill_auth_response(response)
            return APIResponse.api_response_post(auth_response)
        else:
            auth_request.username = auth_request.username.strip()
            auth_request.username = auth_request.username.lower()

            fill_post(request, auth_request, 2)

            if not AuthUser.objects.filter(username=auth_request.username):
                return APIResponse.api_error_response(401, 'Wrong Credentials')

            auth_user = AuthUser.objects.get(username=auth_request.username)

            if not auth_user.is_active:
                return APIResponse.api_error_response(401, 'Please activate your account and then try again')

            user = authenticate(username=auth_request.username, password=auth_request.password)

            if user is not None:
                access_tokens = AccessToken.objects.filter(user_id=auth_user.id)

                for access_token in access_tokens:
                    time_expires = access_token.expires.timestamp()
                    time_now = datetime.now().timestamp()

                    if time_expires > time_now:
                        access_token.expires = datetime.now()
                        access_token.save()

                try:
                    response = func(request, *args, **kwargs)
                except Exception as e:
                    return APIResponse.api_error_response(401, 'Wrong Credentials')

                # Save Last Login in AuthUser
                user.last_login = datetime.now()
                user.save()

                auth_response = fill_auth_response(response)
                return APIResponse.api_response_post(auth_response)
            else:
                return APIResponse.api_error_response(401, 'Wrong User Credentials')
    return wrapper


def fill_post(request, auth_request, opt):
    if not request.POST._mutable:
        request.POST._mutable = True

    request.POST['grant_type'] = auth_request.grant_type
    request.POST['client_id'] = auth_request.client_id
    request.POST['client_secret'] = auth_request.client_secret

    if opt == 1:
        request.POST['refresh_token'] = auth_request.refresh_token
    else:
        request.POST['username'] = auth_request.username
        request.POST['password'] = auth_request.password


def fill_auth_response(response):
    auth_response = API.AuthResponse()

    json_response = json.loads(response.content)
    auth_response.access_token = json_response['access_token']
    auth_response.expires_in = json_response['expires_in']
    auth_response.token_type = json_response['token_type']
    auth_response.scope = json_response['scope']
    auth_response.refresh_token = json_response['refresh_token']

    return auth_response
