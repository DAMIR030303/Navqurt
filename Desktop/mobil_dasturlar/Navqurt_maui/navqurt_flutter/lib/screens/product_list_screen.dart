import 'package:flutter/material.dart';
import '../services/product_service.dart';
import '../widgets/product_card.dart';
import '../providers/language_provider.dart';
import '../providers/cart_provider.dart';
import 'cart_screen.dart';
import 'package:provider/provider.dart';

/// Mahsulotlar ro'yxati ekrani
class ProductListScreen extends StatelessWidget {
  const ProductListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
    final cartProvider = Provider.of<CartProvider>(context);
    final products = ProductService.getMockProducts();

    return Scaffold(
      backgroundColor: const Color(0xFF1E293B), // To'q kulrang fon
      appBar: AppBar(
        title: Text(
          languageProvider.translate(
            uz: 'NavQurut',
            ru: 'Навкурут',
            en: 'NavQurut',
          ),
        ),
        backgroundColor: const Color(0xFF2563EB),
        foregroundColor: Colors.white,
        elevation: 0,
        actions: [
          // Savat icon (badge bilan)
          Stack(
            children: [
              IconButton(
                icon: const Icon(Icons.shopping_cart),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => const CartScreen(),
                    ),
                  );
                },
              ),
              if (cartProvider.itemCount > 0)
                Positioned(
                  right: 8,
                  top: 8,
                  child: Container(
                    padding: const EdgeInsets.all(4),
                    decoration: BoxDecoration(
                      color: Colors.red,
                      shape: BoxShape.circle,
                    ),
                    constraints: const BoxConstraints(
                      minWidth: 16,
                      minHeight: 16,
                    ),
                    child: Text(
                      '${cartProvider.itemCount}',
                      style: const TextStyle(
                        color: Colors.white,
                        fontSize: 10,
                        fontWeight: FontWeight.bold,
                      ),
                      textAlign: TextAlign.center,
                    ),
                  ),
                ),
            ],
          ),
          // Til o'zgartirish tugmasi
          PopupMenuButton<String>(
            icon: const Icon(Icons.language),
            onSelected: (value) {
              languageProvider.setLanguage(value);
            },
            itemBuilder: (context) => [
              PopupMenuItem(
                value: 'uz',
                child: Row(
                  children: [
                    const Icon(Icons.check, size: 16),
                    if (languageProvider.locale.languageCode == 'uz')
                      const SizedBox(width: 8),
                    if (languageProvider.locale.languageCode != 'uz')
                      const SizedBox(width: 24),
                    const Text('O\'zbek'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'ru',
                child: Row(
                  children: [
                    if (languageProvider.locale.languageCode == 'ru')
                      const Icon(Icons.check, size: 16),
                    if (languageProvider.locale.languageCode == 'ru')
                      const SizedBox(width: 8),
                    if (languageProvider.locale.languageCode != 'ru')
                      const SizedBox(width: 24),
                    const Text('Русский'),
                  ],
                ),
              ),
              PopupMenuItem(
                value: 'en',
                child: Row(
                  children: [
                    if (languageProvider.locale.languageCode == 'en')
                      const Icon(Icons.check, size: 16),
                    if (languageProvider.locale.languageCode == 'en')
                      const SizedBox(width: 8),
                    if (languageProvider.locale.languageCode != 'en')
                      const SizedBox(width: 24),
                    const Text('English'),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
      body: products.isEmpty
          ? Center(
              child: Text(
                languageProvider.translate(
                  uz: 'Mahsulotlar topilmadi',
                  ru: 'Товары не найдены',
                  en: 'No products found',
                ),
                style: const TextStyle(
                  color: Colors.white,
                  fontSize: 18,
                ),
              ),
            )
          : ListView.builder(
              padding: const EdgeInsets.symmetric(vertical: 8),
              itemCount: products.length,
              itemBuilder: (context, index) {
                final product = products[index];
                return ProductCard(
                  product: product,
                  onTap: () {
                    // Savatga qo'shish
                    cartProvider.addItem(product);
                    ScaffoldMessenger.of(context).showSnackBar(
                      SnackBar(
                        content: Text(
                          languageProvider.translate(
                            uz: '${product.name} savatga qo\'shildi',
                            ru: '${product.nameRu} добавлен в корзину',
                            en: '${product.nameEn} added to cart',
                          ),
                        ),
                        backgroundColor: Colors.green,
                        duration: const Duration(seconds: 2),
                        action: SnackBarAction(
                          label: languageProvider.translate(
                            uz: 'Savat',
                            ru: 'Корзина',
                            en: 'Cart',
                          ),
                          textColor: Colors.white,
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => const CartScreen(),
                              ),
                            );
                          },
                        ),
                      ),
                    );
                  },
                );
              },
            ),
    );
  }
}

