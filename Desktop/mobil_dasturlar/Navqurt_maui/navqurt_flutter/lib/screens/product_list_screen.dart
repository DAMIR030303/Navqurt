import 'package:flutter/material.dart';
import '../services/product_service.dart';
import '../widgets/product_card.dart';
import '../providers/language_provider.dart';
import 'package:provider/provider.dart';

/// Mahsulotlar ro'yxati ekrani
class ProductListScreen extends StatelessWidget {
  const ProductListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final languageProvider = Provider.of<LanguageProvider>(context);
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
                    // Buyurtma dialog
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
                            uz: '${product.name} mahsulotini buyurtma qilmoqchimisiz?',
                            ru: 'Хотите заказать товар ${product.nameRu}?',
                            en: 'Do you want to order ${product.nameEn}?',
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
                              ScaffoldMessenger.of(context).showSnackBar(
                                SnackBar(
                                  content: Text(
                                    languageProvider.translate(
                                      uz: 'Buyurtma muvaffaqiyatli qabul qilindi!',
                                      ru: 'Заказ успешно принят!',
                                      en: 'Order placed successfully!',
                                    ),
                                  ),
                                  backgroundColor: Colors.green,
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
                );
              },
            ),
    );
  }
}

