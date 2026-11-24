import { useEffect, useReducer, useRef, useState } from "react";
import "./ChopAndCook.css";

const RECIPES = [
  { name: "Carrot soup", need: { "🥕": 4, "🧅": 2 } },
  { name: "Veggie stir-fry", need: { "🥦": 3, "🫑": 2, "🥕": 2 } },
  { name: "Garden salad", need: { "🥒": 3, "🍅": 3, "🥬": 2 } },
];
const VEG = ["🥕", "🧅", "🥦", "🫑", "🥒", "🍅", "🥬", "🥔"];
const JUNK = ["🍩", "🍫"];
const NAMES = {
  "🥕": "carrot", "🧅": "onion", "🥦": "broccoli", "🫑": "pepper",
  "🥒": "cucumber", "🍅": "tomato", "🥬": "lettuce", "🥔": "potato",
};
const MAX_LIVES = 3;
const LEVEL_TIME = 40;
const STORAGE_KEY = "chopCookBest";

let uid = 0;

function readBest() {
  try {
    return parseInt(localStorage.getItem(STORAGE_KEY), 10) || 0;
  } catch (e) {
    return 0;
  }
}

export default function ChopAndCook() {
  const arenaRef = useRef(null);
  const [, force] = useReducer((n) => n + 1, 0);
  const [best, setBest] = useState(readBest);
  const [msg, setMsg] = useState("");
  const [overlay, setOverlay] = useState({
    title: "Ready to chop?",
    text: "Chop the vegetables on your recipe card. You have 3 hearts. Chopping something you do not need, or letting a needed vegetable fall, costs a heart.",
    button: "Start cooking",
  });

  // Mutable game state lives in a ref so the animation loop never goes stale.
  const g = useRef({
    items: [], fx: [], left: { ...RECIPES[0].need },
    level: 0, lives: MAX_LIVES, timeLeft: LEVEL_TIME, total: 0,
    spawnIn: 0, last: 0, raf: 0, running: false, down: false, best: readBest(),
  });
  const s = g.current;

  useEffect(() => () => cancelAnimationFrame(g.current.raf), []);

  function addFx(fx, ms) {
    const id = ++uid;
    s.fx.push({ id, ...fx });
    setTimeout(() => {
      s.fx = s.fx.filter((f) => f.id !== id);
      force();
    }, ms);
  }

  function loadLevel() {
    s.left = { ...RECIPES[s.level].need };
    s.timeLeft = LEVEL_TIME;
    s.items = [];
    s.fx = [];
  }

  function saveBest() {
    if (s.total > s.best) {
      s.best = s.total;
      setBest(s.best);
      try { localStorage.setItem(STORAGE_KEY, String(s.best)); } catch (e) {}
    }
  }

  function finish(win, why) {
    s.running = false;
    cancelAnimationFrame(s.raf);
    s.items = [];
    let next;
    if (win && s.level < RECIPES.length - 1) {
      next = {
        title: RECIPES[s.level].name + " is ready!",
        text: "Prepped with " + Math.ceil(s.timeLeft) + " seconds to spare. Score: " + s.total + ". Next recipe: " + RECIPES[s.level + 1].name + ".",
        button: "Next recipe",
      };
      s.level++;
    } else if (win) {
      next = {
        title: "Menu complete! Score: " + s.total,
        text: "Tip: chopping only what you need to cook, and storing the rest, is how kitchens cut food waste.",
        button: "Play again",
      };
      s.level = 0;
      saveBest();
    } else {
      next = {
        title: (why === "hearts" ? "Out of hearts. Score: " : "Time is up. Score: ") + s.total,
        text: "Tip: read the full recipe first so you only prep what you will use.",
        button: why === "hearts" ? "Play again" : "Try this recipe again",
      };
      if (why === "hearts") s.level = 0;
      saveBest();
    }
    setOverlay(next);
    force();
  }

  function loseLife() {
    s.lives--;
    if (s.lives <= 0) finish(false, "hearts");
  }

  function checkDone() {
    if (Object.values(s.left).some((n) => n > 0)) return;
    s.total += Math.ceil(s.timeLeft) * 2;
    finish(true);
  }

  function pickEmoji() {
    const needed = Object.keys(s.left).filter((k) => s.left[k] > 0);
    const x = Math.random();
    if (x < 0.55 && needed.length) return needed[Math.floor(Math.random() * needed.length)];
    if (x < 0.9) return VEG[Math.floor(Math.random() * VEG.length)];
    return JUNK[Math.floor(Math.random() * JUNK.length)];
  }

  function spawn() {
    const w = arenaRef.current.clientWidth;
    s.items.push({
      id: ++uid, e: pickEmoji(),
      x: 10 + Math.random() * (w - 70), y: -60,
      vy: 90 + Math.random() * 70 + s.level * 25,
      vx: (Math.random() - 0.5) * 50,
    });
  }

  function chop(it) {
    s.items = s.items.filter((i) => i !== it);
    addFx({ kind: "halves", e: it.e, x: it.x, y: it.y }, 650);
    if (s.left[it.e] > 0) {
      s.left[it.e]--;
      s.total += 10;
      addFx({ kind: "pop", text: "+1", color: "#1f9d7a", x: it.x, y: it.y }, 800);
      setMsg("Nice! " + NAMES[it.e] + " chopped.");
      checkDone();
    } else {
      addFx({ kind: "pop", text: "-1 ❤️", color: "#d64545", x: it.x, y: it.y }, 800);
      setMsg("Oops, " + (NAMES[it.e] || "junk food") + " is not in this recipe. That is wasted food.");
      loseLife();
    }
  }

  function hit(px, py) {
    for (let i = s.items.length - 1; i >= 0; i--) {
      const it = s.items[i];
      if (Math.abs(px - (it.x + 25)) < 30 && Math.abs(py - (it.y + 25)) < 30) {
        chop(it);
        return;
      }
    }
  }

  function pointerPos(e) {
    const r = arenaRef.current.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  }

  function frame(t) {
    if (!s.running) return;
    const dt = Math.min(0.05, (t - s.last) / 1000);
    s.last = t;
    const h = arenaRef.current.clientHeight;
    const w = arenaRef.current.clientWidth;

    for (let i = s.items.length - 1; i >= 0; i--) {
      const it = s.items[i];
      it.y += it.vy * dt;
      it.x += it.vx * dt;
      if (it.x < 0 || it.x > w - 50) it.vx *= -1;
      if (it.y > h) {
        const needed = s.left[it.e] > 0;
        s.items.splice(i, 1);
        if (needed) {
          setMsg("You missed a " + NAMES[it.e] + " that the recipe needs.");
          loseLife();
          if (!s.running) return;
        }
      }
    }

    s.spawnIn -= dt;
    if (s.spawnIn <= 0) {
      spawn();
      s.spawnIn = Math.max(0.45, 0.85 - s.level * 0.1);
    }
    s.timeLeft -= dt;
    if (s.timeLeft <= 0) {
      s.timeLeft = 0;
      finish(false, "time");
      return;
    }
    force();
    s.raf = requestAnimationFrame(frame);
  }

  function start() {
    if (s.level === 0 || s.lives <= 0) s.lives = MAX_LIVES;
    if (s.level === 0) s.total = 0;
    loadLevel();
    setMsg("");
    setOverlay(null);
    s.running = true;
    s.last = performance.now();
    s.spawnIn = 0;
    s.raf = requestAnimationFrame(frame);
  }

  const recipe = RECIPES[s.level];

  return (
    <section className="cc">
      <h1 className="cc-title">Chop &amp; Cook</h1>
      <p className="cc-sub">Chop only the vegetables your recipe needs. Swipe or tap to slice.</p>

      <div className="cc-hud" aria-live="polite">
        <span>Level {s.level + 1} of {RECIPES.length}</span>
        <span>Time: <b>{Math.ceil(s.timeLeft)}</b>s</span>
        <span aria-label={s.lives + " hearts left"}>
          {"❤️".repeat(Math.max(0, s.lives)) + "🖤".repeat(MAX_LIVES - Math.max(0, s.lives))}
        </span>
        <span>Best: <b>{best}</b></span>
      </div>

      <div className="cc-recipe">
        <h2>{recipe.name}</h2>
        <div className="cc-need">
          {Object.keys(recipe.need).map((k) => (
            <div key={k} className={s.left[k] === 0 ? "done" : ""}>
              <span className="cc-emoji">{k}</span>
              {recipe.need[k] - s.left[k]}/{recipe.need[k]}
            </div>
          ))}
        </div>
      </div>

      <div
        className="cc-arena"
        ref={arenaRef}
        onPointerDown={(e) => {
          if (!s.running) return;
          s.down = true;
          const [x, y] = pointerPos(e);
          hit(x, y);
        }}
        onPointerMove={(e) => {
          if (!s.running || !s.down) return;
          const [x, y] = pointerPos(e);
          hit(x, y);
        }}
        onPointerUp={() => { s.down = false; }}
        onPointerLeave={() => { s.down = false; }}
        onPointerCancel={() => { s.down = false; }}
      >
        {s.items.map((it) => (
          <div key={it.id} className="cc-fx" style={{ transform: `translate(${it.x}px, ${it.y}px)` }}>
            {it.e}
          </div>
        ))}

        {s.fx.map((f) =>
          f.kind === "halves" ? (
            <div key={f.id} className="cc-fx" style={{ left: f.x, top: f.y }}>
              <span className="cc-half l">{f.e}</span>
              <span className="cc-half r">{f.e}</span>
            </div>
          ) : (
            <div key={f.id} className="cc-pop" style={{ left: f.x, top: f.y, color: f.color }}>
              {f.text}
            </div>
          )
        )}

        {overlay && (
          <div className="cc-cover">
            <h2>{overlay.title}</h2>
            <p>{overlay.text}</p>
            <button type="button" className="cc-go" onClick={start}>{overlay.button}</button>
          </div>
        )}
      </div>

      <p className="cc-msg" aria-live="polite">{msg}</p>
    </section>
  );
}