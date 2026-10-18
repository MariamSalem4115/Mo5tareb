// Words for the notifications window (the bell in the top bar). Arabic and English must have the same keys.
// The text of each notification is under items[<id>]; the ids are in data/notifications.js.

export const notificationsText = {
  ar: {
    notifications: {
      title: "الإشعارات",
      unread: "{n} جديد",
      markAll: "تحديد الكل كمقروء",
      clear: "مسح الإشعارات",
      new: "جديد",
      empty: { title: "لا توجد إشعارات", text: "أنت على اطلاع بكل شيء. سنخبرك هنا عندما يحدث جديد." },
      items: {
        "s-docs": { title: "تمت الموافقة على بطاقتك الشخصية", text: "كارنيه الجامعة ما زال قيد المراجعة. سنخبرك خلال ٢٤ ساعة." },
        "s-request": { title: "مريم عادل أرسلت لك طلب تعارف", text: "تبحث عن شريكة سكن قرب جامعة القاهرة. اطّلع على ملفها." },
        "s-homes": { title: "سكن جديد قرب جامعتك", text: "وصل سكن جديد يناسب ميزانيتك قرب جامعة القاهرة." },
        "s-review": { title: "كيف كانت إقامتك؟", text: "شارك تقييمك ليساعد الطلاب الذين يبحثون عن سكن." },
        "l-approved": { title: "تمت الموافقة على إعلانك", text: "إعلانك «غرفة خاصة مشمسة في الدقي» أصبح ظاهرًا للطلاب." },
        "l-review": { title: "تقييم جديد من نور أحمد", text: "تركت تقييمًا بخمس نجوم بعد إقامتها." },
        "l-expiry": { title: "إعلان ينتهي قريبًا", text: "إعلان «استوديو قرب جامعة القاهرة» ينتهي بعد أيام. أعد تفعيله ليبقى ظاهرًا." },
        "a-queue": { title: "مستندات جديدة بانتظار المراجعة", text: "هناك طلبات توثيق جديدة في قائمة المراجعة." },
        "a-report": { title: "تم الإبلاغ عن إعلان", text: "وصل بلاغ جديد يحتاج إلى مراجعة." },
      },
    },
  },
  en: {
    notifications: {
      title: "Notifications",
      unread: "{n} new",
      markAll: "Mark all as read",
      clear: "Clear notifications",
      new: "New",
      empty: { title: "No notifications", text: "You’re all caught up. We’ll tell you here when something new happens." },
      items: {
        "s-docs": { title: "Your National ID was approved", text: "Your University Student ID is still being reviewed. We’ll let you know within 24 hours." },
        "s-request": { title: "Mariam Adel sent you a roommate request", text: "She’s looking for a roommate near Cairo University. Take a look at her profile." },
        "s-homes": { title: "New homes near your campus", text: "A new home that fits your budget was added near Cairo University." },
        "s-review": { title: "How was your stay?", text: "Share a review to help other students looking for a home." },
        "l-approved": { title: "Your listing was approved", text: "“Sunny private room in Dokki” is now visible to students." },
        "l-review": { title: "New review from Nour Ahmed", text: "She left a five-star review after her stay." },
        "l-expiry": { title: "A listing expires soon", text: "“Studio near Cairo University” expires in a few days. Re-activate it to keep it visible." },
        "a-queue": { title: "New documents waiting for review", text: "There are new verification requests in the review queue." },
        "a-report": { title: "A listing was reported", text: "A new report needs your review." },
      },
    },
  },
};
