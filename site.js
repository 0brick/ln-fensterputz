// Shared behaviour for the statically generated local-SEO pages
// (scripts/generate-pages.mjs). Mirrors what the Vue app does on the homepage:
// - reveal-on-scroll (src/directives/reveal.js)
// - mobile nav burger toggle (src/components/AppNav.vue)
// - contact form submit + PLZ autofill (src/components/sections/ContactSection.vue)
(function () {
  "use strict";

  // --- reveal on scroll ---
  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (prefersReducedMotion) {
    revealEls.forEach(function (el) {
      el.classList.add("reveal", "is-visible");
    });
  } else if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach(function (el) {
      el.classList.add("reveal");
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("reveal", "is-visible");
    });
  }

  // --- mobile nav burger ---
  var burger = document.querySelector(".burger");
  var mobileMenu = document.getElementById("mobile-menu");
  if (burger && mobileMenu) {
    burger.addEventListener("click", function () {
      var open = mobileMenu.classList.toggle("is-open");
      burger.setAttribute("aria-expanded", String(open));
      burger.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    });
    mobileMenu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        mobileMenu.classList.remove("is-open");
        burger.setAttribute("aria-expanded", "false");
        burger.setAttribute("aria-label", "Menü öffnen");
      });
    });
  }

  // --- contact form ---
  var STATICFORMS_API_KEY = "sf_9caf363f9a44f41fd6c58c8b";
  var STATICFORMS_URL = "https://api.staticforms.dev/submit";

  var form = document.querySelector(".contact-form");
  if (!form) return;

  var zipInput = form.querySelector("#cf-zip");
  var cityInput = form.querySelector("#cf-city");
  var cityAutoFilled = false;
  var plzLookupController = null;

  if (zipInput && cityInput) {
    cityInput.addEventListener("input", function () {
      cityAutoFilled = false;
    });

    zipInput.addEventListener("input", function () {
      var zip = zipInput.value.trim();
      if (!/^\d{5}$/.test(zip)) return;
      if (plzLookupController) plzLookupController.abort();
      plzLookupController = new AbortController();
      fetch("https://api.zippopotam.us/de/" + zip, { signal: plzLookupController.signal })
        .then(function (response) {
          if (!response.ok) return null;
          return response.json();
        })
        .then(function (data) {
          var place = data && data.places && data.places[0] && data.places[0]["place name"];
          if (place && (!cityInput.value || cityAutoFilled)) {
            cityInput.value = place;
            cityAutoFilled = true;
          }
        })
        .catch(function () {
          // Nachschlagen ist nur eine Hilfe, Ort bleibt manuell editierbar
        });
    });
  }

  var submitButton = form.querySelector('button[type="submit"]');
  var successMsg = form.querySelector(".form-status-success");
  var errorMsg = form.querySelector(".form-status-error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    var honeypot = form.querySelector('[name="honeypot"]');
    if (honeypot && honeypot.value) return;

    if (successMsg) successMsg.hidden = true;
    if (errorMsg) errorMsg.hidden = true;
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = "Wird gesendet…";
    }

    var street = form.querySelector("#cf-street").value;
    var houseNumber = form.querySelector("#cf-house-number").value;
    var zip = form.querySelector("#cf-zip").value;
    var city = form.querySelector("#cf-city").value;
    var address = (street + " " + houseNumber + ", " + zip + " " + city).trim();

    fetch(STATICFORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        apiKey: STATICFORMS_API_KEY,
        subject: "Terminanfrage über die Website",
        replyTo: "@",
        name: form.querySelector("#cf-name").value,
        email: form.querySelector("#cf-email").value,
        phone: form.querySelector("#cf-phone").value,
        address: address,
        message: form.querySelector("#cf-message").value,
        honeypot: honeypot ? honeypot.value : "",
      }),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data && data.success) {
          if (successMsg) successMsg.hidden = false;
          form.reset();
        } else if (errorMsg) {
          errorMsg.hidden = false;
        }
      })
      .catch(function () {
        if (errorMsg) errorMsg.hidden = false;
      })
      .finally(function () {
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.textContent = "Termin anfragen";
        }
      });
  });
})();
