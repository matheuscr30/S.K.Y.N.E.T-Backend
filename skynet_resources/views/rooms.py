from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views import View


@method_decorator(csrf_exempt, name='dispatch')
class RoomsView(View):

    def get(self, request, *args, **kwargs):
        pass

    def post(self, request, *args, **kwargs):
        pass

    def put(self, request, *args, **kwargs):
        pass

    def delete(self, request, *args, **kwargs):
        pass
