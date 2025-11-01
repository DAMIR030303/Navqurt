import 'product.dart';

/// Savat elementi modeli
class CartItem {
  final Product product;
  int quantity;

  CartItem({
    required this.product,
    this.quantity = 1,
  });

  /// Jami narx
  double get totalPrice => product.price * quantity;

  /// Narxni formatlash
  String getFormattedPrice() {
    return (product.price * quantity).toStringAsFixed(0);
  }

  /// JSON dan object yaratish
  factory CartItem.fromJson(Map<String, dynamic> json) {
    return CartItem(
      product: Product.fromJson(json['product'] as Map<String, dynamic>),
      quantity: json['quantity'] as int? ?? 1,
    );
  }

  /// Object dan JSON ga o'tkazish
  Map<String, dynamic> toJson() {
    return {
      'product': product.toJson(),
      'quantity': quantity,
    };
  }
}

