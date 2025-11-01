import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../models/product.dart';
import '../providers/language_provider.dart';
import '../providers/cart_provider.dart';
import '../screens/cart_screen.dart';

/// Mahsulot detallari ekrani
class ProductDetailScreen extends StatelessWidget {
  final Product product;

  const ProductDetailScreen({
    super.key,
    required this.product,
  });

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);
    final currencyFormat = NumberFormat.currency(
      symbol: 'so\'m',
      decimalDigits: 0,
    );

    final productName = languageProvider.translate(
      uz: product.name,
      ru: product.nameRu,
      en: product.nameEn,
    );

    final productDescription = languageProvider.translate(
      uz: product.description,
      ru: product.descriptionRu,
      en: product.descriptionEn,
    );

    final categoryName = languageProvider.translate(
      uz: product.category,
      ru: product.category,
      en: product.category,
    );

    return Scaffold(
      backgroundColor: const Color(0xFF1E293B),
      body: CustomScrollView(
        slivers: [
          // AppBar bilan rasm
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,
            backgroundColor: const Color(0xFF2563EB),
            foregroundColor: Colors.white,
            flexibleSpace: FlexibleSpaceBar(
              background: Image.network(
                product.imageUrl,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    color: Colors.grey[800],
                    child: const Center(
                      child: Icon(
                        Icons.image_not_supported,
                        size: 80,
                        color: Colors.grey,
                      ),
                    ),
                  );
                },
              ),
            ),
          ),
          // Ma'lumotlar
          SliverToBoxAdapter(
            child: Container(
              color: const Color(0xFF1E293B),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Kategoriya
                  Padding(
                    padding: const EdgeInsets.fromLTRB(16, 16, 16, 8),
                    child: Container(
                      padding: const EdgeInsets.symmetric(
                        horizontal: 12,
                        vertical: 6,
                      ),
                      decoration: BoxDecoration(
                        color: const Color(0xFF2563EB).withValues(alpha: 0.2),
                        borderRadius: BorderRadius.circular(20),
                        border: Border.all(
                          color: const Color(0xFF2563EB),
                          width: 1,
                        ),
                      ),
                      child: Text(
                        categoryName,
                        style: const TextStyle(
                          color: Color(0xFF2563EB),
                          fontSize: 12,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ),
                  // Nomi
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Text(
                      productName,
                      style: const TextStyle(
                        fontSize: 28,
                        fontWeight: FontWeight.bold,
                        color: Colors.white,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),
                  // Narx
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Row(
                      children: [
                        Text(
                          currencyFormat.format(product.price),
                          style: const TextStyle(
                            fontSize: 32,
                            fontWeight: FontWeight.bold,
                            color: Color(0xFF2563EB),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 24),
                  // Tavsif
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text(
                          languageProvider.translate(
                            uz: 'Tavsif',
                            ru: 'Описание',
                            en: 'Description',
                          ),
                          style: const TextStyle(
                            fontSize: 20,
                            fontWeight: FontWeight.bold,
                            color: Colors.white,
                          ),
                        ),
                        const SizedBox(height: 12),
                        Text(
                          productDescription,
                          style: TextStyle(
                            fontSize: 16,
                            color: Colors.grey[300],
                            height: 1.6,
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                  // Tugmalar
                  Padding(
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      children: [
                        // Savatga qo'shish tugmasi
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: ElevatedButton.icon(
                            onPressed: () {
                              cartProvider.addItem(product);
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    languageProvider.translate(
                                      uz: '$productName savatga qo\'shildi',
                                      ru: '$productName добавлен в корзину',
                                      en: '$productName added to cart',
                                    ),
                                  ),
                                  backgroundColor: Colors.green,
                                  duration: const Duration(seconds: 2),
                                  action: SnackBarAction(
                                    label: languageProvider.translate(
                                      uz: 'Savatni ko\'rish',
                                      ru: 'Посмотреть корзину',
                                      en: 'View Cart',
                                    ),
                                    textColor: Colors.white,
                                    onPressed: () {
                                      Navigator.push(
                                        context,
                                        MaterialPageRoute(
                                          builder: (context) =>
                                              const CartScreen(),
                                        ),
                                      );
                                    },
                                  ),
                                ),
                              );
                            },
                            icon: const Icon(Icons.add_shopping_cart),
                            label: Text(
                              languageProvider.translate(
                                uz: 'Savatga qo\'shish',
                                ru: 'Добавить в корзину',
                                en: 'Add to Cart',
                              ),
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            style: ElevatedButton.styleFrom(
                              backgroundColor: const Color(0xFF2563EB),
                              foregroundColor: Colors.white,
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                          ),
                        ),
                        const SizedBox(height: 12),
                        // Darhol buyurtma tugmasi
                        SizedBox(
                          width: double.infinity,
                          height: 56,
                          child: OutlinedButton.icon(
                            onPressed: () {
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
                                          '$productName mahsulotini ${currencyFormat.format(product.price)} miqdorida buyurtma qilmoqchimisiz?',
                                      ru:
                                          'Хотите заказать $productName на сумму ${currencyFormat.format(product.price)}?',
                                      en:
                                          'Do you want to order $productName for ${currencyFormat.format(product.price)}?',
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
                                        cartProvider.addItem(product);
                                        Navigator.push(
                                          context,
                                          MaterialPageRoute(
                                            builder: (context) =>
                                                const CartScreen(),
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
                            icon: const Icon(Icons.shopping_bag),
                            label: Text(
                              languageProvider.translate(
                                uz: 'Darhol buyurtma berish',
                                ru: 'Заказать сейчас',
                                en: 'Order Now',
                              ),
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            style: OutlinedButton.styleFrom(
                              foregroundColor: const Color(0xFF2563EB),
                              side: const BorderSide(
                                color: Color(0xFF2563EB),
                                width: 2,
                              ),
                              shape: RoundedRectangleBorder(
                                borderRadius: BorderRadius.circular(12),
                              ),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                  const SizedBox(height: 32),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}

