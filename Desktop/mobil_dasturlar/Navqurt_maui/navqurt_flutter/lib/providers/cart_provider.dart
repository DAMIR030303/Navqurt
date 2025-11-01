import 'package:flutter/material.dart';
import '../models/product.dart';
import '../models/cart_item.dart';
import '../services/cart_storage_service.dart';

/// Savat provider (state management)
class CartProvider extends ChangeNotifier {
  List<CartItem> _items = [];
  bool _isLoading = false;

  bool get isLoading => _isLoading;

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

  /// Savatni yuklash (ilova ochilganda)
  Future<void> loadCart() async {
    _isLoading = true;
    notifyListeners();

    try {
      _items = await CartStorageService.loadCart();
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  /// Savatni saqlash (har o'zgarishda)
  Future<void> _saveCart() async {
    await CartStorageService.saveCart(_items);
  }

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
    _saveCart();
  }

  /// Savatdan mahsulotni olib tashlash
  void removeItem(String productId) {
    _items.removeWhere((item) => item.product.id == productId);
    notifyListeners();
    _saveCart();
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
      _saveCart();
    }
  }

  /// Mahsulot sonini oshirish
  void increaseQuantity(String productId) {
    final index = _items.indexWhere((item) => item.product.id == productId);
    if (index >= 0) {
      _items[index].quantity++;
      notifyListeners();
      _saveCart();
    }
  }

  /// Savatni tozalash
  void clear() {
    _items.clear();
    notifyListeners();
    _saveCart();
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
      _saveCart();
    }
  }
}

