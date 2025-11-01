import '../models/product.dart';

/// Mahsulotlar servisi (mock data)
class ProductService {
  // Mock mahsulotlar ro'yxati
  static List<Product> getMockProducts() {
    return [
      Product(
        id: '1',
        name: 'NavQurut Classic',
        nameRu: 'Навкурут Классик',
        nameEn: 'NavQurut Classic',
        description: 'An\'anaviy navqurut - tabiiy va foydali',
        descriptionRu: 'Традиционный навкурут - натуральный и полезный',
        descriptionEn: 'Traditional navqurut - natural and healthy',
        price: 25000.0,
        imageUrl: 'https://via.placeholder.com/300x300?text=NavQurut+Classic',
        category: 'Classic',
      ),
      Product(
        id: '2',
        name: 'NavQurut Premium',
        nameRu: 'Навкурут Премиум',
        nameEn: 'NavQurut Premium',
        description: 'Premium navqurut - ajoyib ta\'m va sifat',
        descriptionRu: 'Премиум навкурут - отличный вкус и качество',
        descriptionEn: 'Premium navqurut - excellent taste and quality',
        price: 35000.0,
        imageUrl: 'https://via.placeholder.com/300x300?text=NavQurut+Premium',
        category: 'Premium',
      ),
      Product(
        id: '3',
        name: 'NavQurut Mini',
        nameRu: 'Навкурут Мини',
        nameEn: 'NavQurut Mini',
        description: 'Mini paket - kichik oilalar uchun',
        descriptionRu: 'Мини упаковка - для маленьких семей',
        descriptionEn: 'Mini package - for small families',
        price: 15000.0,
        imageUrl: 'https://via.placeholder.com/300x300?text=NavQurut+Mini',
        category: 'Mini',
      ),
      Product(
        id: '4',
        name: 'NavQurut Family',
        nameRu: 'Навкурут Семейный',
        nameEn: 'NavQurut Family',
        description: 'Katta paket - katta oilalar uchun',
        descriptionRu: 'Большая упаковка - для больших семей',
        descriptionEn: 'Large package - for large families',
        price: 50000.0,
        imageUrl: 'https://via.placeholder.com/300x300?text=NavQurut+Family',
        category: 'Family',
      ),
    ];
  }

  // ID bo'yicha mahsulot topish
  static Product? getProductById(String id) {
    return getMockProducts().firstWhere(
      (product) => product.id == id,
      orElse: () => throw Exception('Product not found'),
    );
  }

  // Kategoriya bo'yicha mahsulotlar
  static List<Product> getProductsByCategory(String category) {
    return getMockProducts()
        .where((product) => product.category == category)
        .toList();
  }
}

