// Text for the "Add listing" page (Arabic + English), written from the Figma design.
// Words in {curly braces} are filled in by the code with fill(text, { ... }).
// Lists of choices use { id, label }: the id is what the form remembers, so it stays the same in both languages.
// The place lists (governorates, districts) are a starting sample. Add more places in both languages whenever you like.
export const addListingText = {
  ar: {
    addListing: {
      crumbs: { account: "حسابي", listings: "إدارة الإعلانات", current: "إضافة إعلان جديد" },
      title: "إضافة إعلان جديد",
      sub: "ساعد الطلاب على معرفة سكنك بوضوح. أكمل التفاصيل وارفع مستند الملكية قبل إرسال الإعلان للمراجعة.",
      note: "الحقول المعلّمة بنجمة مطلوبة. يمكنك حفظ مسودة في أي وقت.",

      // Shown instead of the form when the visitor can't add listings.
      guard: {
        studentTitle: "إضافة الإعلانات متاحة لحسابات الملّاك فقط",
        studentText: "حسابك الحالي حساب طالب. الحساب في مغترب إما طالب أو مالك عقار، ولذلك تظهر إدارة الإعلانات لحسابات الملّاك فقط.",
        visitorTitle: "سجّل الدخول لإضافة إعلان",
        visitorText: "سجّل الدخول بحساب مالك عقار لتتمكن من نشر إعلانك.",
        dashboard: "العودة إلى لوحة التحكم",
        login: "تسجيل الدخول",
      },

      // The seven section titles (also used by the list on the side)
      steps: ["تفاصيل السكن", "الموقع والجامعة", "الإيجار والفواتير", "الإشغال والتفضيلات", "المرافق وقواعد السكن", "صور العقار", "إثبات الملكية أو التفويض"],

      details: {
        name: "عنوان الإعلان",
        namePh: "مثال: غرفة خاصة مشمسة في الدقي",
        nameHint: "عنوان واضح يصف السكن دون بيانات تواصل.",
        type: "نوع السكن",
        typePh: "اختر نوع السكن",
        types: [
          { id: "private", label: "غرفة خاصة" },
          { id: "shared", label: "غرفة مشتركة" },
          { id: "entire", label: "شقة كاملة" },
        ],
        area: "المساحة بالمتر المربع",
        areaPh: "مثال: ١٦",
        areaUnit: "م²",
        floor: "الطابق",
        floorPh: "اختر الطابق",
        floors: [
          { id: "0", label: "الأرضي" }, { id: "1", label: "الأول" }, { id: "2", label: "الثاني" }, { id: "3", label: "الثالث" },
          { id: "4", label: "الرابع" }, { id: "5", label: "الخامس" }, { id: "6", label: "السادس" }, { id: "7", label: "السابع" },
          { id: "8", label: "الثامن" }, { id: "9", label: "التاسع" }, { id: "10", label: "العاشر" }, { id: "11", label: "أعلى من العاشر" },
        ],
        bathrooms: "عدد الحمامات",
        bathroomsPh: "اختر عدد الحمامات",
        bathroomList: [
          { id: "private", label: "حمام خاص داخل الغرفة" },
          { id: "shared1", label: "حمام واحد مشترك" },
          { id: "shared2", label: "حمامان مشتركان" },
          { id: "shared3", label: "٣ حمامات مشتركة أو أكثر" },
        ],
        desc: "وصف السكن",
        descPh: "صف الغرفة والشقة وأقرب وسائل المواصلات وما يناسب الطلاب…",
      },

      location: {
        sub: "يظهر للطلاب موقع تقريبي فقط؛ لا تنشر رقم الشقة في الوصف.",
        governorate: "المحافظة",
        governoratePh: "اختر المحافظة",
        district: "الحي",
        districtPh: "اختر الحي",
        places: [
          { id: "cairo", label: "القاهرة", districts: [
            { id: "nasr-city", label: "مدينة نصر" }, { id: "heliopolis", label: "مصر الجديدة" }, { id: "abbasia", label: "العباسية" },
            { id: "maadi", label: "المعادي" }, { id: "new-cairo", label: "التجمع الخامس" }, { id: "helwan", label: "حلوان" },
          ] },
          { id: "giza", label: "الجيزة", districts: [
            { id: "dokki", label: "الدقي" }, { id: "mohandessin", label: "المهندسين" }, { id: "agouza", label: "العجوزة" },
            { id: "faisal", label: "فيصل" }, { id: "haram", label: "الهرم" },
          ] },
          { id: "alex", label: "الإسكندرية", districts: [
            { id: "shatby", label: "الشاطبي" }, { id: "smouha", label: "سموحة" }, { id: "sidi-gaber", label: "سيدي جابر" }, { id: "moharam-bek", label: "محرم بك" },
          ] },
          { id: "dakahlia", label: "الدقهلية", districts: [
            { id: "mansoura-center", label: "وسط المنصورة" }, { id: "toril", label: "توريل" }, { id: "university-area", label: "حي الجامعة" },
          ] },
        ],
        street: "الشارع وأقرب علامة مميزة",
        streetPh: "مثال: شارع التحرير، بالقرب من ميدان المساحة",
        university: "أقرب جامعة",
        universityPh: "اختر الجامعة",
        walk: "وقت الوصول سيرًا",
        walkPh: "مثال: ١٢",
        walkUnit: "دقيقة",
        address: "بيانات العنوان الخاصة",
        addressPh: "مثال: العقار ٢٤، الطابق الثالث، الشقة ٦",
        addressHint: "لفريق المراجعة فقط؛ لا تظهر في الإعلان العام.",
      },

      rent: {
        sub: "كل المبالغ بالجنيه المصري. وضّح التكاليف قبل التواصل.",
        rent: "الإيجار الشهري",
        deposit: "مبلغ التأمين",
        amountPh: "مثال: ٣٥٠٠",
        unit: "جنيه",
        internetWater: "الإنترنت والمياه",
        electricityGas: "الكهرباء والغاز",
        utilityPh: "اختر",
        utilityOptions: [
          { id: "included", label: "مشمولان في الإيجار" },
          { id: "split", label: "غير مشمولين · بالتقاسم" },
          { id: "tenant", label: "غير مشمولين · على المستأجر" },
        ],
        minStay: "الحد الأدنى للإقامة",
        minStayPh: "اختر المدة",
        stays: [
          { id: "1", label: "شهر واحد" }, { id: "2", label: "شهران" }, { id: "3", label: "٣ أشهر" },
          { id: "6", label: "٦ أشهر" }, { id: "9", label: "٩ أشهر" }, { id: "12", label: "١٢ شهرًا" },
        ],
        from: "متاح من",
        extra: "مصروفات إضافية أو طريقة تقسيم الفواتير",
        extraPh: "مثال: تُقسم الكهرباء والغاز بالتساوي بين المقيمين حسب الاستهلاك الفعلي.",
        extraHint: "اكتب أي مبلغ آخر سيدفعه الطالب. الرسوم غير المعلنة من أكثر أسباب الإبلاغ عن الإعلانات.",
      },

      occupancy: {
        total: "إجمالي المقيمين في الشقة",
        totalPh: "مثال: ٣",
        totalUnit: "مقيمين",
        places: "الأماكن المتاحة",
        placesPh: "مثال: ١",
        placesUnit: "أماكن",
        group: "الفئة المفضلة",
        groupPh: "اختر الفئة",
        groups: [
          { id: "women", label: "طالبات فقط" },
          { id: "men", label: "طلاب فقط" },
          { id: "any", label: "بدون تفضيل" },
        ],
        perRoom: "عدد المقيمين في الغرفة",
        perRoomPh: "اختر العدد",
        perRoomList: [
          { id: "1", label: "شخص واحد" },
          { id: "2", label: "شخصان" },
          { id: "3", label: "٣ أشخاص" },
          { id: "4", label: "٤ أشخاص أو أكثر" },
        ],
        hint: "أضف تفضيلات مرتبطة بطبيعة السكن فقط، وبأسلوب محترم.",
      },

      amenities: {
        list: [
          { id: "furnished", label: "أثاث كامل" },
          { id: "wifi", label: "إنترنت لاسلكي" },
          { id: "ac", label: "تكييف" },
          { id: "washer", label: "غسالة" },
          { id: "kitchen", label: "مطبخ مشترك" },
          { id: "elevator", label: "مصعد" },
        ],
        rules: "قواعد السكن",
        ruleList: [
          { id: "noSmoking", label: "ممنوع التدخين داخل الشقة" },
          { id: "noGuests", label: "لا يُسمح بمبيت الضيوف" },
        ],
        notes: "ساعات الهدوء وملاحظات إضافية",
        notesPh: "مثال: الهدوء من العاشرة مساءً إلى الثامنة صباحًا. تنظيف المساحات المشتركة بالتناوب أسبوعيًا.",
      },

      photos: {
        sub: "الصور المضافة: {n} من {max}. أضف {min} صور على الأقل دون مستندات أو بيانات شخصية.",
        drop: "أضف صورًا واضحة للغرفة والمساحات المشتركة",
        hint: "صور JPG أو PNG · حتى {size} ميجابايت للصورة",
        choose: "إضافة صور",
        full: "اكتمل العدد الأقصى",
        alt: "صورة السكن رقم {n}",
        main: "الصورة الرئيسية",
        makeMain: "اجعلها الرئيسية",
        remove: "حذف الصورة",
        spaceLabel: "ما الذي تُظهره الصورة رقم {n}؟",
        spaces: [
          { id: "room", label: "الغرفة" },
          { id: "living", label: "غرفة المعيشة" },
          { id: "kitchen", label: "المطبخ" },
          { id: "bathroom", label: "الحمام" },
          { id: "building", label: "المبنى والمدخل" },
          { id: "other", label: "أخرى" },
        ],
        errors: {
          type: "الصورة يجب أن تكون JPG أو PNG.",
          size: "حجم الصورة يتجاوز {size} ميجابايت.",
          max: "يمكنك إضافة {max} صور كحد أقصى.",
        },
      },

      ownership: {
        sub: "مطلوب لمراجعة العقار. لا يظهر هذا المستند للطلاب.",
        role: "صفتك بالنسبة للعقار",
        rolePh: "اختر صفتك",
        roles: [
          { id: "owner", label: "مالك العقار" },
          { id: "authorized", label: "مفوّض من المالك" },
        ],
        docTitle: "مستند الملكية أو تفويض بالإعلان",
        docText: "ارفع عقد ملكية أو تفويضًا ساريًا من المالك يوضح حقك في عرض السكن.",
        privacy: "فريق التحقق وحده يطّلع على المستند. التحقق من ملكية العقار منفصل عن التحقق من هوية حسابك.",
      },

      confirm: "أقر بصحة بيانات الإعلان وبامتلاكي الحق في عرض هذا العقار، وأوافق على قواعد النشر.",
      submit: "إرسال الإعلان للمراجعة",
      draft: "حفظ كمسودة",
      draftSaved: "تم حفظ المسودة · {time}",
      footnote: "لن يُنشر الإعلان قبل اعتماد المراجعة. سنرسل إشعارًا بحالة طلبك خلال ٢٤ ساعة عادةً.",

      errors: {
        nameShort: "العنوان قصير جدًا. اكتب {min} أحرف على الأقل.",
        area: "أدخل مساحة صحيحة بالمتر المربع، مثل ١٦.",
        walk: "أدخل عدد دقائق صحيحًا، مثل ١٢.",
        amount: "أدخل المبلغ كرقم صحيح، مثل ٣٥٠٠.",
        count: "أدخل عددًا صحيحًا، مثل ٣.",
        placesMax: "الأماكن المتاحة لا يمكن أن تزيد على إجمالي المقيمين.",
        pastDate: "اختر تاريخًا من اليوم فصاعدًا.",
        contact: "لا تكتب أرقام هاتف أو بريدًا إلكترونيًا هنا. بيانات التواصل تظهر للطلاب الموثّقين فقط.",
        photos: "أضف {min} صور على الأقل.",
        descShort: "الوصف قصير جدًا. اكتب {min} حرفًا على الأقل.",
        confirm: "يجب الإقرار بصحة البيانات للمتابعة.",
      },

      // Left-hand column
      side: {
        listTitle: "محتوى الإعلان",
        beforeTitle: "قبل نشر الإعلان",
        before: "تُراجع بيانات العقار ومستند الملكية أو التفويض بواسطة فريق التحقق. مستنداتك خاصة ولا تظهر في الإعلان.",
        tipsTitle: "نصائح لإعلان واضح",
        tips: ["اعرض صورًا حديثة وحقيقية لكل مساحة.", "وضّح المصروفات وقواعد السكن من البداية.", "تنتهي صلاحية الإعلان بعد {days} يومًا؛ جدّده لتأكيد التوافر."],
      },

      done: {
        title: "تم استلام إعلانك",
        text: "سنراجع الإعلان ومستند الملكية، ثم يظهر للطلاب. سنرسل إشعارًا بحالة طلبك خلال ٢٤ ساعة عادةً.",
        dashboard: "العودة إلى لوحة التحكم",
        another: "إضافة إعلان آخر",
      },
    },
  },

  en: {
    addListing: {
      crumbs: { account: "My account", listings: "Listings management", current: "Add new listing" },
      title: "Add new listing",
      sub: "Help students understand your place clearly. Complete the details and upload your proof of ownership before sending the listing for review.",
      note: "Fields marked with a star are required. You can save a draft at any time.",

      guard: {
        studentTitle: "Adding listings is for landowner accounts only",
        studentText: "Your current account is a student account. A Mo5tareb account is either a student or a landowner, so listing management is only available to landowners.",
        visitorTitle: "Log in to add a listing",
        visitorText: "Log in with a landowner account to publish your listing.",
        dashboard: "Back to dashboard",
        login: "Login",
      },

      steps: ["Property details", "Location & university", "Rent & bills", "Occupancy & preferences", "Amenities & house rules", "Property photos", "Proof of ownership or authorization"],

      details: {
        name: "Listing title",
        namePh: "e.g. Sunny private room in Dokki",
        nameHint: "A clear title that describes the place, without contact details.",
        type: "Housing type",
        typePh: "Choose the housing type",
        types: [
          { id: "private", label: "Private room" },
          { id: "shared", label: "Shared room" },
          { id: "entire", label: "Entire apartment" },
        ],
        area: "Size in square metres",
        areaPh: "e.g. 16",
        areaUnit: "m²",
        floor: "Floor",
        floorPh: "Choose the floor",
        floors: [
          { id: "0", label: "Ground" }, { id: "1", label: "1st" }, { id: "2", label: "2nd" }, { id: "3", label: "3rd" },
          { id: "4", label: "4th" }, { id: "5", label: "5th" }, { id: "6", label: "6th" }, { id: "7", label: "7th" },
          { id: "8", label: "8th" }, { id: "9", label: "9th" }, { id: "10", label: "10th" }, { id: "11", label: "Above 10th" },
        ],
        bathrooms: "Number of bathrooms",
        bathroomsPh: "Choose the number of bathrooms",
        bathroomList: [
          { id: "private", label: "Private bathroom in the room" },
          { id: "shared1", label: "One shared bathroom" },
          { id: "shared2", label: "Two shared bathrooms" },
          { id: "shared3", label: "3 or more shared bathrooms" },
        ],
        desc: "Description",
        descPh: "Describe the room, the flat, the nearest transport and who it suits…",
      },

      location: {
        sub: "Students only see an approximate location; don’t post the flat number in the description.",
        governorate: "Governorate",
        governoratePh: "Choose the governorate",
        district: "District",
        districtPh: "Choose the district",
        places: [
          { id: "cairo", label: "Cairo", districts: [
            { id: "nasr-city", label: "Nasr City" }, { id: "heliopolis", label: "Heliopolis" }, { id: "abbasia", label: "Abbasia" },
            { id: "maadi", label: "Maadi" }, { id: "new-cairo", label: "Fifth Settlement" }, { id: "helwan", label: "Helwan" },
          ] },
          { id: "giza", label: "Giza", districts: [
            { id: "dokki", label: "Dokki" }, { id: "mohandessin", label: "Mohandessin" }, { id: "agouza", label: "Agouza" },
            { id: "faisal", label: "Faisal" }, { id: "haram", label: "Haram" },
          ] },
          { id: "alex", label: "Alexandria", districts: [
            { id: "shatby", label: "Shatby" }, { id: "smouha", label: "Smouha" }, { id: "sidi-gaber", label: "Sidi Gaber" }, { id: "moharam-bek", label: "Moharam Bek" },
          ] },
          { id: "dakahlia", label: "Dakahlia", districts: [
            { id: "mansoura-center", label: "Mansoura center" }, { id: "toril", label: "Toril" }, { id: "university-area", label: "University area" },
          ] },
        ],
        street: "Street and nearest landmark",
        streetPh: "e.g. Tahrir Street, near Sahat Square",
        university: "Nearest university",
        universityPh: "Choose the university",
        walk: "Walking time",
        walkPh: "e.g. 12",
        walkUnit: "min",
        address: "Private address details",
        addressPh: "e.g. Building 24, 3rd floor, flat 6",
        addressHint: "For the review team only; not shown in the public listing.",
      },

      rent: {
        sub: "All amounts are in Egyptian pounds. Be clear about costs before students get in touch.",
        rent: "Monthly rent",
        deposit: "Deposit",
        amountPh: "e.g. 3500",
        unit: "EGP",
        internetWater: "Internet & water",
        electricityGas: "Electricity & gas",
        utilityPh: "Choose",
        utilityOptions: [
          { id: "included", label: "Included in the rent" },
          { id: "split", label: "Not included · split between tenants" },
          { id: "tenant", label: "Not included · paid by the tenant" },
        ],
        minStay: "Minimum stay",
        minStayPh: "Choose the length",
        stays: [
          { id: "1", label: "1 month" }, { id: "2", label: "2 months" }, { id: "3", label: "3 months" },
          { id: "6", label: "6 months" }, { id: "9", label: "9 months" }, { id: "12", label: "12 months" },
        ],
        from: "Available from",
        extra: "Extra expenses or how bills are split",
        extraPh: "e.g. Electricity and gas are split equally between residents by actual use.",
        extraHint: "Write any other amount the student will pay. Unlisted fees are one of the most common reasons listings get reported.",
      },

      occupancy: {
        total: "Total residents in the flat",
        totalPh: "e.g. 3",
        totalUnit: "residents",
        places: "Available places",
        placesPh: "e.g. 1",
        placesUnit: "places",
        group: "Preferred group",
        groupPh: "Choose the group",
        groups: [
          { id: "women", label: "Female students only" },
          { id: "men", label: "Male students only" },
          { id: "any", label: "No preference" },
        ],
        perRoom: "Residents per room",
        perRoomPh: "Choose the number",
        perRoomList: [
          { id: "1", label: "One person" },
          { id: "2", label: "Two people" },
          { id: "3", label: "3 people" },
          { id: "4", label: "4 people or more" },
        ],
        hint: "Only add preferences related to the nature of the housing, and keep the wording respectful.",
      },

      amenities: {
        list: [
          { id: "furnished", label: "Fully furnished" },
          { id: "wifi", label: "Wi-Fi" },
          { id: "ac", label: "Air conditioning" },
          { id: "washer", label: "Washing machine" },
          { id: "kitchen", label: "Shared kitchen" },
          { id: "elevator", label: "Elevator" },
        ],
        rules: "House rules",
        ruleList: [
          { id: "noSmoking", label: "No smoking inside the flat" },
          { id: "noGuests", label: "No overnight guests" },
        ],
        notes: "Quiet hours and extra notes",
        notesPh: "e.g. Quiet from 10 pm to 8 am. Shared spaces are cleaned by rota each week.",
      },

      photos: {
        sub: "Photos added: {n} of {max}. Add at least {min} photos, without documents or personal details.",
        drop: "Add clear photos of the room and shared spaces",
        hint: "JPG or PNG · up to {size} MB per photo",
        choose: "Add photos",
        full: "Maximum reached",
        alt: "Listing photo {n}",
        main: "Main photo",
        makeMain: "Make main",
        remove: "Remove photo",
        spaceLabel: "What does photo {n} show?",
        spaces: [
          { id: "room", label: "Room" },
          { id: "living", label: "Living room" },
          { id: "kitchen", label: "Kitchen" },
          { id: "bathroom", label: "Bathroom" },
          { id: "building", label: "Building & entrance" },
          { id: "other", label: "Other" },
        ],
        errors: {
          type: "The photo must be a JPG or PNG.",
          size: "The photo is larger than {size} MB.",
          max: "You can add up to {max} photos.",
        },
      },

      ownership: {
        sub: "Required to review the property. This document is never shown to students.",
        role: "Your role for this property",
        rolePh: "Choose your role",
        roles: [
          { id: "owner", label: "Property owner" },
          { id: "authorized", label: "Authorized by the owner" },
        ],
        docTitle: "Ownership document or authorization to list",
        docText: "Upload a title deed or a valid authorization from the owner that shows your right to list the place.",
        privacy: "Only the verification team can see the document. Verifying the property is separate from verifying your account identity.",
      },

      confirm: "I confirm the listing details are accurate, that I have the right to list this property, and I agree to the publishing rules.",
      submit: "Submit listing for review",
      draft: "Save as draft",
      draftSaved: "Draft saved · {time}",
      footnote: "The listing won’t be published before the review is approved. We’ll notify you of your request status, usually within 24 hours.",

      errors: {
        nameShort: "The title is too short. Write at least {min} characters.",
        area: "Enter a valid size in square metres, like 16.",
        walk: "Enter a whole number of minutes, like 12.",
        amount: "Enter the amount as a whole number, like 3500.",
        count: "Enter a whole number, like 3.",
        placesMax: "Available places can’t be more than the total residents.",
        pastDate: "Choose a date from today onwards.",
        contact: "Don’t write phone numbers or email addresses here. Contact details are only shown to verified students.",
        photos: "Add at least {min} photos.",
        descShort: "The description is too short. Write at least {min} characters.",
        confirm: "You need to confirm the details are accurate to continue.",
      },

      side: {
        listTitle: "Listing contents",
        beforeTitle: "Before you publish",
        before: "The verification team reviews the property details and your ownership or authorization document. Your documents stay private and never appear in the listing.",
        tipsTitle: "Tips for a clear listing",
        tips: ["Show recent, real photos of every space.", "State costs and house rules from the start.", "A listing expires after {days} days; renew it to confirm availability."],
      },

      done: {
        title: "We’ve received your listing",
        text: "We’ll review the listing and your ownership document, then it will appear to students. We’ll notify you of your request status, usually within 24 hours.",
        dashboard: "Back to dashboard",
        another: "Add another listing",
      },
    },
  },
};
