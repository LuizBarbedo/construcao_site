/* ==========================================================================
   Teorema Concursos — comportamento
   Sem dependências. Cada bloco falha em silêncio se a página não o usa.
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ nav */
  var nav = document.querySelector("[data-nav]");
  var burger = document.querySelector("[data-burger]");
  var links = document.querySelector("[data-nav-links]");

  if (burger && links) {
    burger.addEventListener("click", function () {
      var open = links.classList.toggle("is-open");
      burger.classList.toggle("is-open", open);
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  var drops = document.querySelectorAll("[data-drop]");
  Array.prototype.forEach.call(drops, function (drop) {
    var toggle = drop.querySelector("[data-drop-toggle]");
    if (!toggle) return;

    toggle.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = !drop.classList.contains("is-open");
      Array.prototype.forEach.call(drops, function (d) { d.classList.remove("is-open"); });
      drop.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.addEventListener("click", function (e) {
    Array.prototype.forEach.call(drops, function (drop) {
      if (!drop.contains(e.target)) {
        drop.classList.remove("is-open");
        var t = drop.querySelector("[data-drop-toggle]");
        if (t) t.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    Array.prototype.forEach.call(drops, function (d) { d.classList.remove("is-open"); });
    if (links) links.classList.remove("is-open");
    if (burger) burger.classList.remove("is-open");
  });

  /* ------------------------------------------------- header ao rolar */
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle("is-stuck", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ------------------------------------------------------------- questões */
  var quiz = document.querySelector("[data-quiz]");

  if (quiz) {
    var total = quiz.querySelectorAll("[data-q]").length;
    var scoreVal = document.querySelector("[data-score-val]");
    var scoreDone = document.querySelector("[data-score-done]");
    var right = 0;
    var answered = 0;

    var paint = function () {
      if (scoreVal) scoreVal.textContent = String(right);
      if (scoreDone) scoreDone.textContent = answered + "/" + total;
    };

    paint();

    Array.prototype.forEach.call(quiz.querySelectorAll("[data-q]"), function (card) {
      var opts = card.querySelectorAll(".q-opt");
      var feedback = card.querySelector(".q-feedback");

      Array.prototype.forEach.call(opts, function (opt) {
        opt.addEventListener("click", function () {
          if (card.classList.contains("is-answered")) return;
          card.classList.add("is-answered");
          answered += 1;

          var hit = opt.getAttribute("data-correct") === "true";
          if (hit) right += 1;

          Array.prototype.forEach.call(opts, function (o) {
            o.disabled = true;
            if (o.getAttribute("data-correct") === "true") o.classList.add("is-right");
          });
          if (!hit) opt.classList.add("is-wrong");

          if (feedback) feedback.hidden = false;
          paint();
        });
      });
    });
  }

  /* --------------------------------------------------- vídeo (placeholder) */
  Array.prototype.forEach.call(document.querySelectorAll("[data-video]"), function (box) {
    box.addEventListener("click", function () {
      var note = box.querySelector("[data-video-note]");
      if (note) note.textContent = "O player será conectado quando o vídeo da trilha for publicado.";
    });
  });

  /* ------------------------------------------------------- ano do rodapé */
  Array.prototype.forEach.call(document.querySelectorAll("[data-year]"), function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
