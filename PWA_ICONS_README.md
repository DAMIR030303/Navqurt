# PWA Icons

PWA funksionalligi to'liq ishlashi uchun quyidagi icon fayllarni yaratishingiz kerak:

## Kerakli iconlar

1. **icon-192x192.png** - 192x192 piksel PNG formatida
2. **icon-512x512.png** - 512x512 piksel PNG formatida  
3. **apple-touch-icon.png** - 180x180 piksel PNG formatida (iOS uchun)

## Iconlar yaratish

Iconlarni yaratish uchun quyidagi vositalardan foydalanishingiz mumkin:

- [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)
- [RealFaviconGenerator](https://realfavicongenerator.net/)
- [Favicon.io](https://favicon.io/)

Yoki o'zingizning dizayneringiz tomonidan yaratilgan logo/icon faylidan foydalanishingiz mumkin.

## Joylashtirish

Barcha icon fayllarni `public/` papkasiga joylashtiring:
- `/public/icon-192x192.png`
- `/public/icon-512x512.png`
- `/public/apple-touch-icon.png`

## Eslatma

Iconlar yaratilgunga qadar PWA to'liq ishlamaydi. Iconlar yaratilgandan keyin `pnpm build` buyrug'ini ishga tushiring.

