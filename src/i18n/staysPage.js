// Text for the "My reviews & stays" page (Arabic + English). Sample people and places are fictional.
// Stays are matched by id with data/stays.js. Words in {curly braces} are filled in by the code.
export const staysText = {
  ar: {
    staysPage: {
      crumbs: { account: "حسابي", current: "تقييماتي" },
      title: "تقييماتي وإقامتي",
      sub: "شارك تجربتك بعد الإقامة، واطلع على التقييمات التي تلقيتها.",
      tabs: { stays: "إقاماتي السابقة", received: "التقييمات المستلمة" },
      completed: "إقامة مكتملة",
      who: { student: "المالك", landowner: "المستأجر" },
      dates: "المدة",
      rent: "الإيجار",
      perMonth: "/ شهر",
      write: "كتابة تقييم",
      sent: "تم إرسال التقييم",
      sentNote: "سيظهر بعد المراجعة.",
      report: "الإبلاغ عن الإعلان",
      empty: "لا توجد إقامات مكتملة بعد.",
      summary: "{avg} متوسط · {count} تقييمًا",
      info: {
        title: "التقييمات متبادلة",
        text1: "المستأجر يقيّم المالك، والمالك يقيّم المستأجر بعد انتهاء الإقامة.",
        text2: "تجارب حقيقية تساعد مجتمع مغترب على اتخاذ قرارات أفضل.",
      },
      items: {
        student: {
          dokki: { place: "غرفة خاصة مشمسة في الدقي", area: "الدقي · الجيزة", name: "سلمى حسن", dates: "يوليو – سبتمبر ٢٠٢٦" },
          giza: { place: "غرفة مزدوجة قرب مترو الجيزة", area: "ميدان الجيزة", name: "نادية فاروق", dates: "يناير – يونيو ٢٠٢٦" },
        },
        landowner: {
          dokki: { place: "غرفة خاصة مشمسة في الدقي", area: "الدقي · الجيزة", name: "مريم عادل", dates: "يوليو – سبتمبر ٢٠٢٦" },
          heliopolis: { place: "غرفة مفروشة في مصر الجديدة", area: "مصر الجديدة", name: "عمر خالد", dates: "فبراير – يونيو ٢٠٢٦" },
        },
      },
    },
  },
  en: {
    staysPage: {
      crumbs: { account: "My account", current: "My reviews" },
      title: "My reviews & stays",
      sub: "Share your experience after a stay, and see the reviews you received.",
      tabs: { stays: "My past stays", received: "Received reviews" },
      completed: "Completed stay",
      who: { student: "Landowner", landowner: "Tenant" },
      dates: "Dates",
      rent: "Rent",
      perMonth: "/ month",
      write: "Write a review",
      sent: "Review sent",
      sentNote: "It will appear after moderation.",
      report: "Report listing",
      empty: "No completed stays yet.",
      summary: "{avg} average · {count} ratings",
      info: {
        title: "Reviews go both ways",
        text1: "Tenants rate landlords, and landlords rate tenants, once a stay has ended.",
        text2: "Real experiences help the Mo5tareb community make better decisions.",
      },
      items: {
        student: {
          dokki: { place: "Sunny private room in Dokki", area: "Dokki · Giza", name: "Salma Hassan", dates: "Jul – Sep 2026" },
          giza: { place: "Twin room near Giza Metro", area: "Giza Square", name: "Nadia Farouk", dates: "Jan – Jun 2026" },
        },
        landowner: {
          dokki: { place: "Sunny private room in Dokki", area: "Dokki · Giza", name: "Mariam Adel", dates: "Jul – Sep 2026" },
          heliopolis: { place: "Furnished room in Heliopolis", area: "Heliopolis", name: "Omar Khaled", dates: "Feb – Jun 2026" },
        },
      },
    },
  },
};
