// Text for the pop-up windows: "Write a review" and "Report listing" (Arabic + English).
// The people and listings in "sample" are fictional placeholders. Pages pass real info when they open a window.
// Words in {curly braces} are filled in by the code.
export const dialogsText = {
  ar: {
    dialogs: {
      dev: { label: "معاينة النوافذ", review: "نافذة كتابة تقييم", report: "نافذة الإبلاغ" },
      review: {
        title: "كتابة التقييم",
        kinds: {
          landowner: {
            sub: "كيف كانت إقامتك؟ رأيك يساعد الطلاب على اختيار سكنهم.",
            caption: "تقييم المالكة بعد إقامة مكتملة",
            hint: "{max} حرف كحد أقصى، تحدث عن السكن والتواصل ووضوح التكاليف.",
          },
          tenant: {
            sub: "كيف كانت تجربتك مع المستأجر؟ رأيك يساعد الملّاك الآخرين.",
            caption: "تقييم المستأجر بعد إقامة مكتملة",
            hint: "{max} حرف كحد أقصى، تحدث عن الالتزام بالمواعيد والتواصل والعناية بالسكن.",
          },
        },
        sample: { name: "سلمى حسن", listing: "غرفة خاصة مشمسة في الدقي", meta: "جامعة القاهرة · يوليو إلى سبتمبر ٢٠٢٦" },
        ratingLabel: "تقييمك العام",
        choose: "اختر عدد النجوم",
        outOf: "{n} من ٥ · {label}",
        labels: ["تجربة سيئة", "أقل من المتوقع", "تجربة مقبولة", "تجربة جيدة", "تجربة ممتازة"],
        experience: "اكتب عن تجربتك",
        placeholder: "اكتب هنا…",
        notice: "اكتب تقييمًا صادقًا ومحترمًا دون أرقام هواتف أو معلومات شخصية. يظهر تقييمك باسمك بعد المراجعة.",
        submit: "إرسال التقييم",
        cancel: "إلغاء",
        errors: {
          rating: "اختر تقييمك بالنجوم.",
          short: "اكتب {min} حرفًا على الأقل.",
          contact: "احذف أرقام الهواتف أو البريد الإلكتروني من التقييم.",
        },
        done: { title: "شكرًا لك!", text: "وصلنا تقييمك، وسيظهر بعد مراجعته.", button: "تم" },
      },
      report: {
        title: "الإبلاغ عن الإعلان",
        sub: "أخبرنا بما يزعجك في هذا الإعلان. نراجع كل بلاغ.",
        sample: { title: "غرفة خاصة مشمسة في الدقي", meta: "سلمى حسن · الدقي، الجيزة" },
        reasonLabel: "سبب البلاغ",
        reasons: [
          { id: "misleading", label: "صور أو معلومات مضللة", hint: "الإعلان لا يطابق ما هو معروض فعلًا." },
          { id: "price", label: "سعر مختلف أو رسوم غير معلنة", hint: "رسوم إضافية أو مبلغ يختلف عن الإعلان." },
          { id: "unavailable", label: "مؤجّر بالفعل أو غير متاح", hint: "الإعلان ما زال ظاهرًا رغم عدم توفّره." },
          { id: "scam", label: "اشتباه في احتيال", hint: "إعلان مزيّف أو انتحال هوية أو طلب مريب." },
          { id: "unsafe", label: "محتوى غير آمن أو غير لائق", hint: "إساءة أو تمييز أو محتوى مخالف." },
          { id: "other", label: "سبب آخر", hint: "مشكلة أخرى غير مذكورة هنا." },
        ],
        detailsLabel: "أخبرنا بالمزيد",
        detailsPh: "ماذا حدث؟ ومتى لاحظت ذلك؟",
        hint: "لا تكتب بياناتك الشخصية هنا.",
        notice: "يراجع فريق الإشراف كل بلاغ. أبلغ فقط عن المشكلات الحقيقية.",
        submit: "إرسال البلاغ",
        cancel: "إلغاء",
        errors: { reason: "اختر سبب البلاغ.", short: "اكتب {min} حرفًا على الأقل." },
        done: { title: "وصلنا بلاغك", text: "شكرًا لمساعدتك في الحفاظ على أمان مغترب. سيراجعه فريقنا قريبًا.", button: "تم" },
      },
    },
  },

  en: {
    dialogs: {
      dev: { label: "Preview windows", review: "Write a review window", report: "Report window" },
      review: {
        title: "Write a review",
        kinds: {
          landowner: {
            sub: "How was your stay? Your opinion helps students choose their housing.",
            caption: "Rating the landowner after a completed stay",
            hint: "{max} characters max. Talk about the home, communication and cost clarity.",
          },
          tenant: {
            sub: "How was your experience with this tenant? Your opinion helps other landowners.",
            caption: "Rating the tenant after a completed stay",
            hint: "{max} characters max. Talk about reliability, communication and care of the home.",
          },
        },
        sample: { name: "Salma Hassan", listing: "Sunny private room in Dokki", meta: "Cairo University · July to September 2026" },
        ratingLabel: "Your overall rating",
        choose: "Tap a star to rate",
        outOf: "{n} out of 5 · {label}",
        labels: ["Poor experience", "Below expectations", "Fair experience", "Good experience", "Excellent experience"],
        experience: "Tell us about your experience",
        placeholder: "Write here…",
        notice: "Write an honest and respectful review without phone numbers or personal details. Your review appears under your name after moderation.",
        submit: "Submit review",
        cancel: "Cancel",
        errors: {
          rating: "Choose your rating with the stars.",
          short: "Write at least {min} characters.",
          contact: "Please remove phone numbers or email addresses from your review.",
        },
        done: { title: "Thank you!", text: "We received your review. It will appear after it is moderated.", button: "Done" },
      },
      report: {
        title: "Report listing",
        sub: "Tell us what’s wrong with this listing. We review every report.",
        sample: { title: "Sunny private room in Dokki", meta: "Salma Hassan · Dokki, Giza" },
        reasonLabel: "Reason for the report",
        reasons: [
          { id: "misleading", label: "Misleading photos or information", hint: "The listing doesn’t match what is really offered." },
          { id: "price", label: "Different price or unlisted fees", hint: "Extra fees or an amount that differs from the listing." },
          { id: "unavailable", label: "Already rented or unavailable", hint: "The listing is still showing although it isn’t available." },
          { id: "scam", label: "Suspected scam", hint: "A fake listing, impersonation or a suspicious request." },
          { id: "unsafe", label: "Unsafe or inappropriate content", hint: "Abuse, discrimination or other rule-breaking content." },
          { id: "other", label: "Something else", hint: "Another problem not listed here." },
        ],
        detailsLabel: "Tell us more",
        detailsPh: "What happened, and when did you notice it?",
        hint: "Please don’t include your personal details here.",
        notice: "Our moderation team reviews every report. Please only report real problems.",
        submit: "Submit report",
        cancel: "Cancel",
        errors: { reason: "Choose a reason for the report.", short: "Write at least {min} characters." },
        done: { title: "We got your report", text: "Thank you for helping keep Mo5tareb safe. Our team will review it soon.", button: "Done" },
      },
    },
  },
};
