document.addEventListener('DOMContentLoaded', () => {
  /* Logo hover text */
    /* const texts = ["जय श्री राम", "हर हर महादेव", "ॐ नमः शिवाय", "भारत माता की जय", "वन्दे मातरम्"];*/
  const logoEl = document.querySelector('.logo');
  const logoText = document.getElementById('logo-text');
  let idx = 0;
  if (logoEl && logoText) {
    logoEl.addEventListener('mouseenter', () => {
      logoText.textContent = texts[idx];
      idx = (idx + 1) % texts.length;
    });

    /* 
    logoEl.addEventListener('mouseleave', () => {
      logoText.textContent = "कट्टर सनातनी";
    });*/
  }

  /* Hamburger menu */
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

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


  /* Facts carousel */
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

}); // DOMContentLoaded end










// Select elements
const stars = document.querySelectorAll('.star-rating span');
const feedbackText = document.getElementById('feedbackText');
const submitBtn = document.getElementById('submitFeedback');
const feedbackItems = document.getElementById('feedbackItems');

// Load saved feedback from localStorage
document.addEventListener("DOMContentLoaded", loadFeedback);

let selectedRating = 0;

// Handle star click
stars.forEach(star => {
  star.addEventListener('click', () => {
    selectedRating = star.getAttribute('data-star');
    highlightStars(selectedRating);
  });
});

function highlightStars(rating) {
  stars.forEach(star => {
    star.classList.remove("selected");
    if (star.getAttribute("data-star") <= rating) {
      star.classList.add("selected");
    }
  });
}

// Handle submit
submitBtn.addEventListener('click', () => {
  const text = feedbackText.value.trim();
  if (selectedRating === 0 || text === "") {
    alert("Please select a rating and write feedback before submitting!");
    return;
  }

  // Save feedback
  const feedback = { rating: selectedRating, text: text };
  let allFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [];
  allFeedback.push(feedback);
  localStorage.setItem("feedbackList", JSON.stringify(allFeedback));

  // Display feedback
  addFeedbackToUI(feedback);

  // Reset form
  feedbackText.value = "";
  selectedRating = 0;
  highlightStars(0);
});

function loadFeedback() {
  let allFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [];
  allFeedback.forEach(feedback => addFeedbackToUI(feedback));
}

function addFeedbackToUI(feedback) {
  const li = document.createElement("li");
  li.innerHTML = `<strong>${"★".repeat(feedback.rating)}</strong> - ${feedback.text}`;
  feedbackItems.appendChild(li);
}








// Selectors scoped to article rating section
const articleStars = document.querySelectorAll('.article-rating .star-rating span');
const articleRatingResult = document.querySelector('.article-rating #ratingResult');
const ratingBreakdown = document.getElementById("ratingBreakdown");

// Load saved rating data
let articleRatings = JSON.parse(localStorage.getItem("articleRatings")) || [];

// Load counters for each star rating
let ratingCounts = JSON.parse(localStorage.getItem("ratingCounts")) || {
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0
};

// Initial UI update
updateArticleAverage();
updateBreakdown();

articleStars.forEach(star => {
  star.addEventListener('click', () => {
    const rating = parseInt(star.getAttribute("data-star"));

    // Save to ratings array
    articleRatings.push(rating);
    localStorage.setItem("articleRatings", JSON.stringify(articleRatings));

    // Increment rating count
    ratingCounts[rating]++;
    localStorage.setItem("ratingCounts", JSON.stringify(ratingCounts));

    // Update UI
    highlightArticleStars(rating);
    updateArticleAverage();
    updateBreakdown();
  });
});

function highlightArticleStars(rating) {
  articleStars.forEach(star => {
    star.classList.remove("selected");
    if (parseInt(star.getAttribute("data-star")) <= rating) {
      star.classList.add("selected");
    }
  });
}

function updateArticleAverage() {
  if (articleRatings.length === 0) {
    articleRatingResult.textContent = "Average Rating: Not rated yet";
    return;
  }
  const avg = (articleRatings.reduce((a, b) => a + b, 0) / articleRatings.length).toFixed(1);
  articleRatingResult.textContent = `Average Rating: ${avg} / 5 (${articleRatings.length} votes)`;
}

function updateBreakdown() {
  let totalVotes = articleRatings.length;
  let breakdownHTML = "";

  for (let i = 5; i >= 1; i--) {
    let count = ratingCounts[i];
    let percent = totalVotes > 0 ? ((count / totalVotes) * 100).toFixed(1) : 0;

    breakdownHTML += `
      <div class="rating-row">
        <span class="label">${i}★</span>
        <div class="rating-bar">
          <div class="rating-bar-fill" style="width:${percent}%;"></div>
        </div>
        <span class="rating-percent">${percent}%</span>
      </div>
    `;
  }
  ratingBreakdown.innerHTML = breakdownHTML;
}





// You can add interactivity later
console.log("Article section loaded ✔️");



function submitDetails() {
  let name = document.getElementById("name").value;
  let whatsapp = document.getElementById("whatsapp").value;
  let gmail = document.getElementById("gmail").value;

  if (!name || (!whatsapp && !gmail)) {
    alert("Please enter your name and either WhatsApp or Gmail ID");
    return;
  }

  // Replace with your Apps Script URL
  let scriptURL = "https://script.google.com/macros/s/AKfycbxXzIL66ozP2A3UCZxeeuVGwyOVMYGniAtgiLk5pYLWhDlXgXnDzkiJlnWWoCA3lj-9Ag/exec";

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ name, whatsapp, gmail })
  })
  .then(res => res.text())
  .then(response => {
    console.log("Saved:", response);
    // Hide popup and show blog content
    document.getElementById("accessPopup").style.display = "none";
    document.getElementById("blogContent").style.display = "block";
  })
  .catch(error => console.error("Error!", error.message));
}











function openPopup() {
  document.getElementById("accessPopup").style.display = "flex";
}
function closePopup() {
  document.getElementById("accessPopup").style.display = "none";
}

function submitDetails() {
  let name = document.getElementById("name").value;
  let whatsapp = document.getElementById("whatsapp").value;
  let gmail = document.getElementById("gmail").value;

  if (!name || (!whatsapp && !gmail)) {
    alert("⚠️ Please enter your name and at least WhatsApp or Gmail/Insta ID");
    return;
  }

  // Your Google Apps Script URL (must be deployed as Web App with 'Anyone' access)
  let scriptURL = "https://script.google.com/macros/s/AKfycbxXzIL66ozP2A3UCZxeeuVGwyOVMYGniAtgiLk5pYLWhDlXgXnDzkiJlnWWoCA3lj-9Ag/exec";

  fetch(scriptURL, {
    method: 'POST',
    body: JSON.stringify({ name, whatsapp, gmail })
  })
  .then(res => res.text())
  .then(response => {
    console.log("Saved:", response);
    alert("✅ Details submitted successfully!");
    document.getElementById("accessPopup").style.display = "none";
    document.getElementById("blogContent").style.display = "block";
    window.scrollTo({top: 0, behavior: 'smooth'});
  })
  .catch(error => console.error("Error!", error.message));
}






(async function() {
  const scriptURL = "https://script.google.com/macros/s/AKfycbyFBYXCZ9x783iHQsYjhF-Vd2mL653yoV0YllwcZeRJlptiAtf_KOu7DeMPv64oucjp/exec"; // <<--- REPLACE with your /exec URL
  const submitBtn = document.getElementById('feedbackSubmit');
  const textarea = document.getElementById('feedbackText');
  const msg = document.getElementById('feedbackMessage');

  function showMessage(text, isError = false) {
    msg.style.display = 'block';
    msg.textContent = text;
    msg.style.color = isError ? '#ff6b6b' : '#8cffc6';
  }

  async function postJson(payload) {
    return fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        'Accept': 'text/plain'
      },
      body: JSON.stringify(payload),
      mode: 'cors'
    });
  }

  async function postForm(payload) {
    return fetch(scriptURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        'Accept': 'text/plain'
      },
      body: new URLSearchParams(payload),
      mode: 'cors'
    });
  }

  submitBtn.addEventListener('click', async function () {
    const text = textarea.value.trim();
    msg.style.display = 'none';

    if (!text) {
      alert('Please enter feedback before submitting.');
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    const payload = { Text: text };

    try {
      // Try JSON first
      let res = await postJson(payload);
      let resText = await res.text();
      console.log('JSON POST status:', res.status, 'response:', resText);

      if (!res.ok) {
        // If server returned non-2xx, try form fallback
        console.warn('JSON POST failed, trying form fallback...');
        res = await postForm(payload);
        resText = await res.text();
        console.log('Form POST status:', res.status, 'response:', resText);
      }

      if (!res.ok) {
        showMessage('Server error: ' + (resText || res.statusText || 'Unknown'), true);
        console.error('Final response not OK:', res.status, resText);
      } else {
        showMessage('✅ Thank you — feedback saved!');
        textarea.value = '';
      }
    } catch (networkErr) {
      console.error('Network/Fetch error:', networkErr);
      showMessage('Network error: ' + networkErr.message, true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Submit Feedback';
    }
  });
})();











// Product page Js
function flipCard(id){
  const card = document.getElementById(id);
  if(!card) return;
  card.classList.toggle('flipped');
}

// Initialize Bootstrap carousels when DOM is ready
if (typeof window !== 'undefined'){
  document.addEventListener('DOMContentLoaded', function(){
    // Ensure Bootstrap is available
    if (typeof bootstrap !== 'undefined' && bootstrap.Carousel){
      document.querySelectorAll('.carousel').forEach(function(el){
        // getOrCreateInstance prevents double-init
        bootstrap.Carousel.getOrCreateInstance(el, { interval: false, ride: false });
      });
    } else {
      console.warn('Bootstrap JS not found. Make sure bootstrap.bundle.min.js is loaded before your main.js');
    }

    // Optional: improve touch swipe sensitivity on mobile (Bootstrap includes swipe by default)
  });
}



document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  const slideCount = document.querySelectorAll(".slide").length;
  const indicators = document.querySelector(".indicators");

  let currentIndex = 0;
  let startX = 0;
  let isDragging = false;

  // Create dots dynamically
  for (let i = 0; i < slideCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => moveToSlide(i));
    indicators.appendChild(dot);
  }

  function moveToSlide(index) {
    slides.style.transform = `translateX(-${index * 100}%)`;
    document.querySelectorAll(".dot").forEach(dot => dot.classList.remove("active"));
    document.querySelectorAll(".dot")[index].classList.add("active");
    currentIndex = index;
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % slideCount;
    moveToSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + slideCount) % slideCount;
    moveToSlide(currentIndex);
  }

  // Auto Slide every 5s
  let autoSlide = setInterval(nextSlide, 5000);

  // --- Swipe / Drag Support ---
  slides.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    clearInterval(autoSlide);
  });

  slides.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    let endX = e.changedTouches[0].clientX;
    handleSwipe(startX, endX);
    isDragging = false;
    autoSlide = setInterval(nextSlide, 5000);
  });

  slides.addEventListener("mousedown", (e) => {
    startX = e.clientX;
    isDragging = true;
    clearInterval(autoSlide);
  });

  slides.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    let endX = e.clientX;
    handleSwipe(startX, endX);
    isDragging = false;
    autoSlide = setInterval(nextSlide, 5000);
  });

  function handleSwipe(start, end) {
    let diff = start - end;
    if (Math.abs(diff) > 50) { // minimum swipe distance
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  }
});






// Countdown Timer ,coming soon page
(function countdownTimer() {
  // Set target launch date (YYYY, MM-1, DD)
  const launchDate = new Date("2025-12-31T00:00:00").getTime();

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = launchDate - now;

    if (distance <= 0) {
      document.getElementById("countdown").innerHTML = "<h2>🎉 We're Live!</h2>";
      clearInterval(timer);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = days.toString().padStart(2, "0");
    hoursEl.textContent = hours.toString().padStart(2, "0");
    minutesEl.textContent = minutes.toString().padStart(2, "0");
    secondsEl.textContent = seconds.toString().padStart(2, "0");
  }

  const timer = setInterval(updateCountdown, 1000);
  updateCountdown();
})();









// Example: dynamically change alert every 10s alert bar
const alertMessages = [
  "🔥 Upcoming Blog: 'Secrets of Ancient Wisdom' — Stay Tuned! 🔔",
  "📖 New Chapter releasing soon: 'Power of Discipline' 💡",
  "✨ Special Series on Sanatan Philosophy coming this week!"
];

let currentMsg = 0;
const alertText = document.querySelector(".alert-text");

setInterval(() => {
  currentMsg = (currentMsg + 1) % alertMessages.length;
  alertText.textContent = alertMessages[currentMsg];
}, 10000);
