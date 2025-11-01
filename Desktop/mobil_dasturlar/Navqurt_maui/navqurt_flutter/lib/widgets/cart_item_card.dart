import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:intl/intl.dart';
import '../providers/cart_provider.dart';
import '../providers/language_provider.dart';
import '../models/cart_item.dart';

/// Savat elementi kartasi
class CartItemCard extends StatelessWidget {
  final CartItem cartItem;

  const CartItemCard({
    super.key,
    required this.cartItem,
  });

  @override
  Widget build(BuildContext context) {
    final cartProvider = Provider.of<CartProvider>(context);
    final languageProvider = Provider.of<LanguageProvider>(context);
    final currencyFormat = NumberFormat.currency(
      symbol: 'so\'m',
      decimalDigits: 0,
    );

    final productName = languageProvider.translate(
      uz: cartItem.product.name,
      ru: cartItem.product.nameRu,
      en: cartItem.product.nameEn,
    );

    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      elevation: 4,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Row(
          children: [
            // Rasm
            ClipRRect(
              borderRadius: BorderRadius.circular(8),
              child: Image.network(
                cartItem.product.imageUrl,
                width: 80,
                height: 80,
                fit: BoxFit.cover,
                errorBuilder: (context, error, stackTrace) {
                  return Container(
                    width: 80,
                    height: 80,
                    color: Colors.grey[300],
                    child: const Icon(
                      Icons.image_not_supported,
                      color: Colors.grey,
                    ),
                  );
                },
              ),
            ),
            const SizedBox(width: 12),
            // Ma'lumotlar
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    productName,
                    style: const TextStyle(
                      fontSize: 16,
                      fontWeight: FontWeight.bold,
                    ),
                    maxLines: 2,
                    overflow: TextOverflow.ellipsis,
                  ),
                  const SizedBox(height: 4),
                  Text(
                    currencyFormat.format(cartItem.product.price),
                    style: TextStyle(
                      fontSize: 14,
                      color: Colors.grey[600],
                    ),
                  ),
                  const SizedBox(height: 8),
                  // Miqdor va jami narx
                  Row(
                    mainAxisAlignment: MainAxisAlignment.spaceBetween,
                    children: [
                      // Miqdor boshqaruvi
                      Row(
                        children: [
                          IconButton(
                            icon: const Icon(Icons.remove_circle_outline),
                            onPressed: () {
                              cartProvider.decreaseQuantity(
                                cartItem.product.id,
                              );
                            },
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                          ),
                          Padding(
                            padding:
                                const EdgeInsets.symmetric(horizontal: 12),
                            child: Text(
                              '${cartItem.quantity}',
                              style: const TextStyle(
                                fontSize: 18,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ),
                          IconButton(
                            icon: const Icon(Icons.add_circle_outline),
                            onPressed: () {
                              cartProvider.increaseQuantity(
                                cartItem.product.id,
                              );
                            },
                            padding: EdgeInsets.zero,
                            constraints: const BoxConstraints(),
                          ),
                        ],
                      ),
                      // Jami narx
                      Text(
                        currencyFormat.format(cartItem.totalPrice),
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.bold,
                          color: Color(0xFF2563EB),
                        ),
                      ),
                    ],
                  ),
                ],
              ),
            ),
            // O'chirish tugmasi
            IconButton(
              icon: const Icon(Icons.delete_outline),
              color: Colors.red,
              onPressed: () {
                cartProvider.removeItem(cartItem.product.id);
                ScaffoldMessenger.of(context).showSnackBar(
                  SnackBar(
                      content: Text(
                        languageProvider.translate(
                          uz: '$productName savatdan olib tashlandi',
                          ru: '$productName удален из корзины',
                          en: '$productName removed from cart',
                        ),
                      ),
                    duration: const Duration(seconds: 2),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

