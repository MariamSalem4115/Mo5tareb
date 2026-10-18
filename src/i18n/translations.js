// Every word on the site lives here, in Arabic (ar) and English (en).
// To change a text, edit it here. Components never contain hard-coded words.

import { auth } from "./auth";
import { adminText } from "./admin";
import { dashboardText } from "./dashboard";
import { dialogsText } from "./dialogs";
import { staysText } from "./staysPage";
import { addListingText } from "./addListing";
import { roommatesText } from "./roommatesPage";
import { publicProfileText } from "./publicProfilePage";
import { supportText } from "./supportPage";
import { listingsText } from "./listingsPage";
import { notificationsText } from "./notifications";

const base = {
  ar: {
    brand: { name: "مغترب", tagline: "مكان يشبهك" },
    langLabel: "English",
    views: { landing: "الرئيسية", login: "تسجيل الدخول", register: "إنشاء حساب", forgot: "استعادة كلمة المرور", admin: "لوحة المشرف", dashboard: "لوحة المستخدم", reviews: "تقييماتي وإقامتي", addListing: "إضافة إعلان", roommates: "زملاء السكن", publicProfile: "الملف العام", support: "الدعم", search: "البحث والخريطة", listing: "تفاصيل السكن" },
    nav: { home: "الرئيسية", housing: "ابحث عن سكن", roommates: "زملاء السكن", how: "كيف يعمل مغترب", login: "تسجيل الدخول", register: "إنشاء حساب", menu: "القائمة" },
    hero: {
      badge: "مدينة جديدة. بداية آمنة.",
      title: "اعثر على سكن طلابي آمن بالقرب من جامعتك",
      sub: "رحلتك الجامعية تستحق مكانًا تشعر فيه أنك في بيتك. اعثر على سكن موثق وشركاء سكن يشبهونك في أنحاء مصر.",
      explore: "استكشف السكن",
      roommate: "ابحث عن شريك سكن",
      avatars: ["م", "أ", "ن"],
      proof: "أكثر من 2,400 طالب وجدوا سكنهم",
      proofSub: "مبني على الثقة. صُنع من أجلك.",
      imgBadge: "منازل حقيقية. أشخاص موثّقون.",
      cardTitle: "أقرب إلى الجامعة. أقرب إلى بيتك.",
      cardSub: "القاهرة · الجيزة · الإسكندرية · المنصورة",
    },
    search: {
      title: "من أين ستبدأ مرحلتك القادمة؟",
      hint: "اعثر على ما يناسبك، لا مجرد غرفة.",
      location: "الموقع / الجامعة",
      locations: ["جامعة القاهرة، الجيزة", "جامعة عين شمس، العباسية", "جامعة الإسكندرية، الشاطبي", "جامعة الأزهر، مدينة نصر"],
      budget: "الميزانية الشهرية",
      gender: "تفضيل السكن",
      genders: ["للبنات فقط", "للشباب فقط", "بدون تفضيل"],
      room: "نوع الغرفة",
      rooms: ["غرفة خاصة", "غرفة مشتركة", "شقة كاملة"],
      button: "ابحث عن سكن",
      trust: ["مُلّاك موثّقو الهوية", "تقييمات حقيقية من الطلاب", "بيانات تواصلك تبقى خاصة"],
    },
    featured: {
      eyebrow: "مختارة لمرحلتك القادمة",
      title: "أماكن رائعة. بدايات أجمل.",
      sub: "سكن طلابي مريح، مع ملّاك يمكنك الوثوق بهم.",
      all: "عرض كل السكن",
      verified: "مالك موثق",
      perMonth: "/شهر",
    },
    campus: {
      eyebrow: "من أجل جامعتك",
      title: "جامعتك. حيّك.",
      sub: "ابدأ بالأماكن التي يعتبرها الطلاب بيتهم.",
      homes: "سكن",
      items: [
        { name: "جامعة القاهرة", area: "الدقي والجيزة", count: 128 },
        { name: "جامعة عين شمس", area: "العباسية ومصر الجديدة", count: 96 },
        { name: "جامعة الإسكندرية", area: "الشاطبي وسموحة", count: 74 },
      ],
    },
    steps: {
      eyebrow: "ضغط أقل. حياة طلابية أكثر.",
      title: "من البحث إلى الاستقرار.",
      sub: "ثلاث خطوات بسيطة لانتقال أكثر ثقة.",
      items: [
        { title: "اعثر على ما يناسبك", text: "ابحث حسب الجامعة والميزانية ونمط حياتك. قارن بين سكن حقيقي بأسعار واضحة." },
        { title: "وثّق حسابك ثم تواصل", text: "وثّق هويتك لتفتح بيانات تواصل المالك وتتواصل معه بأمان." },
        { title: "عاين. قرّر. انتقل.", text: "رتّب معاينة، واسأل ما تريد، واتفق على التفاصيل مباشرة مع المالك." },
      ],
    },
    roommate: {
      eyebrow: "الغرفة أجمل مع الأشخاص المناسبين",
      title: "اعثر على من يشبهك.",
      text: "مستيقظ مبكرًا أم سهران؟ مذاكرة هادئة أم عشاء جماعي؟ تعرّف على طلاب تناسبك عاداتهم اليومية.",
      button: "تعرّف على شريك سكنك",
      note: "ملفات موثّقة · تفضيلات نمط الحياة · تقييمات متبادلة",
      name: "مريم عادل، 21",
      meta: "جامعة القاهرة · صيدلة · السنة الثالثة",
      verified: "طالبة موثّقة",
      quote: "أبحث عن بيت هادئ وشريكة سكن ودودة ومكان مناسب للمذاكرة. القهوة المشتركة ميزة إضافية.",
      tags: ["غير مدخّنة", "تستيقظ مبكرًا", "مذاكرة هادئة", "للبنات فقط"],
      profile: "عرض ملف مريم",
    },
    story: {
      badge: "قصص من مجتمعنا",
      quote: "الانتقال إلى القاهرة كان مرهقًا. العثور على مالك موثق قرب جامعتي جعل التجربة كلها أقرب إلى البيت.",
      name: "نور أحمد",
      meta: "طالب هندسة · جامعة القاهرة",
      note: "بداية أسعد في مدينة جديدة",
    },
    owners: {
      eyebrow: "لأصحاب العقارات",
      title: "مستأجرك القادم هنا.",
      text: "صِل إلى الطلاب الباحثين عن سكن قرب عقارك. وثّق حسابك، وانشر إعلانك، وأدِر كل شيء في مكان واحد.",
      points: ["إعلانات أساسية مجانية، مع خيار الترويج", "ملفات طلاب موثّقة وتقييمات متبادلة", "تحكّم كامل في مواعيد الإتاحة وبيانات التواصل"],
      button: "أضف عقارك",
    },
    faq: {
      eyebrow: "القليل من الوضوح يوفّر الكثير",
      title: "أسئلة قبل الانتقال؟",
      sub: "نحن هنا لنجعل بحثك أسهل.",
      button: "زيارة مركز المساعدة",
      items: [
        { q: "ماذا يعني «مالك موثق»؟", a: "نتحقق من وثيقة هوية المالك. هذه علامة ثقة وليست ضمانًا للعقار، لذا عاين السكن دائمًا وراجع الاتفاق قبل الدفع." },
        { q: "لماذا أحتاج إلى توثيق حسابي كطالب؟", a: "التوثيق يحمي الجميع. يتأكد المالك أنك طالب حقيقي، وتظهر لك بيانات التواصل بعد التوثيق فقط." },
        { q: "هل الفواتير مشمولة في الإيجار الشهري؟", a: "يختلف ذلك من إعلان لآخر. يوضح كل إعلان ما إذا كانت الكهرباء والمياه والإنترنت مشمولة أو تُدفع بشكل منفصل." },
        { q: "هل يمكنني العثور على شريك سكن قبل اختيار السكن؟", a: "نعم. تصفّح ملفات الطلاب الموثّقين وتواصل مع من تناسبك عاداتهم، ثم ابحثا عن سكن معًا." },
      ],
    },
    cta: { title: "مرحلتك القادمة تبدأ ببيت آمن.", sub: "أنشئ ملفك. اعثر على أشخاصك. اشعر أنك في بيتك.", register: "سجّل مجانًا", login: "تسجيل الدخول" },
    footer: {
      tagline: "سكن أكثر أمانًا. شركاء سكن أفضل. مرحلة جديدة قريبة من جامعتك.",
      explore: "استكشف",
      exploreLinks: ["ابحث عن سكن", "ابحث عن شريك سكن", "أضف عقارك"],
      support: "الدعم",
      supportLinks: ["مركز الأمان", "المساعدة والأسئلة الشائعة", "تواصل معنا"],
      copy: "© 2026 مغترب · صُنع للطلاب في مصر",
      privacy: "سياسة الخصوصية",
      terms: "الشروط",
    },
    misc: { soon: "هذه الصفحة قادمة قريبًا", soonText: "سنبنيها في الخطوة التالية.", back: "العودة للرئيسية", navigator: "تنقّل بين الصفحات", fav: "أضف إلى المفضلة", close: "إغلاق" },
  },

  en: {
    brand: { name: "Mo5tareb", tagline: "A place to belong" },
    langLabel: "العربية",
    views: { landing: "Home", login: "Login", register: "Register", forgot: "Forgot password", admin: "Admin panel", dashboard: "User dashboard", reviews: "My reviews & stays", addListing: "Add listing", roommates: "Roommates", publicProfile: "Public profile", support: "Support", search: "Search & map", listing: "Listing details" },
    nav: { home: "Home", housing: "Find housing", roommates: "Roommates", how: "How it works", login: "Login", register: "Register", menu: "Menu" },
    hero: {
      badge: "A new city. A safe place to start.",
      title: "Find Safe Student Housing Near Your Campus",
      sub: "Your university journey deserves a place that feels like home. Find verified housing and like-minded roommates across Egypt.",
      explore: "Explore housing",
      roommate: "Find a roommate",
      avatars: ["M", "A", "N"],
      proof: "2,400+ students found their place",
      proofSub: "Built on trust. Made for you.",
      imgBadge: "Real homes. Verified people.",
      cardTitle: "Closer to class. Closer to home.",
      cardSub: "Cairo · Giza · Alexandria · Mansoura",
    },
    search: {
      title: "Where will your next chapter begin?",
      hint: "Find your fit, not just a room.",
      location: "Location / University",
      locations: ["Cairo University, Giza", "Ain Shams University, Abbasia", "Alexandria University, Shatby", "Al-Azhar University, Nasr City"],
      budget: "Monthly budget",
      gender: "Gender preference",
      genders: ["Women only", "Men only", "No preference"],
      room: "Room type",
      rooms: ["Private room", "Shared room", "Entire apartment"],
      button: "Search homes",
      trust: ["Identity-verified landlords", "Real reviews from students", "Your contact details stay private"],
    },
    featured: {
      eyebrow: "Picked for your next chapter",
      title: "Good places. Great beginnings.",
      sub: "Comfortable student homes, with landlords you can trust.",
      all: "View all housing",
      verified: "Verified landlord",
      perMonth: "/mo",
    },
    campus: {
      eyebrow: "Made for your university",
      title: "Your campus. Your neighborhood.",
      sub: "Start with the places students already call home.",
      homes: "homes",
      items: [
        { name: "Cairo University", area: "Dokki & Giza", count: 128 },
        { name: "Ain Shams University", area: "Abbasia & Heliopolis", count: 96 },
        { name: "Alexandria University", area: "Shatby & Smouha", count: 74 },
      ],
    },
    steps: {
      eyebrow: "Less stress. More student life.",
      title: "From searching to settling in.",
      sub: "Three simple steps to a more confident move.",
      items: [
        { title: "Find your fit", text: "Search by campus, budget and lifestyle. Compare real homes with clear prices." },
        { title: "Verify, then connect", text: "Verify your identity to unlock landlord contact details and connect securely." },
        { title: "Visit. Decide. Move in.", text: "Arrange a viewing, ask questions and agree the details directly with your landlord." },
      ],
    },
    roommate: {
      eyebrow: "A room is better with the right people",
      title: "Find someone on your wavelength.",
      text: "Early bird or night owl? Quiet study or shared dinners? Meet students whose everyday habits fit yours.",
      button: "Meet your next roommate",
      note: "Verified profiles · Lifestyle preferences · Mutual ratings",
      name: "Mariam Adel, 21",
      meta: "Cairo University · Pharmacy · Year 3",
      verified: "Verified student",
      quote: "Looking for a calm home, a friendly roommate and a good place to study. Shared coffee is a bonus.",
      tags: ["Non-smoker", "Early bird", "Quiet study", "Women only"],
      profile: "View Mariam’s profile",
    },
    story: {
      badge: "Stories from our community",
      quote: "Moving to Cairo felt overwhelming. Finding a verified landlord near my campus made the whole experience feel a little more like home.",
      name: "Nour Ahmed",
      meta: "Engineering student · Cairo University",
      note: "A happier start in a new city",
    },
    owners: {
      eyebrow: "For property owners",
      title: "Your next great tenant is here.",
      text: "Reach students looking for a home near your property. Get verified, publish your listing and manage everything in one place.",
      points: ["Free basic listings, with optional promotional boosts", "Verified student profiles and two-way ratings", "Stay in control of your availability and contact details"],
      button: "List your property",
    },
    faq: {
      eyebrow: "A little clarity goes a long way",
      title: "Questions before you move?",
      sub: "We’re here to make your search a little easier.",
      button: "Visit the help centre",
      items: [
        { q: "What does “verified landlord” mean?", a: "We check the landlord’s identity document. It’s a trust signal, not a property guarantee—always visit and review your agreement before paying." },
        { q: "Why do I need to verify my student profile?", a: "Verification protects everyone. Landlords know you’re a real student, and you only see contact details once you’re verified." },
        { q: "Are bills included in the monthly rent?", a: "It depends on the listing. Each one states whether electricity, water and internet are included or paid separately." },
        { q: "Can I find a roommate before choosing a home?", a: "Yes. Browse verified student profiles, connect with people whose habits fit yours, then look for a home together." },
      ],
    },
    cta: { title: "Your next chapter starts with a safe home.", sub: "Create your profile. Find your people. Feel at home.", register: "Register for free", login: "Login" },
    footer: {
      tagline: "Safer housing. Better roommates. A new chapter, closer to campus.",
      explore: "Explore",
      exploreLinks: ["Find housing", "Find a roommate", "List your property"],
      support: "Support",
      supportLinks: ["Safety centre", "Help & FAQs", "Contact us"],
      copy: "© 2026 Mo5tareb · Made for students in Egypt",
      privacy: "Privacy policy",
      terms: "Terms",
    },
    misc: { soon: "This page is coming soon", soonText: "We’ll build it in the next step.", back: "Back to home", navigator: "Jump between pages", fav: "Add to favorites", close: "Close" },
  },
};

export const translations = {
  ar: { ...base.ar, ...auth.ar, ...adminText.ar, ...dashboardText.ar, ...dialogsText.ar, ...staysText.ar, ...addListingText.ar, ...roommatesText.ar, ...publicProfileText.ar, ...supportText.ar, ...listingsText.ar, ...notificationsText.ar },
  en: { ...base.en, ...auth.en, ...adminText.en, ...dashboardText.en, ...dialogsText.en, ...staysText.en, ...addListingText.en, ...roommatesText.en, ...publicProfileText.en, ...supportText.en, ...listingsText.en, ...notificationsText.en },
};
