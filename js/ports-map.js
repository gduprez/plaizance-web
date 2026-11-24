/* Carte des ports d'intervention (Leaflet), commune à toutes les langues.
 *
 * Ajouter / modifier un port : éditer uniquement la liste PORTS ci-dessous.
 * La carte ET la liste repliable sous la carte sont générées à partir de cette liste.
 *
 * Ajouter une langue : ajouter ses textes dans PORTS_MAP_I18N et dans ZONES
 * (clé = <html lang="...">). Le titre et l'introduction sont dans le HTML de chaque page.
 *
 * Leaflet (vendor/leaflet/, ~160 Ko) et les fonds de carte IGN ne sont chargés
 * que lorsque le visiteur approche de la section.
 *
 * Le bouton « Choisir mon offre » d'une fiche appelle rememberHomePort() (js/main.js),
 * qui préremplit le champ « Port d'attache » du formulaire de contact.
 */

// zone : clé de ZONES. partenaire : "" si aucun partenaire à afficher.
const PORTS = [
  // Manche
  { ville: "Fécamp",                 partenaire: "MG Nautic",                         zone: "manche",       lat: 49.760, lng:  0.370 },
  { ville: "Saint-Vaast-la-Hougue",  partenaire: "Cherbourg Plaisance",               zone: "manche",       lat: 49.588, lng: -1.266 },
  { ville: "Cherbourg",              partenaire: "Cherbourg Plaisance",               zone: "manche",       lat: 49.648, lng: -1.620 },
  { ville: "Diélette",               partenaire: "Cherbourg Plaisance",               zone: "manche",       lat: 49.555, lng: -1.859 },
  { ville: "Carteret",               partenaire: "Cherbourg Plaisance",               zone: "manche",       lat: 49.376, lng: -1.791 },
  { ville: "Saint-Cast-le-Guildo",   partenaire: "Fil Marine",                        zone: "manche",       lat: 48.638, lng: -2.247 },

  // Atlantique
  { ville: "Brest",                  partenaire: "Naviouest",                         zone: "atlantique",   lat: 48.382, lng: -4.485 },
  { ville: "Combrit–Sainte-Marine",  partenaire: "Sur les flots",                     zone: "atlantique",   lat: 47.875, lng: -4.117 },
  { ville: "Arradon (Vannes)",       partenaire: "Le Blan Marine",                    zone: "atlantique",   lat: 47.616, lng: -2.820 },
  { ville: "Pornichet",              partenaire: "KER Nautic Services",               zone: "atlantique",   lat: 47.258, lng: -2.348 },
  { ville: "Hendaye",                partenaire: "Bateaux Basques",                   zone: "atlantique",   lat: 43.370, lng: -1.782 },

  // Méditerranée
  { ville: "Canet-en-Roussillon",    partenaire: "",                                  zone: "mediterranee", lat: 42.702, lng:  3.035 },
  { ville: "Port Leucate",           partenaire: "AB Yachting",                       zone: "mediterranee", lat: 42.864, lng:  3.042 },
  { ville: "Sète",                   partenaire: "SAS Grace",                         zone: "mediterranee", lat: 43.398, lng:  3.706 },
  { ville: "Port Camargue",          partenaire: "Lion Yachting",                     zone: "mediterranee", lat: 43.524, lng:  4.128 },
  { ville: "Fos-sur-Mer",            partenaire: "Côte Bleue Plaisance",              zone: "mediterranee", lat: 43.429, lng:  4.945 },
  { ville: "Saint-Cyr-sur-Mer",      partenaire: "ND Plaisance / Boat Club Madrague", zone: "mediterranee", lat: 43.170, lng:  5.695 },
  { ville: "Bandol",                 partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.135, lng:  5.752 },
  { ville: "Sanary-sur-Mer",         partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.117, lng:  5.800 },
  { ville: "Six-Fours-les-Plages",   partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.100, lng:  5.810 },
  { ville: "Les Embiez",             partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.079, lng:  5.783 },
  { ville: "Saint-Mandrier-sur-Mer", partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.079, lng:  5.927 },
  { ville: "Toulon",                 partenaire: "Edouard Rohart FreeSpi",            zone: "mediterranee", lat: 43.119, lng:  5.933 },
  { ville: "Port Grimaud",           partenaire: "LC Yachting",                       zone: "mediterranee", lat: 43.272, lng:  6.580 },
  { ville: "Fréjus",                 partenaire: "Selestiboat",                       zone: "mediterranee", lat: 43.421, lng:  6.748 },

  // Corse
  { ville: "Ajaccio",                partenaire: "Motorship Nautique",                zone: "corse",        lat: 41.919, lng:  8.742 },
  { ville: "Propriano",              partenaire: "Motorship Nautique",                zone: "corse",        lat: 41.677, lng:  8.900 },

  // Lacs
  { ville: "Aix-les-Bains",          partenaire: "",                                  zone: "lacs",         lat: 45.703, lng:  5.887 }
];

// Façades, dans l'ordre d'affichage de la liste
const ZONES = [
  { cle: "manche",       fr: "Manche",       en: "English Channel" },
  { cle: "atlantique",   fr: "Atlantique",   en: "Atlantic" },
  { cle: "mediterranee", fr: "Méditerranée", en: "Mediterranean" },
  { cle: "corse",        fr: "Corse",        en: "Corsica" },
  { cle: "lacs",         fr: "Lacs",         en: "Lakes" }
];

const PORTS_MAP_I18N = {
  fr: {
    partner: "Partenaire : ",
    choose: "Choisir mon offre",
    showAll: "Afficher tous les ports",
    zoomIn: "Agrandir la carte",
    zoomOut: "Réduire la carte",
    markerLabel: "Afficher la fiche de ",
    twoFingers: "Utilisez deux doigts pour déplacer la carte",
    loadError: "La carte n’a pas pu être chargée. La liste des ports reste disponible ci-dessous."
  },
  en: {
    partner: "Partner: ",
    choose: "Choose my plan",
    showAll: "Show all ports",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    markerLabel: "Show details for ",
    twoFingers: "Use two fingers to move the map",
    loadError: "The map could not be loaded. The list of ports is still available below."
  }
};

(function portsMap() {
  const mapEl = document.getElementById("ports-map");
  const listEl = document.getElementById("ports-list");
  if (!mapEl) return;

  const lang = document.documentElement.lang in PORTS_MAP_I18N ? document.documentElement.lang : "fr";
  const t = PORTS_MAP_I18N[lang];

  // dossier de Leaflet, relatif à ce script (fonctionne depuis / comme depuis /en/)
  const LEAFLET_DIR = new URL("../vendor/leaflet/", document.currentScript.src).href;

  let carte = null;          // instance Leaflet, créée au premier besoin
  let leafletPromise = null;
  const reperes = new Map(); // port -> repère Leaflet

  /* ================= LISTE REPLIABLE ================= */

  if (listEl) {
    for (const zone of ZONES) {
      const ports = PORTS.filter(p => p.zone === zone.cle);
      if (!ports.length) continue;

      const groupe = document.createElement("div");
      groupe.className = "ports-list__zone";
      const titre = document.createElement("h3");
      titre.textContent = zone[lang] || zone.fr;
      const ul = document.createElement("ul");

      for (const port of ports) {
        const li = document.createElement("li");
        const bouton = document.createElement("button");
        bouton.type = "button";
        bouton.textContent = port.ville;
        bouton.addEventListener("click", () => showPort(port));
        li.append(bouton);
        if (port.partenaire) {
          const partenaire = document.createElement("span");
          partenaire.textContent = port.partenaire;
          li.append(partenaire);
        }
        ul.append(li);
      }
      groupe.append(titre, ul);
      listEl.append(groupe);
    }
  }

  /* ================= CHARGEMENT DIFFÉRÉ DE LEAFLET ================= */

  function loadLeaflet() {
    if (!leafletPromise) {
      leafletPromise = new Promise((resolve, reject) => {
        const css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = LEAFLET_DIR + "leaflet.css";
        const js = document.createElement("script");
        js.src = LEAFLET_DIR + "leaflet.js";
        js.onload = resolve;
        js.onerror = reject;
        document.head.append(css, js);
      }).then(initMap).catch(() => {
        mapEl.classList.add("ports-map--error");
        mapEl.textContent = t.loadError;
      });
    }
    return leafletPromise;
  }

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(e => e.isIntersecting)) {
        observer.disconnect();
        loadLeaflet();
      }
    }, { rootMargin: "600px 0px" }); // commence à charger un peu avant que la carte soit visible
    observer.observe(mapEl);
  } else {
    loadLeaflet();
  }

  /* ================= CARTE ================= */

  function initMap() {
    // Écran tactile : un doigt fait défiler la page, deux doigts déplacent / zooment la carte
    const tactile = window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    // zoomSnap 0.5 : cadrage plus serré sur les ports qu'avec des niveaux de zoom entiers
    carte = L.map(mapEl, { scrollWheelZoom: false, zoomControl: false, dragging: !tactile, zoomSnap: 0.5 })
      .setView([46.5, 2.5], 6);

    // Fond Plan IGN (Géoplateforme) : gratuit, sans clé
    L.tileLayer(
      "https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0" +
      "&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&FORMAT=image/png" +
      "&TILEMATRIXSET=PM&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
      { className: "ports-map__fond", maxZoom: 19, attribution: 'Plan IGN &copy; <a href="https://www.ign.fr/">IGN</a>' }
    ).addTo(carte);

    L.control.zoom({ zoomInTitle: t.zoomIn, zoomOutTitle: t.zoomOut }).addTo(carte);

    const icone = L.divIcon({
      className: "ports-map__repere", iconSize: [44, 44], iconAnchor: [22, 41], popupAnchor: [0, -37],
      html: '<svg viewBox="0 0 32 40" aria-hidden="true"><path d="M16 1.5C8 1.5 2 7.5 2 15c0 9 10 18 14 23.5C20 33 30 24 30 15c0-7.5-6-13.5-14-13.5Z" fill="currentColor" stroke="white" stroke-width="2"/><circle cx="16" cy="15" r="4.5" fill="white"/></svg>'
    });

    const groupe = L.featureGroup().addTo(carte);

    for (const port of PORTS) {
      const repere = L.marker([port.lat, port.lng], { icon: icone, title: port.ville, riseOnHover: true })
        .addTo(groupe)
        .bindPopup(() => fichePort(port), {
          minWidth: 190, maxWidth: 250,
          autoPanPaddingTopLeft: [64, 12], autoPanPaddingBottomRight: [12, 12] // ne passe pas sous les boutons de zoom
        });

      repere.getElement().setAttribute("aria-label", t.markerLabel + port.ville);
      repere.on("popupopen", () => {
        repere.getElement().classList.add("est-selectionne");
        repere.setZIndexOffset(1000);
      });
      repere.on("popupclose", () => {
        repere.getElement().classList.remove("est-selectionne");
        repere.setZIndexOffset(0);
      });
      reperes.set(port, repere);
    }

    function afficherTousLesPorts() {
      carte.closePopup();
      carte.fitBounds(groupe.getBounds(), { paddingTopLeft: [28, 46], paddingBottomRight: [28, 12], maxZoom: 13 });
    }
    afficherTousLesPorts();

    // bouton « afficher tous les ports »
    const controle = L.control({ position: "topleft" });
    controle.onAdd = function () {
      const cadre = L.DomUtil.create("div", "leaflet-bar");
      const bouton = L.DomUtil.create("button", "ports-map__recentrage", cadre);
      bouton.type = "button";
      bouton.textContent = "⌖";
      bouton.title = t.showAll;
      bouton.setAttribute("aria-label", t.showAll);
      L.DomEvent.disableClickPropagation(cadre);
      bouton.addEventListener("click", afficherTousLesPorts);
      return cadre;
    };
    controle.addTo(carte);

    if (tactile) twoFingersHint();
  }

  // Contenu de la fiche d'un port : ville, partenaire éventuel, bouton « Choisir mon offre »
  function fichePort(port) {
    const fiche = document.createElement("div");
    fiche.className = "ports-map__fiche";

    const titre = document.createElement("strong");
    titre.textContent = port.ville;
    fiche.append(titre);

    if (port.partenaire) {
      const detail = document.createElement("p");
      detail.textContent = t.partner + port.partenaire;
      fiche.append(detail);
    }

    const bouton = document.createElement("button");
    bouton.type = "button";
    bouton.className = "ports-map__choisir";
    bouton.textContent = t.choose;
    bouton.addEventListener("click", () => {
      // mémorise la ville pour le champ « Port d'attache » du formulaire (js/main.js)
      if (typeof rememberHomePort === "function") rememberHomePort(port.ville);
      carte.closePopup();
      const offres = document.getElementById("offres");
      if (offres) offres.scrollIntoView({ behavior: "smooth", block: "start" });
    });
    fiche.append(bouton);

    return fiche;
  }

  // Clic sur un port de la liste : montre la carte et ouvre la fiche du port
  function showPort(port) {
    loadLeaflet().then(() => {
      const repere = reperes.get(port);
      if (!repere) return;
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
      carte.setView([port.lat, port.lng], Math.max(carte.getZoom(), 10), { animate: false });
      repere.openPopup();
    });
  }

  // Message affiché quand le visiteur tente de déplacer la carte avec un seul doigt
  function twoFingersHint() {
    const message = document.createElement("div");
    message.className = "ports-map__hint";
    message.textContent = t.twoFingers;
    message.setAttribute("aria-hidden", "true");
    mapEl.append(message);

    let timer = null;
    mapEl.addEventListener("touchmove", e => {
      if (e.touches.length !== 1) return;
      if (e.target.closest(".leaflet-popup, .leaflet-control")) return;
      mapEl.classList.add("ports-map--hint");
      clearTimeout(timer);
      timer = setTimeout(() => mapEl.classList.remove("ports-map--hint"), 1200);
    }, { passive: true });
    mapEl.addEventListener("touchstart", e => {
      if (e.touches.length > 1) mapEl.classList.remove("ports-map--hint");
    }, { passive: true });
  }
})();
