// Text for the Public profile page (Arabic + English).
// This is what OTHER people see: photo, badges, bio, lifestyle, ratings and (for landowners) listings.
// Documents, phone numbers and private addresses are never shown here.
export const publicProfileText = {
  ar: {
    publicProfile: {
      crumbs: { account: "حسابي", roommates: "زملاء السكن", current: "الملف العام" },
      preview: {
        text: "هكذا يظهر ملفك للآخرين. لا تظهر مستنداتك أو هاتفك أو عنوانك أبدًا.",
        back: "العودة إلى لوحة التحكم",
      },
      badges: { identity: "الهوية موثّقة", student: "القيد الجامعي موثّق", owner: "مالك موثّق" },
      rating: "{avg} · {count} تقييمات",
      actions: { connect: "تواصل", sent: "تم إرسال الطلب", edit: "تعديل الملف", back: "العودة إلى زملاء السكن" },
      about: { title: "نبذة", lifestyle: "نمط الحياة" },
      facts: {
        title: "معلومات سريعة",
        university: "الجامعة",
        year: "السنة الدراسية",
        field: "التخصص",
        city: "المدينة",
        budget: "الميزانية",
        looking: "يبحث عن",
        since: "عضو منذ",
        group: { women: "سكن للبنات فقط", men: "سكن للشباب فقط" },
      },
      trust: {
        title: "ما الذي تم التحقق منه",
        identity: "تم فحص وثيقة الهوية",
        student: "تم فحص القيد الجامعي",
        owner: "تم فحص هوية المالك",
        privacy: "لا نعرض هنا المستندات أو رقم الهاتف أو العنوان. يبقى التواصل داخل مغترب حتى توافق.",
      },
      reviews: { title: "التقييمات", none: "لا توجد تقييمات بعد." },
      listings: { title: "إعلاناتي", sub: "السكن المتاح حاليًا لدى هذا المالك." },
      sampleReviews: [
        { name: "أحمد مصطفى", date: "سبتمبر ٢٠٢٦", rating: 5, tag: "زميل سكن سابق", quote: "شريك سكن مرتب ومحترم للمواعيد والخصوصية. أنصح بالسكن معه." },
        { name: "منى سعيد", date: "أغسطس ٢٠٢٦", rating: 5, tag: "زميلة سكن سابقة", quote: "كان التواصل واضحًا وسهلًا، والتزم بقواعد البيت من أول يوم." },
        { name: "هدى كمال", date: "يونيو ٢٠٢٦", rating: 4, tag: "مالكة عقار", quote: "مستأجر ملتزم بالدفع وبالحفاظ على المكان نظيفًا." },
      ],
    },
  },
  en: {
    publicProfile: {
      crumbs: { account: "My account", roommates: "Roommates", current: "Public profile" },
      preview: {
        text: "This is how others see your profile. Your documents, phone and address are never shown.",
        back: "Back to dashboard",
      },
      badges: { identity: "Identity verified", student: "Enrollment verified", owner: "Verified landlord" },
      rating: "{avg} · {count} ratings",
      actions: { connect: "Connect", sent: "Request sent", edit: "Edit profile", back: "Back to roommates" },
      about: { title: "About", lifestyle: "Lifestyle" },
      facts: {
        title: "Quick facts",
        university: "University",
        year: "Year",
        field: "Field of study",
        city: "City",
        budget: "Budget",
        looking: "Looking for",
        since: "Member since",
        group: { women: "Women-only housing", men: "Men-only housing" },
      },
      trust: {
        title: "What was verified",
        identity: "Identity document checked",
        student: "University enrollment checked",
        owner: "Landlord identity checked",
        privacy: "We never show documents, phone numbers or addresses here. Contact stays inside Mo5tareb until you agree.",
      },
      reviews: { title: "Ratings & reviews", none: "No reviews yet." },
      listings: { title: "My listings", sub: "Housing this landlord currently offers." },
      sampleReviews: [
        { name: "Ahmed Mostafa", date: "Sep 2026", rating: 5, tag: "Former housemate", quote: "A tidy roommate who respects schedules and privacy. I’d happily live with them again." },
        { name: "Mona Said", date: "Aug 2026", rating: 5, tag: "Former housemate", quote: "Communication was clear and easy, and they followed the house rules from day one." },
        { name: "Hoda Kamal", date: "Jun 2026", rating: 4, tag: "Landlord", quote: "A tenant who pays on time and keeps the place clean." },
      ],
    },
  },
};
