from django.contrib import admin
from django.urls import path
from shop.views import ProductList, OrderList

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/products/', ProductList.as_view(), name='product-list'),
    path('api/orders/', OrderList.as_view(), name='order-list'),
]
