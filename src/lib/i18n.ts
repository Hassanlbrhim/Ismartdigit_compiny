// Fixed interface strings (not admin-editable). Editable marketing copy lives in defaults.ts / the JSON store.
const ar = {
  brand1: "آي سمارت", brand2: "ديجيت",
  nav: { home: "الرئيسية", about: "من نحن", services: "خدماتنا", works: "أعمالنا" },
  contactUs: "تواصل معنا", more: "معرفة المزيد", viewProject: "عرض المشروع", visit: "زيارة المشروع", close: "إغلاق",
  quick: "روابط سريعة", privacy: "سياسة الخصوصية", terms: "شروط الاستخدام",
  rights: "جميع الحقوق محفوظة لصالح iSmartDigit © 2026", themeToggle: "تبديل الوضع", langToggle: "EN",
  form: {
    name: "الاسم الكامل", email: "البريد الإلكتروني", details: "تفاصيل المشروع",
    namePh: "يرجى إدخال اسم المستخدم", emailPh: "يرجى إدخال البريد الإلكتروني", detailsPh: "أخبرنا عن مشروعك",
    send: "أرسل رسالتك الآن", sending: "جارٍ الإرسال...", okTitle: "وصلتنا رسالتك", okBody: "سنراجع تفاصيل مشروعك ونرد عليك قريباً.", again: "إرسال رسالة أخرى",
    errName: "اكتب اسمك (حرفان على الأقل).", errEmail: "اكتب بريداً إلكترونياً صحيحاً.", errDetails: "اكتب تفاصيل المشروع (10 أحرف على الأقل).", errServer: "تعذر الإرسال. حاول مرة أخرى بعد قليل.",
  },
};
export type Dict = typeof ar;
const en: Dict = {
  brand1: "I Smart", brand2: "Digit",
  nav: { home: "Home", about: "About", services: "Services", works: "Our work" },
  contactUs: "Contact us", more: "Learn more", viewProject: "View project", visit: "Visit project", close: "Close",
  quick: "Quick links", privacy: "Privacy policy", terms: "Terms of use",
  rights: "All rights reserved to iSmartDigit © 2026", themeToggle: "Toggle theme", langToggle: "عربي",
  form: {
    name: "Full name", email: "Email", details: "Project details",
    namePh: "Enter your name", emailPh: "Enter your email", detailsPh: "Tell us about your project",
    send: "Send your message", sending: "Sending...", okTitle: "Message received", okBody: "We'll review your project details and get back to you soon.", again: "Send another message",
    errName: "Enter your name (2+ characters).", errEmail: "Enter a valid email address.", errDetails: "Describe your project (10+ characters).", errServer: "Couldn't send. Please try again shortly.",
  },
};
export const ui = { ar, en };
