from django.http import HttpResponse, JsonResponse

from .tasks import fibonacci_async
from .util import fib_with_memo, fib_with_tab
from .serializers import FibonacciSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

def ping(request):
    #health check用
    return HttpResponse("Hello World!!")




@api_view(['POST'])
def fibonacci(request):
    serializer = FibonacciSerializer(data=request.POST)
    if serializer.is_valid(raise_exception=True):
        print(serializer.data)
        if serializer.data["should_be_async"]:
            fibonacci_async.delay(serializer.data["number"], serializer.data["email"])
            return Response({"result": 0})
        else:
            result = fib_with_tab(serializer.data["number"])
            return Response({"result": result})




