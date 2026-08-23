// Bu fayl sahifa ochilganda content.json faylidagi ma'lumotlarni o'qiydi
// va sahifadagi tegishli joylarga (id lar orqali) joylashtiradi.
// Shunday qilib, matnlarni o'zgartirish uchun HTML kodini emas,
// faqat content.json faylini (yoki /admin panelni) tahrirlash kifoya.

async function saytniYukla() {
    // fetch — content.json faylini o'qib olish uchun brauzer funksiyasi
    const javob = await fetch("content.json");
    const c = await javob.json();

    // ---- HERO (yuqori tanishtiruv) qismi ----
    document.getElementById("hero-badge").textContent = c.hero_badge;
    document.getElementById("hero-title").innerHTML =
        c.hero_title_before + `<span>${c.hero_title_highlight}</span>` + c.hero_title_after;
    document.getElementById("hero-text").textContent = c.hero_text;

    // ---- STATISTIKA (yutuqlar) ro'yxati ----
    const statsHtml = c.stats.map(s => `
        <div class="stat-karta">
            <p class="stat-son">${s.number}</p>
            <p class="stat-izoh">${s.label}</p>
        </div>
    `).join("");
    document.getElementById("stats-list").innerHTML = statsHtml;

    // ---- Telefon raqamlar va manzil (bir necha joyda ishlatiladi) ----
    const tel1Raqam = "+" + c.phone1.replace(/\D/g, "");
    // \D — raqam bo'lmagan belgilarni topadi va olib tashlaydi (bo'sh joylarni tozalash uchun)
    const tel2Raqam = "+" + c.phone2.replace(/\D/g, "");

    document.getElementById("nav-tel-btn").href = "tel:" + tel1Raqam;

    document.getElementById("banner-label").textContent = c.banner_label;
    document.getElementById("banner-title").textContent = c.banner_title;
    document.getElementById("banner-phone1").href = "tel:" + tel1Raqam;
    document.getElementById("banner-phone1").querySelector(".raqam-matn").textContent = c.phone1;
    document.getElementById("banner-phone2").href = "tel:" + tel2Raqam;
    document.getElementById("banner-phone2").querySelector(".raqam-matn").textContent = c.phone2;
    document.getElementById("banner-address").textContent = c.address;

    // ---- Biz haqimizda ----
    document.getElementById("about-text").textContent = c.about_text;

    const afzalliklarHtml = c.advantages.map(a => `
        <div class="afzallik-karta">
            <span class="afzallik-icon">${a.icon}</span>
            <h3>${a.title}</h3>
            <p>${a.text}</p>
        </div>
    `).join("");
    document.getElementById("advantages-list").innerHTML = afzalliklarHtml;

    // ---- Yo'nalishlar (fanlar) ----
    document.getElementById("subjects-list").innerHTML =
        c.subjects.map(f => `<div class="fan-karta">${f}</div>`).join("");

    // ---- Qabul jarayoni (qadamlar) ----
    const qadamlarHtml = c.admission_steps.map((q, index) => `
        <div class="qadam-karta">
            <span class="qadam-raqam">${index + 1}</span>
            <h3>${q.title}</h3>
            <p>${q.text}</p>
        </div>
    `).join("");
    document.getElementById("admission-steps").innerHTML = qadamlarHtml;

    // ---- Darsdan tashqari mashg'ulotlar ----
    document.getElementById("activities-list").innerHTML =
        c.activities.map(m => `<div class="fan-karta">${m.icon} ${m.label}</div>`).join("");

    // ---- Savol-javob (FAQ) ----
    const faqHtml = c.faq.map(s => `
        <details class="faq-item">
            <summary>${s.q}</summary>
            <p>${s.a}</p>
        </details>
    `).join("");
    document.getElementById("faq-list").innerHTML = faqHtml;

    // ---- Futer (pastki qism) ----
    document.getElementById("footer-phone1").href = "tel:" + tel1Raqam;
    document.getElementById("footer-phone1").textContent = c.phone1;
    document.getElementById("footer-phone2").href = "tel:" + tel2Raqam;
    document.getElementById("footer-phone2").textContent = c.phone2;
    document.getElementById("footer-address").textContent = c.address;
    document.getElementById("footer-telegram").href = c.telegram;
    document.getElementById("footer-instagram").href = c.instagram;
}

saytniYukla();
