const fs = require('fs');

// Markdown faylni o'qish
const markdown = fs.readFileSync('AI_BOSHQARUV_HISOBOT.md', 'utf8');

// HTML ga aylantirish (oddiy)
const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI Boshqaruv - Loyiha Holati</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
    h1 { color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; }
    h2 { color: #1e40af; margin-top: 30px; }
    h3 { color: #3b82f6; }
    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
    th { background-color: #2563eb; color: white; }
    code { background-color: #f4f4f4; padding: 2px 6px; border-radius: 3px; }
    pre { background-color: #f4f4f4; padding: 15px; border-radius: 5px; overflow-x: auto; }
    .status-ok { color: #10b981; }
    .status-warn { color: #f59e0b; }
    .status-error { color: #ef4444; }
  </style>
</head>
<body>
${markdown.replace(/\n/g, '<br>').replace(/```/g, '<pre>').replace(/`/g, '<code>')}
</body>
</html>
`;

fs.writeFileSync('AI_BOSHQARUV_HISOBOT.html', html);
