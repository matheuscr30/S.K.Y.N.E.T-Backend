from skynet_resources.proto import APIV1_pb2 as API
from django.http import HttpResponse


class APIResponse:

    @staticmethod
    def api_response_get(data):
        return HttpResponse(data.SerializeToString())

    @staticmethod
    def api_response_post(data):
        return HttpResponse(data.SerializeToString(), content_type="application/octet-stream")

    @staticmethod
    def api_error_response(status_code, message):
        error = API.Error()
        error.status_code = status_code
        error.message = message
        return HttpResponse(error.SerializeToString(), status=status_code, content_type="application/octet-stream")


class APIConverter:

    pass
