from django.db import migrations

def add_initial_products(apps, schema_editor):
    Product = apps.get_model('shop', 'Product')
    Product.objects.create(name="Eyeshadow Palette with Mirror", price=100.00, stock=50, image_url="https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png")
    Product.objects.create(name="Essence Mascara Lash Princess", price=200.00, stock=30, image_url="https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png")
    Product.objects.create(name="Powder Canister", price=150.00, stock=20, image_url="https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png")
    Product.objects.create(name="Red Lipstick", price=120.00, stock=15, image_url="https://cdn.dummyjson.com/products/images/beauty/Red%20Lipstick/thumbnail.png")
    Product.objects.create(name="Red Nail Polis", price=250.00, stock=10, image_url="https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png")
    Product.objects.create(name="Calvin Klein CK One", price=90.00, stock=40, image_url="https://cdn.dummyjson.com/products/images/fragrances/Calvin%20Klein%20CK%20One/thumbnail.png")
    Product.objects.create(name="Chanel Coco Noir Eau D", price=180.00, stock=25, image_url="https://cdn.dummyjson.com/products/images/fragrances/Chanel%20Coco%20Noir%20Eau%20De/thumbnail.png")
    Product.objects.create(name="Dior Jadore", price=300.00, stock=5, image_url="https://cdn.dummyjson.com/products/images/fragrances/Dior%20J'adore/thumbnail.png")
    Product.objects.create(name="Dolce Shine Eau de", price=220.00, stock=35, image_url="https://cdn.dummyjson.com/products/images/fragrances/Dolce%20Shine%20Eau%20de/thumbnail.png")
    Product.objects.create(name="Gucci Bloom Eau de", price=175.00, stock=18, image_url="https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png")

class Migration(migrations.Migration):

    dependencies = [
        ('shop', '0001_initial'),  # Pastikan ini sesuai dengan migrasi yang ada
    ]

    operations = [
        migrations.RunPython(add_initial_products),
    ]
