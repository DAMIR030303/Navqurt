import 'package:flutter/material.dart';
import '../models/product.dart';
import '../models/cart_item.dart';

/// Savat provider (state management)
class CartProvider extends ChangeNotifier {
  final List<CartItem> _items = [];

  /// Barcha savat elementlari
  List<CartItem> get items => _items;

  /// Savatdagi mahsulotlar soni
  int get itemCount => _items.fold(0, (sum, item) => sum + item.quantity);

  /// Jami narx
  double get totalPrice {
    return _items.fold(0.0, (sum, item) => sum + item.totalPrice);
  }

  /// Formatlangan jami narx
  String get formattedTotalPrice {
    return totalPrice.toStringAsFixed(0);
  }

  /// Savat bo'shmi?
  bool get isEmpty => _items.isEmpty;

  /// Savatga mahsulot qo'shish
  void addItem(Product product) {
    final existingIndex = _items.indexWhere(
      (item) => item.product.id == product.id,
    );

    if (existingIndex >= 0) {
      // Agar mahsulot allaqachon savatda bo'lsa, sonini oshirish
      _items[existingIndex].quantity++;
    } else {
      // Yangi mahsulot qo'shish
      _items.add(CartItem(product: product, quantity: 1));
    }

    notifyListeners();
  }

  /// Savatdan mahsulotni olib tashlash
  void removeItem(String productId) {
    _items.removeWhere((item) => item.product.id == productId);
    notifyListeners();
  }

  /// Mahsulot sonini kamaytirish
  void decreaseQuantity(String productId) {
    final index = _items.indexWhere((item) => item.product.id == productId);
    if (index >= 0) {
      if (_items[index].quantity > 1) {
        _items[index].quantity--;
      } else {
        _items.removeAt(index);
      }
      notifyListeners();
    }
  }

  /// Mahsulot sonini oshirish
  void increaseQuantity(String productId) {
    final index = _items.indexWhere((item) => item.product.id == productId);
    if (index >= 0) {
      _items[index].quantity++;
      notifyListeners();
    }
  }

  /// Savatni tozalash
  void clear() {
    _items.clear();
    notifyListeners();
  }

  /// Bitta mahsulot sonini o'rnatish
  void setQuantity(String productId, int quantity) {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    final index = _items.indexWhere((item) => item.product.id == productId);
    if (index >= 0) {
      _items[index].quantity = quantity;
      notifyListeners();
    }
  }
}

