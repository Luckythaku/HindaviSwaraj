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
  { id: "topic2.html", title: "ॐ का अर्थ" },
  { id: "topic3.html", title: "योग का महत्व" },
  { id: "topic4.html", title: "वेद और शास्त्र" },
  { id: "topic5.html", title: "सेवा का महत्व" },
  
   { id: "topic1.html", title: "सनातन धर्म क्या है?" },
  { id: "topic6.html", title: "ॐ का अर्थ" },
  { id: "topic7.html", title: "योग का महत्व" },
  { id: "topic8.html", title: "वेद और शास्त्र" },
  { id: "topic9.html", title: "सेवा का महत्व" }
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
      if (currentPage > 0) { currentPage--; render(); }
    });

    if (nextPageBtn) nextPageBtn.addEventListener('click', () => {
      if (currentPage < totalPages - 1) { currentPage++; render(); }
    });

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
