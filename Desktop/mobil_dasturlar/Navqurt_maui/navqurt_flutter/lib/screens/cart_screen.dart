import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';
import '../widgets/cart_item_card.dart';

/// Savat ekrani
class CartScreen extends StatelessWidget {
  const CartScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final cartProvider = Provider.of<CartProvider>(context);
    final languageProvider = Provider.of<LanguageProvider>(context);
    final currencyFormat = NumberFormat.currency(
      symbol: 'so\'m',
      decimalDigits: 0,
    );

    return Scaffold(
      backgroundColor: const Color(0xFF1E293B),
      appBar: AppBar(
        title: Text(
          languageProvider.translate(
            uz: 'Savat',
            ru: 'Корзина',
            en: 'Cart',
          ),
        ),
        backgroundColor: const Color(0xFF2563EB),
        foregroundColor: Colors.white,
        elevation: 0,
      ),
      body: cartProvider.isEmpty
          ? Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(
                    Icons.shopping_cart_outlined,
                    size: 80,
                    color: Colors.grey[400],
                  ),
                  const SizedBox(height: 16),
                  Text(
                    languageProvider.translate(
                      uz: 'Savat bo\'sh',
                      ru: 'Корзина пуста',
                      en: 'Cart is empty',
                    ),
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.grey[400],
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    languageProvider.translate(
                      uz: 'Mahsulot qo\'shish uchun asosiy sahifaga o\'ting',
                      ru: 'Перейдите на главную страницу, чтобы добавить товары',
                      en: 'Go to home page to add products',
                    ),
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[500],
                    ),
                    textAlign: TextAlign.center,
                  ),
                ],
              ),
            )
          : Column(
              children: [
                // Mahsulotlar ro'yxati
                Expanded(
                  child: ListView.builder(
                    padding: const EdgeInsets.symmetric(vertical: 8),
                    itemCount: cartProvider.items.length,
                    itemBuilder: (context, index) {
                      final cartItem = cartProvider.items[index];
                      return CartItemCard(cartItem: cartItem);
                    },
                  ),
                ),
                // Jami narx va tozalash
                Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: const Color(0xFF0F172A),
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black.withValues(alpha: 0.2),
                        blurRadius: 10,
                        offset: const Offset(0, -2),
                      ),
                    ],
                  ),
                  child: Column(
                    children: [
                      Row(
                        mainAxisAlignment: MainAxisAlignment.spaceBetween,
                        children: [
                          Text(
                            languageProvider.translate(
                              uz: 'Jami:',
                              ru: 'Итого:',
                              en: 'Total:',
                            ),
                            style: const TextStyle(
                              fontSize: 20,
                              fontWeight: FontWeight.bold,
                              color: Colors.white,
                            ),
                          ),
                          Text(
                            currencyFormat.format(cartProvider.totalPrice),
                            style: const TextStyle(
                              fontSize: 24,
                              fontWeight: FontWeight.bold,
                              color: Color(0xFF2563EB),
                            ),
                          ),
                        ],
                      ),
                      const SizedBox(height: 16),
                      Row(
                        children: [
                          Expanded(
                            child: OutlinedButton(
                              onPressed: () {
                                cartProvider.clear();
                                ScaffoldMessenger.of(context).showSnackBar(
                                  SnackBar(
                                    content: Text(
                                      languageProvider.translate(
                                        uz: 'Savat tozalandi',
                                        ru: 'Корзина очищена',
                                        en: 'Cart cleared',
                                      ),
                                    ),
                                    backgroundColor: Colors.orange,
                                  ),
                                );
                              },
                              style: OutlinedButton.styleFrom(
                                foregroundColor: Colors.white,
                                side: const BorderSide(
                                  color: Colors.orange,
                                  width: 2,
                                ),
                                padding: const EdgeInsets.symmetric(vertical: 16),
                              ),
                              child: Text(
                                languageProvider.translate(
                                  uz: 'Tozalash',
                                  ru: 'Очистить',
                                  en: 'Clear',
                                ),
                              ),
                            ),
                          ),
                          const SizedBox(width: 16),
                          Expanded(
                            flex: 2,
                            child: ElevatedButton(
                              onPressed: () {
                                // Buyurtma berish logikasi
                                showDialog(
                                  context: context,
                                  builder: (context) => AlertDialog(
                                    title: Text(
                                      languageProvider.translate(
                                        uz: 'Buyurtma berish',
                                        ru: 'Сделать заказ',
                                        en: 'Place Order',
                                      ),
                                    ),
                                    content: Text(
                                      languageProvider.translate(
                                        uz:
                                            'Jami ${currencyFormat.format(cartProvider.totalPrice)} miqdorida buyurtma berishni tasdiqlaysizmi?',
                                        ru:
                                            'Вы подтверждаете заказ на сумму ${currencyFormat.format(cartProvider.totalPrice)}?',
                                        en:
                                            'Do you confirm the order for ${currencyFormat.format(cartProvider.totalPrice)}?',
                                      ),
                                    ),
                                    actions: [
                                      TextButton(
                                        onPressed: () => Navigator.pop(context),
                                        child: Text(
                                          languageProvider.translate(
                                            uz: 'Bekor qilish',
                                            ru: 'Отмена',
                                            en: 'Cancel',
                                          ),
                                        ),
                                      ),
                                      ElevatedButton(
                                        onPressed: () {
                                          Navigator.pop(context);
                                          cartProvider.clear();
                                          ScaffoldMessenger.of(context)
                                              .showSnackBar(
                                            SnackBar(
                                              content: Text(
                                                languageProvider.translate(
                                                  uz:
                                                      'Buyurtma muvaffaqiyatli qabul qilindi!',
                                                  ru: 'Заказ успешно принят!',
                                                  en: 'Order placed successfully!',
                                                ),
                                              ),
                                              backgroundColor: Colors.green,
                                              duration:
                                                  const Duration(seconds: 2),
                                            ),
                                          );
                                        },
                                        child: Text(
                                          languageProvider.translate(
                                            uz: 'Tasdiqlash',
                                            ru: 'Подтвердить',
                                            en: 'Confirm',
                                          ),
                                        ),
                                      ),
                                    ],
                                  ),
                                );
                              },
                              style: ElevatedButton.styleFrom(
                                backgroundColor: const Color(0xFF2563EB),
                                foregroundColor: Colors.white,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                              ),
                              child: Text(
                                languageProvider.translate(
                                  uz: 'Buyurtma berish',
                                  ru: 'Заказать',
                                  en: 'Place Order',
                                ),
                                style: const TextStyle(
                                  fontSize: 16,
                                  fontWeight: FontWeight.bold,
                                ),
                              ),
                            ),
                          ),
                        ],
                      ),
                    ],
                  ),
                ),
              ],
            ),
    );
  }
}

