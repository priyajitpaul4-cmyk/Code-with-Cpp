# C++ Code Lab

A premium, multi-language C++ learning platform — learn concepts, browse 35+ real
projects, practice hands-on problems, follow a 30-day study plan and drill
interview questions, all from a single static site (no build step required).

## ✨ What's new in this redesign

- **"What is C++?"** intro section at the top of the page, with quick stats
  (created 1979, ISO standard, paradigms, real-world software it powers).
- **Professional navbar** with dropdown menus ("Learn", "Programs"), active-section
  highlighting on scroll, a scroll shadow, and a prominent "Start Learning" CTA.
- **5 fully working languages**: English, বাংলা, हिंदी, **Español** and **Français**
  (the last two are brand new) — every UI string is translated, not just a few.
- **Animated hero**: a typewriter effect on the code editor and a rotating word
  ("Programs" → "Games" → "Systems" → "Algorithms" → "Careers").
- **Redesigned "Why Learn C++?"** section: 9 feature cards with "Fastest",
  "Interview Favorite", "High-Paying" and "Top-Ranked" ribbons.
- **Redesigned Practice Zone**: difficulty filters, a solved-problems progress bar,
  inline hints, and full solutions opened in the shared code modal.
- Scroll-reveal animations across every section, animated counters, and a
  navbar/section IntersectionObserver for active-link highlighting.
- The project now follows a real, browsable folder layout — every one of the
  35 programs and the first 10 practice problems has its own file on disk (see
  below), instead of living only inside a single JSON blob.

## 📁 Project Structure

```
Code-with-Cpp/
│
├── index.html
├── README.md
├── LICENSE
│
├── assets/
│   ├── images/
│   └── icons/
│
├── css/
│   ├── style.css          # theme tokens, layout, all components
│   ├── responsive.css      # every media query, largest → smallest
│   └── animations.css      # keyframes + scroll-reveal utility classes
│
├── js/
│   ├── script.js           # navbar, hero, What-is-C++, Why, Roadmap, Interview, Resources
│   ├── language.js         # 5-language i18n dictionary + switcher
│   ├── practice.js         # Practice Zone: filters, progress, solutions
│   ├── programs.js         # Projects grid: filter/search/modal
│   └── study-plan.js       # 30-day plan, streak, fun facts, magic trick
│
├── data/
│   ├── programs.json        # all 35 projects (title, code, output, explanation)
│   ├── practice.json        # practice problems (statement, hint, solution)
│   ├── interview.json       # interview Q&A
│   └── study-plan.json      # 30-day plan + fun facts + the magic trick
│
├── programs/
│   ├── 01-hello-world/
│   │   ├── main.cpp
│   │   └── README.md
│   ├── 02-simple-calculator/
│   ├── ...
│   └── 35-mini-banking-system/
│
├── practice/
│   ├── problem-01.md
│   ├── problem-02.md
│   ├── ...
│   └── problem-10.md
│
└── docs/
    └── screenshots/
```

## 🚀 Running locally

This is a static site — no build tools, no dependencies. Serve the folder
with any static server and open it in a browser, for example:

```bash
cd Code-with-Cpp
python3 -m http.server 8080
# then open http://localhost:8080
```

Opening `index.html` directly via `file://` will mostly work, but the
`fetch()` calls to `data/*.json` require a local server in most browsers.

## 🌐 Languages

The language switcher in the navbar covers English, বাংলা, हिंदी, Español and
Français — pick one and every label on the page, including button text and
form placeholders, updates instantly. Your choice is remembered for next time.

## 🧑‍💻 Author

**Priyajit Paul** — [GitHub](https://github.com/priyajitpaul4-cmyk) ·
[LinkedIn](https://www.linkedin.com/in/priyajit-paul-217129417/) ·
priyajitpaul4@gmail.com
