import 'package:flutter/material.dart';

/// Til provider (i18n)
class LanguageProvider extends ChangeNotifier {
  Locale _locale = const Locale('uz', 'UZ');

  Locale get locale => _locale;

  String get currentLanguage {
    switch (_locale.languageCode) {
      case 'uz':
        return 'O\'zbek';
      case 'ru':
        return 'Русский';
      case 'en':
        return 'English';
      default:
        return 'O\'zbek';
    }
  }

  void setLocale(Locale locale) {
    _locale = locale;
    notifyListeners();
  }

  void setLanguage(String languageCode) {
    switch (languageCode) {
      case 'uz':
        setLocale(const Locale('uz', 'UZ'));
        break;
      case 'ru':
        setLocale(const Locale('ru', 'RU'));
        break;
      case 'en':
        setLocale(const Locale('en', 'US'));
        break;
      default:
        setLocale(const Locale('uz', 'UZ'));
    }
  }

  // Matnni joriy tilga o'girish
  String translate({
    required String uz,
    String? ru,
    String? en,
  }) {
    switch (_locale.languageCode) {
      case 'ru':
        return ru ?? uz;
      case 'en':
        return en ?? uz;
      default:
        return uz;
    }
  }
}

