import 'dart:convert';
import 'package:shared_preferences/shared_preferences.dart';
import '../models/cart_item.dart';

/// Savat ma'lumotlarini local storage'da saqlash servisi
class CartStorageService {
  static const String _cartKey = 'cart_items';

  /// Savatni saqlash
  static Future<void> saveCart(List<CartItem> items) async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = jsonEncode(
        items.map((item) => item.toJson()).toList(),
      );
      await prefs.setString(_cartKey, jsonString);
    } catch (e) {
      // Xatolikni log qilish (production'da logger ishlatish kerak)
      // ignore: avoid_print
      print('Error saving cart: $e');
    }
  }

  /// Savatni yuklash
  static Future<List<CartItem>> loadCart() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      final jsonString = prefs.getString(_cartKey);

      if (jsonString == null || jsonString.isEmpty) {
        return [];
      }

      final List<dynamic> jsonList = jsonDecode(jsonString);
      return jsonList
          .map((json) => CartItem.fromJson(json as Map<String, dynamic>))
          .toList();
    } catch (e) {
      // Xatolikni log qilish
      // ignore: avoid_print
      print('Error loading cart: $e');
      return [];
    }
  }

  /// Savatni tozalash
  static Future<void> clearCart() async {
    try {
      final prefs = await SharedPreferences.getInstance();
      await prefs.remove(_cartKey);
    } catch (e) {
      // ignore: avoid_print
      print('Error clearing cart: $e');
    }
  }
}

