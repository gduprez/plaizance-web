/* Script commun à toutes les langues.
   Les textes propres à chaque langue sont lus dans les attributs data-* du HTML
   (ex. #popup[data-offer-label]), afin de ne pas dupliquer ce fichier. */

document.addEventListener("DOMContentLoaded", function () {

  /* ================= MENU MOBILE ================= */
  const burger = document.getElementById("burger");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burger && mobileMenu) {
    burger.addEventListener("click", () => {
      mobileMenu.classList.toggle("active");
      burger.classList.toggle("active");
    });

    // fermeture menu mobile au clic
    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        burger.classList.remove("active");
      });
    });
  }

  /* ================= FORMULAIRE BREVO : TÉLÉPHONE ================= */
  // Écouteur ajouté avant celui du script Brevo (chargé plus tard) : il s'exécute en premier
  // et peut bloquer l'envoi. Le champ vide est géré par Brevo (« champ obligatoire »).
  const sibForm = document.getElementById("sib-form");
  if (sibForm) {
    const phone = sibForm.querySelector('input[name="SMS"]');
    phone.addEventListener("input", () => showPhoneError(phone, false));
    sibForm.addEventListener("submit", e => {
      if (!normalizePhone(sibForm, phone)) {
        e.preventDefault();
        e.stopImmediatePropagation();
        showPhoneError(phone, true);
      }
    });
  }

  /* ================= SÉLECTEUR DE LANGUE ================= */
  // <details> gère l'ouverture sans JS ; on ferme au clic extérieur / Échap.
  document.querySelectorAll(".lang-switch").forEach(details => {
    document.addEventListener("click", e => {
      if (!details.contains(e.target)) details.removeAttribute("open");
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") details.removeAttribute("open");
    });
  });

});

/* ================= POPUP ================= */

const BREVO_SCRIPT = "https://sibforms.com/forms/end-form/build/main.js";
let brevoLoaded = false;

// offerName : "Horizon", "Cap", "Plaizance", "Signature", ou vide pour une simple demande
function openPopup(offerName = "") {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";

  // titre : "Offre : Cap" ou titre générique
  document.getElementById("popup-title").innerText =
    offerName ? popup.dataset.offerLabel + offerName : popup.dataset.title;

  openBrevoForm(offerName);
}

function openBrevoForm(offerName) {
  // repartir d'un formulaire propre (masqué par Brevo après un envoi réussi)
  document.getElementById("sib-container").style.display = "";
  document.querySelectorAll("#popup .sib-form-message-panel--active")
    .forEach(panel => panel.classList.remove("sib-form-message-panel--active"));
  document.getElementById("popup").querySelector(".popup-content").scrollTop = 0;

  // pré-cocher l'offre choisie (aucune pour une demande de rappel)
  document.querySelectorAll('#sib-form input[name="FORFAIT_PLAIZANCE[]"]').forEach(box => {
    const checked = box.value === offerName;
    if (box.checked !== checked) {
      box.checked = checked;
      box.dispatchEvent(new Event("change", { bubbles: true })); // informe le script Brevo
    }
  });

  prefillHomePort();

  // le script Brevo (~460 Ko) n'est chargé qu'à la première ouverture du popup
  if (!brevoLoaded) {
    brevoLoaded = true;
    const script = document.createElement("script");
    script.src = BREVO_SCRIPT;
    document.body.appendChild(script);
  }
}

/* ================= PORT D'ATTACHE (carte des ports) ================= */

// Ville choisie sur la carte des ports (bouton « Choisir mon offre », js/ports-map.js).
// Gardée en mémoire le temps de la visite de la page : ni cookie, ni stockage.
let homePort = "";
let homePortFilled = ""; // dernière valeur écrite automatiquement dans le champ

function rememberHomePort(city) {
  homePort = city;
}

// Préremplit « Port d'attache » avec la ville choisie, sans écraser une saisie du visiteur.
function prefillHomePort() {
  const field = document.querySelector('#sib-form input[name="PORT_D_ATTACHE"]');
  if (!field || !homePort) return;
  if (field.value !== "" && field.value !== homePortFilled) return; // saisi à la main
  field.value = homePort;
  homePortFilled = homePort;
  field.dispatchEvent(new Event("input", { bubbles: true })); // informe le script Brevo
}

// Nettoie le numéro (espaces, points, tirets, 0 initial) et vérifie son format.
// Renvoie false si le numéro saisi est invalide (un champ vide est laissé à Brevo).
function normalizePhone(form, phone) {
  let digits = phone.value.replace(/[\s.\-()]/g, "");
  if (!digits) return true;
  const code = form.querySelector('[name="SMS__COUNTRY_CODE"]').value;
  if (code !== "+39") digits = digits.replace(/^0/, ""); // en Italie le 0 fait partie du numéro
  if (!/^\d{6,14}$/.test(digits)) return false;
  phone.value = digits;
  return true;
}

function showPhoneError(phone, show) {
  const entry = phone.closest(".form__entry");
  const error = entry.querySelector(".entry__error");
  entry.classList.toggle("entry_errored", show);
  error.innerText = show ? error.dataset.invalid : "";
  error.style.display = show ? "block" : "none";
}

// Après l'envoi, le script Brevo appelle window.scrollTo() pour montrer son message :
// avec le formulaire dans un popup, cela fait défiler la page derrière au lieu du popup.
// Tant que le popup est ouvert, on redirige ce défilement vers le message (ou le premier
// champ en erreur) à l'intérieur du popup.
const nativeScrollTo = window.scrollTo.bind(window);
window.scrollTo = function (...args) {
  const popup = document.getElementById("popup");
  if (popup && popup.style.display === "flex") {
    setTimeout(revealFormFeedback, 50); // laisse Brevo afficher le message d'abord
    return;
  }
  return nativeScrollTo(...args);
};

function revealFormFeedback() {
  const popup = document.getElementById("popup");
  const target = popup.querySelector(".sib-form-message-panel--active, .entry_errored");
  if (!target) return;
  // le popup peut défiler à deux niveaux selon l'écran (.popup sur mobile, .popup-content sinon)
  [popup.querySelector(".popup-content"), popup].forEach(box => {
    if (box.scrollHeight <= box.clientHeight) return;
    const offset = target.getBoundingClientRect().top - box.getBoundingClientRect().top;
    box.scrollTo({ top: box.scrollTop + offset - 20, behavior: "smooth" });
  });
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
