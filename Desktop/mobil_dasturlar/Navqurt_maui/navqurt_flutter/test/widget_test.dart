// NavQurut Flutter ilovasi testlari

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:navqurt_flutter/main.dart';
import 'package:navqurt_flutter/services/product_service.dart';
import 'package:navqurt_flutter/providers/cart_provider.dart';

void main() {
  testWidgets('App yuklanadi va mahsulotlar ro\'yxati ko\'rsatiladi', (WidgetTester tester) async {
    // App ni yuklash
    final cartProvider = CartProvider();
    await tester.pumpWidget(MyApp(cartProvider: cartProvider));
    await tester.pumpAndSettle();

    // AppBar'da "NavQurut" matni borligini tekshirish
    expect(find.text('NavQurut'), findsOneWidget);

    // Mahsulotlar ro'yxati yuklanganini tekshirish
    final products = ProductService.getMockProducts();
    expect(products.length, greaterThan(0));

    // Kamida bir mahsulot nomi ko'rsatilganini tekshirish
    expect(find.text('NavQurut Classic'), findsWidgets);
  });

  testWidgets('Barcha mahsulotlar ro\'yxatda ko\'rsatiladi', (WidgetTester tester) async {
    final cartProvider = CartProvider();
    await tester.pumpWidget(MyApp(cartProvider: cartProvider));
    await tester.pumpAndSettle();

    // Barcha mahsulotlarni tekshirish (ListView'da scroll qilish kerak)
    expect(find.text('NavQurut Classic'), findsWidgets);
    expect(find.text('NavQurut Premium'), findsWidgets);
    
    // Scroll qilib qolgan mahsulotlarni ko'rish
    final scrollableFinder = find.byType(Scrollable);
    expect(scrollableFinder, findsOneWidget);
    
    // Scroll qilish
    await tester.scrollUntilVisible(
      find.text('NavQurut Mini'),
      500.0,
      scrollable: scrollableFinder,
    );
    expect(find.text('NavQurut Mini'), findsWidgets);
    
    await tester.scrollUntilVisible(
      find.text('NavQurut Family'),
      500.0,
      scrollable: scrollableFinder,
    );
    expect(find.text('NavQurut Family'), findsWidgets);
  });

  testWidgets('Til o\'zgartirish tugmasi mavjud', (WidgetTester tester) async {
    final cartProvider = CartProvider();
    await tester.pumpWidget(MyApp(cartProvider: cartProvider));
    await tester.pumpAndSettle();

    // Til o'zgartirish ikonkasi (language icon) borligini tekshirish
    expect(find.byIcon(Icons.language), findsOneWidget);
  });
}
