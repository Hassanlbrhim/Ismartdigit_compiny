import type { Content } from "./types";

// Seed content. Copy marked "Figma" is taken verbatim from the design; the rest is placeholder (editable in /admin).
export const defaultContent: Content = {
  site: {
    hero: {
      eyebrow: { ar: "شريكك التقني نحو التحول الرقمي", en: "Your tech partner for digital transformation" }, // Figma
      title: { ar: "نبتكر حلولاً [[رقمية ذكية]] تدفع أعمالك للمستقبل", en: "We build [[smart digital]] solutions that drive your business forward" }, // Figma
      lead: { ar: "نقدم خدمات تطوير البرمجيات وتصميم تجربة المستخدم بأعلى معايير الجودة، لنمنح مشروعك الرقمي الحضور الاستثنائي الذي يستحق.", en: "Software development and UX design delivered to the highest standard, giving your digital project the presence it deserves." },
      cta1: { ar: "ابدأ مشروعك الآن", en: "Start your project" },
      cta2: { ar: "استعراض الخدمات", en: "Explore services" },
      image: "",
    },
    stats: [
      { id: "s1", value: 4.9, decimals: 1, prefix: "", suffix: "", label: { ar: "تقييم التطبيقات", en: "App rating" } },
      { id: "s2", value: 98, decimals: 0, prefix: "", suffix: "%", label: { ar: "رضا العملاء", en: "Client satisfaction" } },
      { id: "s3", value: 150, decimals: 0, prefix: "+", suffix: "", label: { ar: "تطبيق منجز", en: "Apps delivered" } },
    ],
    about: {
      badge: { ar: "من نحن", en: "About us" },
      title: { ar: "شريكك الاستراتيجي للتحول الرقمي", en: "Your strategic partner in digital transformation" },
      intro: { ar: "في ", en: "At " },
      brand1: { ar: "آي سمارت", en: "I Smart" },
      brand2: { ar: "ديجيت", en: "Digit" },
      body: {
        ar: "، لا نكتفي بكتابة الأكواد، بل نبني حلولاً تقنية متكاملة تدفع عجلة نمو أعمالك. كشريكك الاستراتيجي للتحول الرقمي، نجمع بين الإبداع في تصميم الواجهات (UI/UX)، القوة في تطوير أنظمة الويب وتطبيقات الجوال، والذكاء في دمج تقنيات الذكاء الاصطناعي وأتمتة العمليات. نحن هنا لنحول تحدياتك إلى منتجات رقمية استثنائية وأنظمة سحابية تضمن لك ريادة السوق.",
        en: ", we do more than write code: we build complete technology solutions that drive your growth. As your strategic partner in digital transformation, we combine creative UI/UX design, robust web and mobile engineering, and smart AI and automation. We turn your challenges into exceptional digital products and cloud systems that secure your market lead.",
      },
    },
    services: {
      badge: { ar: "خدماتنا", en: "Services" }, title: { ar: "خدماتنا", en: "Our services" },
      sub: { ar: "حلول رقمية متكاملة مصممة لتحقيق أثر حقيقي وقابل للقياس", en: "End-to-end digital solutions built for real, measurable impact" },
    },
    works: {
      badge: { ar: "أعمالنا", en: "Our work" }, title: { ar: "أعمالنا", en: "Our work" },
      sub: { ar: "مجموعة من قصص النجاح الرقمية التي صنعناها بشغف ودقة لشركاء نجاحنا", en: "Digital success stories we built with passion and precision for our partners" },
    },
    contact: { badge: { ar: "تواصل معنا", en: "Contact us" }, title: { ar: "هل لديك فكرة مشروع؟", en: "Have a project idea?" }, email: "contact@ismartdigit.com", phone: "" },
    footer: {
      tagline: { ar: "نحوّل الأفكار الجريئة إلى منتجات رقمية قوية.", en: "We turn bold ideas into powerful digital products." },
      socials: [
        { id: "f1", icon: "Facebook", url: "#" }, { id: "f2", icon: "Instagram", url: "#" },
        { id: "f3", icon: "Linkedin", url: "#" }, { id: "f4", icon: "Twitter", url: "#" },
      ],
    },
  },
  // Order = display order on the page (first card sits at the right in RTL). Copy + accent colours: Figma.
  services: [
    { id: "mobile", icon: "Smartphone", color: "#6366f1", active: true, tag: { ar: "جوال", en: "Mobile" }, title: { ar: "تطوير تطبيقات الجوال", en: "Mobile app development" }, body: { ar: "تصميم وتطوير تطبيقات iOS و Android احترافية (باستخدام تقنيات مثل Flutter) بأداء عالٍ وواجهات سلسة تلبي احتياجات أعمالك.", en: "Professional iOS and Android apps (using technologies like Flutter) with high performance and smooth interfaces built around your business." } },
    { id: "web", icon: "Globe", color: "#14b8a6", active: true, tag: { ar: "ويب", en: "Web" }, title: { ar: "تطوير الويب", en: "Web development" }, body: { ar: "بناء مواقع ويب سريعة واستجابية (Responsive) تتناسب مع جميع الشاشات، مبنية بأحدث التقنيات لتقديم تجربة مستخدم متميزة.", en: "Fast, responsive websites that fit every screen, built with modern technology for an outstanding user experience." } },
    { id: "uiux", icon: "PenTool", color: "#ec4899", active: true, tag: { ar: "تصميم", en: "Design" }, title: { ar: "تصميم واجهات وتجربة المستخدم", en: "UI/UX design" }, body: { ar: "تصاميم UI/UX مدروسة تجمع بين الجماليات والوظيفة لتمنح المستخدم تجربة فريدة، ورحلة تفاعلية سلسة تحقق أهداف أعمالك.", en: "Considered UI/UX design that blends aesthetics with function, giving users a unique, smooth journey that serves your business goals." } },
    { id: "saas", icon: "Layers", color: "#f59e0b", active: true, tag: { ar: "مؤسسي", en: "Enterprise" }, title: { ar: "الأنظمة المخصصة وحلول الأعمال", en: "Custom systems & business solutions" }, body: { ar: "تطوير أنظمة ويب معقدة (SaaS/ERP) وحلول سحابية مخصصة لاحتياجات مؤسستك لتحليل البيانات وتسهيل اتخاذ القرار.", en: "Complex web systems (SaaS/ERP) and custom cloud solutions for your organisation, built to analyse data and speed up decisions." } },
    { id: "dx", icon: "TrendingUp", color: "#5b48ec", active: true, tag: { ar: "استراتيجية", en: "Strategy" }, title: { ar: "التحول الرقمي", en: "Digital transformation" }, body: { ar: "مساعدة الشركات في بناء \"أنظمة ذكية\" (Smart Systems) متكاملة كبديل للطرق التقليدية لضمان زيادة الكفاءة وتحقيق نمو مستدام.", en: "Helping companies build integrated Smart Systems that replace traditional methods, for higher efficiency and sustainable growth." } },
    { id: "auto", icon: "Cog", color: "#4dae4d", active: true, tag: { ar: "أتمتة", en: "Automation" }, title: { ar: "أتمتة العمليات", en: "Process automation" }, body: { ar: "أتمتة المهام المتكررة وسير العمل (Workflows) داخل مؤسستك لتحسين الكفاءة التشغيلية وزيادة الإنتاجية وتوفير الوقت والجهد.", en: "Automating repetitive tasks and workflows across your organisation to improve efficiency, boost productivity and save time." } },
    { id: "ai", icon: "Cpu", color: "#504a82", active: true, tag: { ar: "ذكاء اصطناعي", en: "AI" }, title: { ar: "حلول الذكاء الاصطناعي", en: "AI solutions" }, body: { ar: "دمج تقنيات الذكاء الاصطناعي (AI) والرؤية الحاسوبية (Computer Vision) في أنظمة الشركات لتمكينها من العمل بذكاء فائق.", en: "Integrating AI and Computer Vision into company systems so they can operate with far greater intelligence." } },
  ],
  // Images: export the 4 project images from Figma into /public/projects (or upload them from the admin).
  projects: [
    { id: "ridan", published: true, image: "/projects/ridan.png", link: "", tags: ["React", "Node.js", "AWS"], title: { ar: "موقع ريدان - للمقاولات العامة", en: "Ridan - General Contracting" }, desc: { ar: "منصة رقمية لنموذج رائد في قطاع المقاولات، تقدم خدمات بناء وتشييد متكاملة وتشمل التصميم، التنفيذ، والإشراف الهندسي.", en: "A digital platform for a leading contractor offering full construction services: design, execution and engineering supervision." } },
    { id: "fitness", published: true, image: "/projects/fitness.png", link: "", tags: ["Flutter", "Dart"], title: { ar: "أرض اللياقة - شريكك المثالي للتمرين", en: "Fitness Land - your ideal training partner" }, desc: { ar: "تطبيق رياضي متكامل لتتبع التمارين وتحقيق الأهداف الصحية بواجهة مستخدم مبسطة.", en: "A complete fitness app to track workouts and reach health goals through a simple interface." } },
    { id: "shopzen", published: true, image: "/projects/shopzen.png", link: "", tags: ["Flutter", "Firebase", "Stripe"], title: { ar: "شوب زن - منصة متكاملة للتجارة الإلكترونية", en: "Shop Zen - complete e-commerce platform" }, desc: { ar: "تطبيق تسوق بتصميم جذاب وعملي، يوفر تجربة إتمام شراء سلسة ويدعم خيارات دفع متعددة.", en: "An attractive, practical shopping app with a smooth checkout and multiple payment options." } },
    { id: "trustsafe", published: true, image: "/projects/trustsafe.png", link: "", tags: ["Security", "Cloud", "Enterprise"], title: { ar: "تراست سيف - إدارة آمنة للمستندات", en: "Trust Safe - secure document management" }, desc: { ar: "منصة آمنة لحفظ المستندات وإدارتها ومشاركتها داخل المؤسسات بصلاحيات دقيقة وتشفير كامل.", en: "A secure platform to store, manage and share documents inside organisations with granular permissions and full encryption." } },
  ],
};
