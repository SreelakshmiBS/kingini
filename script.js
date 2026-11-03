/* =========================================================
   EDIT THIS TOP PART — everything personal lives here
   ========================================================= */

const SISTER_NAME = "KINGINI MUTHEEEEEEEEEE.............";

// Photos
const PHOTOS = [
  { src: "assets/photos/photo1.jpg", caption: "blurry, but ours ♡" },
  { src: "assets/photos/photo2.jpg", caption: "നമ്മൾ രണ്ടും" },
  { src: "assets/photos/photo3.jpg", caption: "matching bangles, obviously" },
  { src: "assets/photos/photo4.jpg", caption: "എന്റെ സ്വന്തം ♡" },
  { src: "assets/photos/photo5.jpeg", caption: "Holding hands......" },
];

// Keep only ONE Spotify song
const SONGS = [
  { title: "Our song", id: "0uSm1jxEdJP1mZlXnIy8Jy" },
];

// Navarasam photos (put these files in assets/photos/)
const RASAS = [
  { src: "assets/photos/photonava1.jpeg", name: "ശൃംഗാരം", en: "love" },
  { src: "assets/photos/photonava2.jpeg", name: "ശാന്തം", en: "peace" },
  { src: "assets/photos/photonava3.jpeg", name: "ബീഭത്സം", en: "disgust" },
  { src: "assets/photos/photonava4.jpeg", name: "ഭയാനകം", en: "fear" },
  { src: "assets/photos/photonava5.jpeg", name: "അദ്ഭുതം", en: "wonder" },
  { src: "assets/photos/photonava6.jpeg", name: "ഹാസ്യം", en: "laughter" },
  { src: "assets/photos/photonava7.jpeg", name: "Thamburaanariyam!!", en: "pathos" },
  { src: "assets/photos/photonava8.jpeg", name: "blaaaaaaaa blaa", en: "fury" },
  { src: "assets/photos/photonava9.jpeg", name: "@#$&#*@(@#)", en: "valour" },
];

// Your birthday video
const VIDEO = {
  title: "A little something for you ♡",
  src: "assets/videos/sister-video.mp4"
};

const MEMORY_NOTES = [
  "You're annoying. I'd still pick you every single time.",
  "ഒരുപാട് സ്നേഹം, എന്റെ പൊന്ന. 🌸",
  "Life is more fun with you around. Don't let it get to your head.",
  "Some of my favourite memories have you in them. So do some of my worst photos.",
  "നിന്റെ ചിരി മതി, ദിവസം നന്നാവാൻ(3g).",
  "You're my forever favourite person. (Yes, even today.)",
  "ഞാൻ ഉണ്ട് കൂടെ, എപ്പോഴും(നോക്കി ഇരുന്നോ). ♡",
];

const SECRET_MESSAGE =
`എന്റെ ചക്കര പൊന്ന......

പിറന്നാൾ ആശംസകൾ, എന്റെ പൊന്ന. ♡`;

const FINAL_MESSAGE = "Happy Birthday to my favourite person. Here's to more memories, more laughter and a lifetime of being sisters. ♡\n\nപിറന്നാൾ ആശംസകൾ, എന്റെ പൊന്നേ! ഒരുപാട് സ്നേഹം 🌸";


/* =========================================================
   CODE — you shouldn't need to change anything below
   ========================================================= */

const $ = s => document.querySelector(s);

const el = (t, c, h) => {
  const e = document.createElement(t);
  if (c) e.className = c;
  if (h) e.innerHTML = h;
  return e;
};

const esc = s => s.replace(/[&<>"]/g, c => ({
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
}[c]));


/* Opening */

$("#sisterName").innerHTML = Array.from(SISTER_NAME)
  .map((c, i) =>
    `<span class="lt" style="animation-delay:${i * .12}s">${c === " " ? "&nbsp;" : esc(c)}</span>`
  ).join("");

document.title = `Happy Birthday, ${SISTER_NAME}`;

$("#openBtn").addEventListener("click", () => {
  $("#envelope").classList.add("open");
  $("#openBtn").disabled = true;

  setTimeout(() => {
    $("#intro").classList.add("gone");
    $("#main").hidden = false;

    setTimeout(() => {
      $("#intro").style.display = "none";
      window.scrollTo({ top: 0 });
    }, 900);

  }, 1700);
});


/* Photos */

const scrap = $("#scrap");

PHOTOS.forEach((p, i) => {

  const rot = [-4, 3, -2, 5, -5, 2, -3, 4][i % 8];

  const b = el("button", "polaroid");
  b.style.setProperty("--r", rot + "deg");
  b.setAttribute("aria-label", "Open photo: " + p.caption);

  const tape = el("span", "tape");
  tape.style.setProperty("--t", (-rot * 2) + "deg");

  const img = new Image();
  img.loading = "lazy";
  img.alt = p.caption;
  img.src = p.src;

  img.onerror = () =>
    img.replaceWith(el("div", "empty", "add photo ♡"));

  const st = el("span", "sticker",
    ["🌸", "🌼", "🎀", "🌷", "⭐", "🌻"][i % 6]
  );

  b.append(tape, st, img, el("span", "cap", esc(p.caption)));

  b.addEventListener("click", () => {
    if (!b.querySelector("img")) return;

    $("#lbImg").src = p.src;
    $("#lbImg").alt = p.caption;
    $("#lbCap").textContent = p.caption;

    $("#lightbox").hidden = false;
    $("#lbClose").focus();
  });

  scrap.append(b);
});

const closeLb = () => {
  $("#lightbox").hidden = true;
};

$("#lbClose").addEventListener("click", closeLb);

$("#lightbox").addEventListener("click", e => {
  if (e.target.id === "lightbox") closeLb();
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLb();
});


/* =========================================================
   MUSIC: ONE SPOTIFY SONG + VIDEO
   ========================================================= */

const controllers = [];

let spotifyAPI = null;
let apiQueue = [];
let videoPlayer = null;

window.onSpotifyIframeApiReady = api => {
  spotifyAPI = api;
  apiQueue.forEach(f => f());
  apiQueue = [];
};

const apiScript = el("script");
apiScript.src = "https://open.spotify.com/embed/iframe-api/v1";
apiScript.async = true;

document.head.append(apiScript);


/* Spotify player */

SONGS.forEach((s, i) => {

  const card = el("div", "tape-card");

  card.style.setProperty("--r", "-1.5deg");

  card.innerHTML = `
    <div class="label">
      <span class="reel"></span>
      <span class="reel"></span>
    </div>

    <h3>${esc(s.title)}</h3>

    <p class="status" aria-live="polite">Ready</p>

    <button class="btn" type="button">▶ Play</button>

    <div class="embed">
      <div id="sp${i}"></div>
    </div>
  `;

  const btn = card.querySelector("button");
  const status = card.querySelector(".status");

  let ctrl = null;
  let fallbackShown = false;

  const setup = () => {

    if (!spotifyAPI || ctrl) return;

    spotifyAPI.createController(
      card.querySelector(`#sp${i}`),

      {
        uri: "spotify:track:" + s.id,
        width: "100%",
        height: 152
      },

      c => {

        ctrl = controllers[i] = c;

        c.addListener("ready", () => {
          status.textContent = "Ready to play";
        });

        c.addListener("playback_update", e => {

          const playing =
            !e.data.isPaused && !e.data.isBuffering;

          card.classList.toggle("playing", playing);

          status.textContent = playing
            ? "Now playing ♡"
            : "Paused";

          btn.textContent = playing
            ? "❚❚ Pause"
            : "▶ Play";

          // Pause video if Spotify starts playing
          if (playing && videoPlayer && !videoPlayer.paused) {
            videoPlayer.pause();
          }

        });

      }
    );
  };

  btn.addEventListener("click", () => {

    // Pause video before playing Spotify
    if (videoPlayer && !videoPlayer.paused) {
      videoPlayer.pause();
    }

    if (ctrl) {
      ctrl.togglePlay();
      return;
    }

    status.textContent = "Loading Spotify...";

    if (spotifyAPI) {
      setup();
    } else {

      apiQueue.push(setup);

      // Fallback to normal Spotify embed
      setTimeout(() => {

        if (!spotifyAPI && !ctrl && !fallbackShown) {

          fallbackShown = true;

          card.querySelector(".embed").innerHTML = `
            <iframe
              src="https://open.spotify.com/embed/track/${encodeURIComponent(s.id)}"
              width="100%"
              height="152"
              frameborder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              title="${esc(s.title)}">
            </iframe>
          `;

          status.textContent =
            "Use the Spotify player below to listen.";

          btn.disabled = true;
          btn.textContent = "Use player below";
        }

      }, 4000);
    }

  });

  $("#tapes").append(card);

});


/* =========================================================
   VIDEO PLAYER
   ========================================================= */

const videoCard = el("div", "tape-card");

videoCard.style.setProperty("--r", "1.5deg");

videoCard.innerHTML = `
  <div class="label">
    <span class="reel"></span>
    <span class="reel"></span>
  </div>

  <h3>${esc(VIDEO.title)}</h3>

  <p class="status" aria-live="polite">
    A little video memory ♡
  </p>

  <div class="video-frame">

    <video
      id="sisterVideo"
      controls
      playsinline
      preload="metadata"
      aria-label="${esc(VIDEO.title)}">

      <source src="${esc(VIDEO.src)}" type="video/mp4">

      Your browser does not support the video tag.

    </video>

  </div>
`;

videoPlayer = videoCard.querySelector("#sisterVideo");

const videoStatus = videoCard.querySelector(".status");

// Video appearance
videoPlayer.style.width = "100%";
videoPlayer.style.display = "block";
videoPlayer.style.borderRadius = "12px";
videoPlayer.style.background = "#211923";
videoPlayer.style.maxHeight = "420px";

// When video starts, pause Spotify
videoPlayer.addEventListener("play", () => {

  controllers.forEach(c => {
    if (c) c.pause();
  });

  videoStatus.textContent = "Playing your video ♡";

  videoCard.classList.add("playing");

});

// When video pauses
videoPlayer.addEventListener("pause", () => {

  videoStatus.textContent = videoPlayer.ended
    ? "Video finished ♡"
    : "Video paused";

  videoCard.classList.remove("playing");

});

// When video finishes
videoPlayer.addEventListener("ended", () => {

  videoStatus.textContent =
    "A memory to keep forever ♡";

  videoCard.classList.remove("playing");

});

// If video cannot load
videoPlayer.addEventListener("error", () => {

  videoStatus.textContent =
    "Video could not be loaded. Check the video file path.";

});

$("#tapes").append(videoCard);


/* =========================================================
   MEMORY JAR
   ========================================================= */

let lastNote = -1;

$("#jarBtn").addEventListener("click", () => {

  const jar = $("#jarSvg");
  const card = $("#jarCard");

  jar.classList.remove("shake");
  void jar.getBoundingClientRect();
  jar.classList.add("shake");

  card.classList.remove("show");

  let n;

  do {
    n = Math.floor(Math.random() * MEMORY_NOTES.length);
  } while (n === lastNote && MEMORY_NOTES.length > 1);

  lastNote = n;

  setTimeout(() => {
    card.textContent = MEMORY_NOTES[n];
    card.classList.add("show");
  }, 700);

});


/* Secret */

$("#secretText").textContent = SECRET_MESSAGE;

$("#secretBtn").addEventListener("click", () => {

  $("#gift").classList.add("open");

  $("#gift .gift-box span").textContent = "♡";

  setTimeout(() => {
    $("#letter").classList.add("show");
  }, 500);

  $("#secretBtn").textContent = "Unlocked ♡";

});


/* =========================================================
   CAKE
   ========================================================= */

const candles = $("#candles");

[75, 120, 165].forEach(x => {

  candles.insertAdjacentHTML("beforeend",

    `<rect
      x="${x - 4}"
      y="72"
      width="8"
      height="38"
      fill="#fffaf0"
      stroke="#b5668a"
      stroke-width="2"/>

     <path
      class="flame"
      d="M${x} 50 q10 12 0 24 q-10 -12 0 -24z"
      fill="#f3b63f"
      stroke="#d9627f"
      stroke-width="1.5"/>`

  );

});


function confetti(n = 70) {

  const cols = [
    "#ffb3d1",
    "#ffd6e7",
    "#c9b6ff",
    "#a8e0ff",
    "#ffe9a8",
    "#b6f0d2"
  ];

  for (let i = 0; i < n; i++) {

    const s = el("span", "", Math.random() > .6 ? "✦" : "");

    s.style.cssText =
      `left:${Math.random() * 100}vw;
       color:${cols[i % 6]};
       font-size:${12 + Math.random() * 12}px;
       animation-duration:${2.5 + Math.random() * 3}s;
       animation-delay:${Math.random()}s;` +
      (s.textContent ? "" :
        `width:9px;height:14px;background:${cols[i % 6]};`);

    $("#confetti").append(s);

    setTimeout(() => s.remove(), 7000);

  }
}


$("#wishBtn").addEventListener("click", () => {

  $(".cake").classList.add("out");

  $("#wishBtn").textContent = "Wish made ♡";

  confetti();

  setTimeout(() => {

    const f = $("#finalMsg");

    f.textContent = FINAL_MESSAGE;
    f.classList.add("show");

  }, 700);

});


/* =========================================================
   EXTRAS: FLOWERS, PETALS, HEART
   ========================================================= */

const FL = [
  "🌸", "🌼", "🌷", "🌻", "🌺", "🪻",
  "🎀", "✨", "💗", "💖", "💕", "🩷"
];

const rnd = a =>
  a[Math.floor(Math.random() * a.length)];


// Falling petals behind everything

for (let i = 0; i < 16; i++) {

  const p = el("span", "", rnd(FL.slice(0, 5)));

  p.style.cssText =
    `left:${Math.random() * 100}%;
     font-size:${14 + Math.random() * 16}px;
     animation-duration:${9 + Math.random() * 9}s;
     animation-delay:${-Math.random() * 14}s;
     --dx:${(Math.random() * 120 - 60) | 0}px`;

  $("#petals").append(p);

}


// Swaying flower rows

document.querySelectorAll(".vine").forEach(v => {

  v.innerHTML = Array.from(v.textContent)
    .map((c, i) =>
      `<span style="animation-delay:${i * .35}s">${c}</span>`
    ).join("");

});


// Flower burst on tap

document.addEventListener("pointerdown", e => {

  if (e.target.closest("input")) return;

  for (let i = 0; i < 6; i++) {

    const b = el("span", "burst", rnd(FL));

    const a = Math.random() * 6.28;
    const d = 40 + Math.random() * 50;

    b.style.cssText =
      `left:${e.clientX}px;
       top:${e.clientY}px;
       --x:${Math.cos(a) * d}px;
       --y:${Math.sin(a) * d}px`;

    document.body.append(b);

    setTimeout(() => b.remove(), 900);

  }

});


// Reveal sections as they scroll in

if ("IntersectionObserver" in window) {

  const io = new IntersectionObserver(es =>
    es.forEach(e => {

      if (e.isIntersecting) {

        e.target.classList.add("in");

        io.unobserve(e.target);

      }

    }), { threshold: .15 });

  document.querySelectorAll(".sec > *:not(.vine)")
    .forEach(n => {

      n.classList.add("rv");
      io.observe(n);

    });

}


// Big heart

const HMSG = [
  [0, "Zero? Rude. Try again."],
  [1, "That's it? I'm hurt. Slightly."],
  [30, "Okay, a start. Keep going."],
  [60, "Now we're talking."],
  [90, "Almost there. Don't you dare stop."],
  [100, "Full heart. I knew it. ഒരുപാട് സ്നേഹം 🌸"]
];

const HC = [
  "#ffe9a8",
  "#b6f0d2",
  "#a8e0ff",
  "#c9b6ff",
  "#ffc4a8",
  "#ff9ec7"
];

const NS = "http://www.w3.org/2000/svg";

const WAVE =
  "M-70 0 q15 -8 30 0" + " t30 0".repeat(14) + " V200 H-70Z";

const mk = (t, a) => {

  const n = document.createElementNS(NS, t);

  for (const k in a) {
    n.setAttribute(k, a[k]);
  }

  return n;

};


const layers = HC.map((c, i) => {

  const g = mk("g", {});

  const p = mk("path", {
    d: WAVE,
    fill: c
  });

  p.style.animationDuration = (2 + i * .6) + "s";

  p.style.animationDirection =
    i % 2 ? "reverse" : "normal";

  g.append(p);

  $("#hlayers").append(g);

  return g;

});


const dots = Array.from({ length: 26 }, () => {

  const d = mk("circle", {
    cx: 10 + Math.random() * 180,
    cy: Math.random() * 168,
    r: 2 + Math.random() * 4,
    fill: rnd(HC.concat("#fff")),
    class: "dot"
  });

  d.style.animationDelay = -Math.random() * 3 + "s";

  $("#hdots").append(d);

  return d;

});


let hv = 0;

function setHeart(v) {

  v = Math.max(0, Math.min(100, v));

  const y = 168 - v * 1.68;

  layers.forEach((g, i) =>
    g.setAttribute("transform", `translate(0,${y + i * 20})`)
  );

  dots.forEach(d =>
    d.style.opacity = +d.getAttribute("cy") > y + 12 ? .9 : 0
  );

  if (v > hv) {

    for (let i = 0; i < 10; i++) {

      const sp = mk("circle", {
        cx: 25 + Math.random() * 150,
        cy: y,
        r: 2 + Math.random() * 5,
        fill: rnd(HC),
        class: "splash"
      });

      sp.style.cssText =
        `--sx:${(Math.random() * 60 - 30) | 0}px;
         --sy:${-30 - Math.random() * 70}px`;

      $("#hdots").append(sp);

      setTimeout(() => sp.remove(), 800);

    }

  }

  const tgt = Math.round(v * .7);

  while (splats.length < tgt) {
    splat(15 + Math.random() * 170, 5 + Math.random() * 150);
  }

  while (splats.length > tgt) {
    splats.pop().remove();
  }

  hv = v;

  $("#hpct").textContent = v + "%";
  $("#hrange").value = v;

  $("#hmsg").textContent =
    HMSG.filter(m => v >= m[0]).pop()[1];

  const full = v === 100;
  const h = $("#bigHeart");

  if (full && !h.classList.contains("full")) {

    confetti(80);

    for (let i = 0; i < 24; i++) {

      setTimeout(() => {

        const f = el("span", "burst", rnd(FL));

        f.style.cssText =
          `left:${15 + Math.random() * 70}vw;
           top:60vh;
           --x:0px;
           --y:${-120 - Math.random() * 140}px`;

        document.body.append(f);

        setTimeout(() => f.remove(), 900);

      }, i * 50);

    }

  }

  h.classList.toggle("full", full);

}

$("#hrange").addEventListener("input", e =>
  setHeart(+e.target.value)
);


/* =========================================================
   MORE LOVE
   ========================================================= */

const HEARTS = [
  "♡", "💗", "💖", "💕", "🩷", "💞"
];

const rise = $("#petals");

function heartRise(n = 1) {

  for (let i = 0; i < n; i++) {

    const h = el("span", "rise", rnd(HEARTS));

    h.style.cssText =
      `left:${Math.random() * 100}%;
       font-size:${16 + Math.random() * 26}px;
       animation-duration:${6 + Math.random() * 7}s;
       --dx:${(Math.random() * 100 - 50) | 0}px`;

    rise.append(h);

    setTimeout(() => h.remove(), 14000);

  }

}

heartRise(10);

setInterval(() => heartRise(1), 900);


// Heart trail while moving a finger or mouse

let lastTrail = 0;

document.addEventListener("pointermove", e => {

  const t = Date.now();

  if (t - lastTrail < 110) return;

  lastTrail = t;

  const h = el("span", "trail", rnd([
    "♡", "💗", "🩷", "✿"
  ]));

  h.style.cssText =
    `left:${e.clientX}px;top:${e.clientY}px`;

  document.body.append(h);

  setTimeout(() => h.remove(), 1000);

});


// Hearts orbiting the big heart

for (let i = 0; i < 10; i++) {

  const o = el("span", "orbit", rnd(HEARTS));

  o.style.cssText =
    `left:${(i % 2 ? 4 : 88) + Math.random() * 6}%;
     top:${14 + i * 8}%;
     animation-delay:${-i * .5}s;
     font-size:${20 + Math.random() * 16}px`;

  $("#heart").append(o);

}


// Love shower on wish and when the heart is full

$("#wishBtn").addEventListener("click", () =>
  heartRise(40)
);

$("#hrange").addEventListener("input", e => {

  if (+e.target.value === 100) {
    heartRise(40);
  }

});


/* =========================================================
   PAINT SPLATS: THE HEART GETS SPLASHED
   ========================================================= */

const SPL = HC.concat(
  "#ff7eb6",
  "#d6a8ff",
  "#ffb3d1"
);

const splats = [];

function splat(x, y, big = 1) {

  const c = rnd(SPL);

  const r = (8 + Math.random() * 14) * big;

  const g = mk("g", {
    class: "splat"
  });

  g.style.transformOrigin = `${x}px ${y}px`;

  g.append(mk("circle", {
    cx: x,
    cy: y,
    r,
    fill: c
  }));

  // Droplets

  for (let i = 0, n = 7 + Math.random() * 5; i < n; i++) {

    const a = Math.random() * 6.28;

    const d = r * (1.3 + Math.random() * 1.2);

    const s = mk("circle", {
      cx: x + Math.cos(a) * d,
      cy: y + Math.sin(a) * d,
      r: (1.5 + Math.random() * 4) * big,
      fill: c,
      class: "sat"
    });

    s.style.cssText =
      `--tx:${-Math.cos(a) * d}px;
       --ty:${-Math.sin(a) * d}px;
       animation-delay:${Math.random() * .12}s`;

    g.append(s);

  }

  // Drips

  for (let i = 0; i < 2; i++) {

    const dx = x + (Math.random() * 2 - 1) * r * .6;

    const dr = mk("rect", {
      x: dx - 1.8,
      y,
      width: 3.6,
      height: 14 + Math.random() * 26,
      rx: 1.8,
      fill: c,
      class: "drip"
    });

    dr.style.transformOrigin = `${dx}px ${y}px`;

    g.append(dr);

  }

  g.append(mk("circle", {
    cx: x - r * .3,
    cy: y - r * .3,
    r: r * .25,
    fill: "#fff",
    opacity: .55
  }));

  $("#hsplats").append(g);

  splats.push(g);

  if (splats.length > 90) {
    splats.shift().remove();
  }

}


// Flying paint drops

function flyDrops(px, py, n = 10) {

  for (let i = 0; i < n; i++) {

    const d = el("span", "drop");

    const a = Math.random() * 6.28;

    const dist = 70 + Math.random() * 150;

    const sz = 6 + Math.random() * 14;

    d.style.cssText =
      `left:${px}px;
       top:${py}px;
       width:${sz}px;
       height:${sz}px;
       background:${rnd(SPL)};
       --x:${Math.cos(a) * dist}px;
       --y:${Math.sin(a) * dist}px`;

    document.body.append(d);

    setTimeout(() => d.remove(), 900);

  }

}


const hs = $("#bigHeart");

function paintAt(e, big) {

  const pt = hs.createSVGPoint();

  pt.x = e.clientX;
  pt.y = e.clientY;

  const p = pt.matrixTransform(
    hs.getScreenCTM().inverse()
  );

  splat(p.x, p.y, big);

  flyDrops(
    e.clientX,
    e.clientY,
    big > 1 ? 12 : 4
  );

  setHeart(hv + (big > 1 ? 4 : 1));

}


let painting = false;
let lastPaint = 0;

hs.addEventListener("pointerdown", e => {

  painting = true;

  paintAt(e, 1.5);

});

hs.addEventListener("pointermove", e => {

  if (painting && Date.now() - lastPaint > 90) {

    lastPaint = Date.now();

    paintAt(e, 1);

  }

});

addEventListener("pointerup", () =>
  painting = false
);

$("#hrange").addEventListener("input", () => {

  const r = hs.getBoundingClientRect();

  flyDrops(
    r.left + r.width / 2,
    r.top + r.height / 2,
    14
  );

});


/* =========================================================
   NAVARASANGAL
   ========================================================= */

RASAS.forEach((r, i) => {
  const b = el("button", "rasa");
  b.style.setProperty("--r", [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5, -1][i % 9] + "deg");
  b.setAttribute("aria-label", "Open photo: " + r.name);

  const img = new Image();
  img.loading = "lazy";
  img.alt = r.name;
  img.src = r.src;
  img.onerror = () => img.replaceWith(el("div", "empty", "add photo ♡"));

  b.append(img, el("span", "cap", esc(r.name)), el("span", "en", esc(r.en)));

  b.addEventListener("click", () => {
    if (!b.querySelector("img")) return;
    $("#lbImg").src = r.src;
    $("#lbImg").alt = r.name;
    $("#lbCap").textContent = r.name + " (" + r.en + ")";
    $("#lightbox").hidden = false;
    $("#lbClose").focus();
  });

  $("#rasas").append(b);
});