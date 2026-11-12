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

function openPopup(offerName = "") {
  const popup = document.getElementById("popup");
  popup.style.display = "flex";

  // changer le titre
  if (offerName) {
    const label = popup.dataset.offerLabel || "";
    document.getElementById("popup-title").innerText = label + offerName;
  }

  // vider le container (sinon le formulaire est dupliqué)
  const formContainer = document.getElementById("hubspot-form");
  formContainer.innerHTML = "";

  // recréer le formulaire à chaque ouverture
  hbspt.forms.create({
    portalId: "9025931",
    formId: popup.dataset.hubspotFormId,
    region: "na1",
    target: "#hubspot-form"
  });
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}
