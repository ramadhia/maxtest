import hashlib
import datetime

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Product, Order
from .serializers import ProductSerializer, OrderSerializer


class ProductList(APIView):
    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)


class OrderList(APIView):
    def get(self, request):
        orders = Order.objects.all()
        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)

    def post(self, request):
        data = request.data

        try:
            # Validate request data
            items = data.get("products", [])
            if not items:
                return Response({"error": "Item products cannot be empty"}, status=status.HTTP_400_BAD_REQUEST)

            # Loop through each item to process orders and adjust stock
            orders = []
            order_products = []

            # Generate order key using MD5 hash
            raw_key = f"{datetime.datetime.now().isoformat()}-{data['customer_name']}-{data['customer_email']}"
            order_key = hashlib.md5(raw_key.encode('utf-8')).hexdigest()
            totalOrder = 0
            for item in items:
                product_id = item.get("id")
                quantity = item.get("qty")
                price = item.get("price")

                # Validate product existence
                product = Product.objects.filter(id=product_id).first()
                if not product:
                    return Response({"error": f"Product with ID {product_id} does not exist"},
                                    status=status.HTTP_400_BAD_REQUEST)

                # Validate stock availability
                if product.stock < quantity:
                    return Response({"error": f"Not enough stock for product {product.name}"},
                                    status=status.HTTP_400_BAD_REQUEST)

                # Create order instance
                order = Order(
                    customer_name=data.get('customer_name'),
                    customer_email=data.get('customer_email'),
                    order_key=order_key,
                    product=product,
                    qty=quantity,
                    price=price,
                    sub_total=quantity * price
                )
                order.save()
                orders.append(order)

                # Deduct stock
                product.stock -= quantity
                product.save()

                order_products.append({
                    "id": product.id,
                    "qty": quantity,
                    "price": price,
                    "sub_total": quantity * price
                })
                totalOrder += quantity * price

            # Response success
            return Response(
                {
                    "order_key": order_key,
                    "customer_name": data["customer_name"],
                    "customer_email": data["customer_email"],
                    "products": order_products,
                    "total_order": totalOrder,
                },
                status=status.HTTP_201_CREATED,
            )

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
