# نشر الموقع مجاناً (GitHub + Netlify + Neon)

## قاعدة ذهبية
**ملفات المشروع لازم تكون في أول الـ repo مباشرة** (`package.json` و`src` و`public` و`netlify.toml` في الصفحة الأولى على GitHub).
لو لقيت مجلد اسمه `ismart` أو غيره بيلف الملفات، Netlify مش هيشوف المشروع وهتطلع صفحة 404.

## 1) قاعدة البيانات (Neon)
1. سجّل في https://neon.tech ← Create project ← انسخ **Connection string** (يبدأ بـ `postgresql://`). دي قيمة `DATABASE_URL`.
2. الجداول بتتعمل تلقائياً عند أول زيارة.

## 2) GitHub
افتح الـ Terminal **جوه مجلد المشروع** (اللي فيه package.json):

    git init
    git add .
    git commit -m "I Smart Digit"
    git branch -M main
    git remote add origin https://github.com/<حسابك>/<اسم-الـ-repo>.git
    git push -u origin main

للتحديثات بعد كده: `git add . && git commit -m "update" && git push` (Netlify بيعيد النشر لوحده).

## 3) Netlify
1. Add new project ← Import an existing project ← GitHub ← الـ repo.
2. **سيب Base directory و Publish directory و Functions directory فاضيين.** الـ `netlify.toml` موجود.
3. ضيف في **Environment variables** (قبل Deploy):
   - `ADMIN_EMAIL`    إيميل دخول اللوحة
   - `ADMIN_PASSWORD` كلمة مرور قوية
   - `AUTH_SECRET`    نص عشوائي طويل (`openssl rand -hex 32`)
   - `DATABASE_URL`   رابط Neon
4. Deploy. بعدها **Project configuration ← General ← Project name** = `ismartdigit`.
5. **مهم:** المشروع بيتعمل **Private** افتراضياً. اضغط **Make public** من صفحة المشروع عشان أي حد غيرك يشوفه.
6. افتح `/admin/login` وجرب تدخل وتعدّل نص.

> مفيش drag & drop للموقع ده (فيه سيرفر). ولا تخلي وكيل Netlify الآلي يعدّل الكود، التعديلات من جهازك بس.

## 4) الدومين الحقيقي (لاحقاً)
Domain management ← Add a domain ← `ismartdigit.com` ← حط سجلات DNS عند مسجل الدومين. الـ HTTPS تلقائي.

## لو الرابط بيشتغل عندك بس
1. اتأكد إن المشروع **Public** (مش Private).
2. من الموبايل جرب **داتا الموبايل** بدل الواي فاي (أو العكس).
3. لو `ERR_CONNECTION_TIMED_OUT`: دي مشكلة شبكة/DNS عند الجهاز، مش في الكود. غيّر الـ DNS (أندرويد: الإعدادات ← الاتصال ← DNS الخاص ← `dns.google`) أو جرب من شبكة تانية.
4. لو بعد كده بيفتح صفحة تسجيل دخول Netlify، يبقى المشروع لسه Private.

## ملاحظات
- صور المشاريع تترفع من لوحة التحكم (بتتخزن في Neon).
- تغيير `AUTH_SECRET` ينهي كل الجلسات.
- الخطة المجانية ليها حد استخدام شهري، راجعه في صفحة الخطط.
