
  /* Facts carousel html code 1 */   
  const facts = [
    "“सनातन” का अर्थ – शाश्वत, अनादि और अनंत। इसका कोई आरंभ और अंत नहीं माना जाता।",
    "भगवद गीता को धर्मयुक्त जीवन जीने का आध्यात्मिक मार्गदर्शक माना जाता है।",
    "वेद मानवता के सबसे पुराने ग्रंथ हैं।",
    "योग का जन्म प्राचीन भारत में शारीरिक, मानसिक और आध्यात्मिक साधना के रूप में हुआ।",
    "सनातन धर्म 'वसुधैव कुटुम्बकम' – पूरी दुनिया एक परिवार है – का संदेश देता है।"
  ];
  let factIndex = 0;
  const factNumberEl = document.getElementById('fact-number');
  const factTextEl = document.getElementById('fact-text');
  const prevBtn = document.getElementById('prev-fact');
  const nextBtn = document.getElementById('next-fact');
  function renderFact() {
    factNumberEl.textContent = `तथ्य #${factIndex + 1}`;
    factTextEl.textContent = facts[factIndex];
  }
  if (prevBtn) prevBtn.addEventListener('click', () => {
    factIndex = (factIndex - 1 + facts.length) % facts.length;
    renderFact();
  });
  if (nextBtn) nextBtn.addEventListener('click', () => {
    factIndex = (factIndex + 1) % facts.length;
    renderFact();
  });
  renderFact();









// message-section-fallback.js
document.addEventListener('DOMContentLoaded', () => {
  // Find all message sections on the page
  const sections = document.querySelectorAll('.message-section, #message-section, .msg-section');

  if (!sections.length) return;

  sections.forEach(section => {
    // Flexible selectors with fallbacks (works with different HTML variants)
    const showBtn = section.querySelector('#msgShowBtn, #showMessageBtn, .toggle-btns, .msg-toggle-btn, .toggle-btn');
    const box    = section.querySelector('#msgBox, #messageBox, .message-box, .msg-box');
    const closeBtn = section.querySelector('#msgCloseBtn, #closeBtn, .close-btnn, .msg-close-btn, .close-btn');
    const hindiBtn  = section.querySelector('#msgHindiBtn, #hindiBtn, .msg-hindi-btn, .lang-buttons button:first-child');
    const englishBtn= section.querySelector('#msgEnglishBtn, #englishBtn, .msg-english-btn, .lang-buttons button:last-child');
    const contentEl = section.querySelector('#msgContent, #messageContent, .msg-content');

    // If critical elements missing, skip this section to avoid errors
    if (!showBtn || !box) {
      // console.warn('Message section skipped: missing showBtn or box', section);
      return;
    }

    // Ensure box starts collapsed (defensive)
    box.classList.remove('open');
    box.style.maxHeight = box.style.maxHeight || '0';

    // Messages (edit these if you want different text)
    const hindiMessage = `
      <h2>🚀 समाज सुधार की शुरुआत खुद से</h2>
      <p>
        यह सिर्फ़ एक वेबसाइट नहीं, बल्कि एक जागृति का मंच है।
        यहाँ हम साझा करेंगे – अनुभव, सत्य, अच्छाई-बुराई का अंतर और वे समाधान
        जो हमारे समाज को बेहतर बना सकते हैं।
      </p>
      <p><strong>“आइए जुड़ें इस प्रयास से… क्योंकि जब हम बदलेंगे, तब समाज बदलेगा।”</strong></p>
    `;
    const englishMessage = `
      <h2>🚀 Change Begins With Ourselves</h2>
      <p>
        This is not just a website, but a platform of awakening.
        Here we will share – experiences, truth, the difference between right and wrong,
        and the solutions that can make our society better.
      </p>
      <p><strong>“Join this effort… because when we change, society will change.”</strong></p>
    `;

    // Helper: open and close functions
    const openBox = () => {
      box.classList.add('open');
      // set exact height for smooth animation
      box.style.maxHeight = box.scrollHeight + 'px';
      showBtn.setAttribute('aria-expanded', 'true');
      // mark show button (optional)
      showBtn.classList && showBtn.classList.add('active');
    };

    const closeBox = () => {
      // animate to zero
      box.style.maxHeight = '0';
      // remove open class after transition (keeps CSS consistent)
      box.classList.remove('open');
      showBtn.setAttribute('aria-expanded', 'false');
      showBtn.classList && showBtn.classList.remove('active');
    };

    // Toggle on show button — 1st click opens, 2nd closes
    showBtn.addEventListener('click', (e) => {
      // if box currently open => close, else open
      if (box.classList.contains('open')) closeBox();
      else openBox();
    });

    // Close button inside box (if present)
    if (closeBtn) {
      closeBtn.addEventListener('click', () => closeBox());
    }

    // Close when user clicks outside the box (optional, unobtrusive)
    // (Only closes if the section has been opened)
    document.addEventListener('click', (evt) => {
      if (!box.classList.contains('open')) return;
      // if click is inside the section, ignore; otherwise close
      if (!section.contains(evt.target)) {
        closeBox();
      }
    }, { passive: true });

    // Adjust height on window resize while open
    window.addEventListener('resize', () => {
      if (box.classList.contains('open')) {
        // recompute and set precise height
        box.style.maxHeight = box.scrollHeight + 'px';
      }
    });

    // Language switching (if content element exists)
    if (contentEl) {
      if (hindiBtn) {
        hindiBtn.addEventListener('click', () => {
          contentEl.innerHTML = hindiMessage;
          hindiBtn.classList && hindiBtn.classList.add('active');
          if (englishBtn) englishBtn.classList && englishBtn.classList.remove('active');
          // ensure box resizes to new content height
          requestAnimationFrame(() => { if (box.classList.contains('open')) box.style.maxHeight = box.scrollHeight + 'px'; });
        });
      }
      if (englishBtn) {
        englishBtn.addEventListener('click', () => {
          contentEl.innerHTML = englishMessage;
          englishBtn.classList && englishBtn.classList.add('active');
          if (hindiBtn) hindiBtn.classList && hindiBtn.classList.remove('active');
          requestAnimationFrame(() => { if (box.classList.contains('open')) box.style.maxHeight = box.scrollHeight + 'px'; });
        });
      }
    }
  }); // end foreach section
});






 // Toggle menu when hamburger clicked
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", (e) => {
  e.stopPropagation(); // prevent body click from firing
  navLinks.classList.toggle("active");
});

// Close menu if click happens outside navbar
document.addEventListener("click", (e) => {
  if (navLinks.classList.contains("active") && 
      !navLinks.contains(e.target) && 
      !menuToggle.contains(e.target)) {
    navLinks.classList.remove("active");
  }
});


/* Topics */
 const topics = [
  { id: "man.html", title: "सनातन धर्म क्या है?" },
  { id: "samaj.html", title: "ॐ का अर्थ" },
  { id: "samaj.html", title: "योग का महत्व" },
  { id: "samaj.html", title: "वेद और शास्त्र" },
  { id: "samaj.html", title: "सेवा का महत्व" },
  
   { id: "samaj.html", title: "सनातन धर्म क्या है?" },
  { id: "samaj.html", title: "ॐ का अर्थ" },
  { id: "samaj.html", title: "योग का महत्व" },
  { id: "samaj.html", title: "वेद और शास्त्र" },
  { id: "samaj.html", title: "सेवा का महत्व" }
];

const list = document.getElementById('topics-list');
if (list) {
  topics.forEach(t => {
    const a = document.createElement('a');
    a.className = 'topic-link';
    a.href = t.id;   // directly open topic1.html etc.
    a.textContent = t.title;
    list.appendChild(a);
  });
}







  /* -----------------------------
     4) Book reader (pages loaded from #source-content)
     Links to: #source-content, #pages, #prev-page, #next-page, #page-indicator, #progress-bar
     ----------------------------- */
  (function bookReader() {
    const sourcePages = Array.from(document.querySelectorAll("#source-content .page-content"));
    const pagesContainer = document.getElementById("pages");
    const prevPageBtn = document.getElementById("prev-page");
    const nextPageBtn = document.getElementById("next-page");
    const pageIndicator = document.getElementById("page-indicator");
    const progressBar = document.getElementById("progress-bar");

    if (!pagesContainer || sourcePages.length === 0) return;

    let currentPage = 0;
    const totalPages = sourcePages.length;

    function render() {
      pagesContainer.innerHTML = "";
      const clone = sourcePages[currentPage].cloneNode(true);
      clone.classList.add('active');
      pagesContainer.appendChild(clone);
      if (pageIndicator) pageIndicator.textContent = `पेज ${currentPage + 1} / ${totalPages}`;
      if (progressBar) progressBar.style.width = `${((currentPage + 1) / totalPages) * 100}%`;
    }


    if (prevPageBtn) prevPageBtn.addEventListener('click', () => {
  if (currentPage > 0) { 
    currentPage--; 
    render(); 
    window.scrollTo({ top: document.getElementById("web-book").offsetTop, behavior: "smooth" });
  }
});

if (nextPageBtn) nextPageBtn.addEventListener('click', () => {
  if (currentPage < totalPages - 1) { 
    currentPage++; 
    render(); 
    window.scrollTo({ top: document.getElementById("web-book").offsetTop, behavior: "smooth" });
  }
});

   // if (prevPageBtn) prevPageBtn.addEventListener('click', () => {
     // if (currentPage > 0) { currentPage--; render(); }
    //});

    //if (nextPageBtn) nextPageBtn.addEventListener('click', () => {
     // if (currentPage < totalPages - 1) { currentPage++; render(); }
   // });

    // Font-size buttons
    const incBtn = document.getElementById('increase-font');
    const decBtn = document.getElementById('decrease-font');
    let fontSize = 16; // default px
    function applyFontSize() {
      pagesContainer.style.fontSize = fontSize + 'px';
    }
    if (incBtn) incBtn.addEventListener('click', () => { fontSize += 2; applyFontSize(); });
    if (decBtn) decBtn.addEventListener('click', () => { fontSize = Math.max(12, fontSize - 2); applyFontSize(); });

    // Theme toggle: toggles a 'dark' class on body
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        themeToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
      });
    }

    // Translate toggle: toggles visibility of .hindi and .english within active page
    const translateBtn = document.getElementById('translate-btn');
    if (translateBtn) {
      let showingHindi = true;
      translateBtn.addEventListener('click', () => {
        const active = pagesContainer.querySelector('.page-content');
        if (!active) return;
        active.querySelectorAll('.hindi').forEach(el => el.classList.toggle('hidden'));
        active.querySelectorAll('.english').forEach(el => el.classList.toggle('hidden'));
        showingHindi = !showingHindi;
        translateBtn.textContent = showingHindi ? '🌐 Translate' : '🌐 अनुवाद';
      });
    }

    // Initial render
    render();
    applyFontSize();
  })();
 
// DOMContentLoaded end







// Minimalistic Carousel JS atarts here
// Carousel functionality (same as before)
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel-btn.next');
const prevButton = document.querySelector('.carousel-btn.prev');
const dotsNav = document.querySelector('.carousel-dots');
let currentIndex = 0;

// Create dots dynamically
slides.forEach((slide, index) => {
  const dot = document.createElement('button');
  if (index === 0) dot.classList.add('active');
  dotsNav.appendChild(dot);
  dot.addEventListener('click', () => {
    currentIndex = index;
    updateCarousel();
  });
});
const dots = Array.from(dotsNav.children);

// Function to update carousel position
function updateCarousel() {
  const slideWidth = slides[0].getBoundingClientRect().width;
  track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[currentIndex].classList.add('active');
}

// Next Button
nextButton.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
});

// Prev Button
prevButton.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateCarousel();
});

// Auto Slide
setInterval(() => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateCarousel();
}, 5000);

window.addEventListener('resize', updateCarousel);

// ----------------------
// Lightbox functionality
// ----------------------
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.close-btn');

// When user clicks an image
slides.forEach(slide => {
  const img = slide.querySelector('img');
  img.addEventListener('click', () => {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src; // Show clicked image
  });
});

// Close when clicking X
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
});

// Close when clicking outside image
lightbox.addEventListener('click', (e) => {
  if (e.target !== lightboxImg) {
    lightbox.style.display = 'none';
  }
});


