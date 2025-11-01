/// Mahsulot modeli
class Product {
  final String id;
  final String name;
  final String nameRu;
  final String nameEn;
  final String description;
  final String descriptionRu;
  final String descriptionEn;
  final double price;
  final String imageUrl;
  final String category;

  Product({
    required this.id,
    required this.name,
    required this.nameRu,
    required this.nameEn,
    required this.description,
    required this.descriptionRu,
    required this.descriptionEn,
    required this.price,
    required this.imageUrl,
    required this.category,
  });

  // JSON dan object yaratish
  factory Product.fromJson(Map<String, dynamic> json) {
    return Product(
      id: json['id'] as String,
      name: json['name'] as String,
      nameRu: json['nameRu'] as String,
      nameEn: json['nameEn'] as String,
      description: json['description'] as String,
      descriptionRu: json['descriptionRu'] as String,
      descriptionEn: json['descriptionEn'] as String,
      price: (json['price'] as num).toDouble(),
      imageUrl: json['imageUrl'] as String,
      category: json['category'] as String,
    );
  }

  // Object dan JSON ga o'tkazish
  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'nameRu': nameRu,
      'nameEn': nameEn,
      'description': description,
      'descriptionRu': descriptionRu,
      'descriptionEn': descriptionEn,
      'price': price,
      'imageUrl': imageUrl,
      'category': category,
    };
  }
}

