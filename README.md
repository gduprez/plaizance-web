# www.plaizance.com

Site vitrine de **Plaizance**, service de conciergerie nautique connectée : surveillance, entretien et préparation de bateau.

## Structure

- [index.html](index.html) — page d'accueil (services, offres, contact, à propos)
- [mentions-legales.html](mentions-legales.html) — mentions légales
- [politique-confidentialite.html](politique-confidentialite.html) — politique de confidentialité
- [en/](en/) — version anglaise (`index.html`, `legal-notice.html`, `privacy-policy.html`)
- [styles.css](styles.css) — feuille de style commune à toutes les langues
- [js/main.js](js/main.js) — script commun (menu mobile, sélecteur de langue, popup)
- [js/contact-form.js](js/contact-form.js) — formulaire de contact Brevo, commun à toutes les langues (textes traduits dans `CONTACT_FORM_I18N`)
- [js/ports-map.js](js/ports-map.js) — carte des ports d'intervention (lit la liste des ports écrite dans le HTML ; textes traduits dans `PORTS_MAP_I18N`)
- [vendor/leaflet/](vendor/leaflet/) — copie locale de Leaflet 1.9.4 (bibliothèque de carte)
- [images/](images/) — logos, photos, visuels ; drapeaux dans [images/flags/](images/flags/)

## Langues

Le français est à la racine, chaque autre langue a son propre répertoire (`/en/`, …).
Les pages d'une langue référencent les ressources partagées en relatif (`../styles.css`, `../images/`, `../js/main.js`).

Pour ajouter une langue (ex. espagnol, code `es`) :

1. Ajouter le drapeau `images/flags/es.svg`.
2. Créer `es/` avec les pages traduites (copier `en/` comme base, mettre `<html lang="es">`).
3. Dans **toutes** les pages, ajouter :
   - la balise `<link rel="alternate" hreflang="es" href="…">` dans le `<head>` ;
   - une entrée `<li>` dans le menu `.lang-switch` (desktop) et dans `.mobile-lang` (mobile).
4. Formulaire de contact : créer le formulaire dans Brevo (mêmes attributs de contact), puis ajouter
   la langue dans `CONTACT_FORM_I18N` de [js/contact-form.js](js/contact-form.js) avec son adresse `action`
   (à prendre dans le code d'intégration HTML Brevo) et les textes traduits.
5. Carte des ports : ajouter la langue dans `PORTS_MAP_I18N` de [js/ports-map.js](js/ports-map.js) et recopier la liste des ports (`#ports-list`) dans la nouvelle page.

## Formulaire de contact (Brevo)

Le popup de contact contient un formulaire Brevo généré par [js/contact-form.js](js/contact-form.js),
à partir d'une version allégée du code d'intégration HTML de Brevo (pas besoin de recoller ce code dans les pages).

- Le script Brevo (`sibforms.com/.../main.js`, ~460 Ko) n'est chargé qu'à la première ouverture du popup.
- Le style est dans `styles.css` (la feuille de style Brevo n'est pas utilisée).
- Le champ téléphone n'utilise pas le composant Brevo : il est vérifié et nettoyé par [js/main.js](js/main.js).
- Si un champ est ajouté dans Brevo, l'ajouter aussi dans le modèle de `js/contact-form.js`
  (même `name` que dans le code d'intégration Brevo).

## Carte des ports

La section « Nos ports d'intervention » est générée par [js/ports-map.js](js/ports-map.js) (Leaflet, fond Plan IGN).

- **La liste des ports est écrite en HTML dans chaque page** ([index.html](index.html) et [en/index.html](en/index.html),
  bloc `#ports-list`), pour être indexée sans exécuter de JavaScript. Le script la lit pour placer les repères.
- **Ajouter ou modifier un port** : éditer son `<li data-lat="…" data-lng="…">` **dans les deux pages**
  (ville dans le `<button>`, partenaire éventuel dans le `<span>`), sous la bonne façade.
- Leaflet et les fonds de carte ne sont chargés qu'à l'approche de la section.
  Pour un chargement immédiat, appeler `loadLeaflet()` directement à la place de l'`IntersectionObserver`.
- Le bouton « Choisir mon offre » d'une fiche mémorise la ville (`rememberHomePort()` dans [js/main.js](js/main.js))
  et préremplit le champ « Port d'attache » du formulaire de contact.
- Sur écran tactile, un doigt fait défiler la page ; la carte se déplace à deux doigts.
- Mise à jour de Leaflet : remplacer `leaflet.js`, `leaflet.css` et `images/` dans [vendor/leaflet/](vendor/leaflet/)
  par ceux du dossier `dist/` de la nouvelle version.

## Stack

Site statique en HTML/CSS, sans build. Police Montserrat chargée depuis Google Fonts.

## Développement local

Ouvrir [index.html](index.html) directement dans un navigateur, ou servir le dossier :

```sh
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Déploiement

Publier les fichiers à la racine du serveur web servant `www.plaizance.com`.
