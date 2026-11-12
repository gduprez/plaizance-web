/* Formulaire de contact Brevo, commun à toutes les langues.
 *
 * Le HTML est une version allégée du code d'intégration Brevo. Les id/classes "sib-*",
 * "form__entry", "entry__*" sont utilisés par le script Brevo (validation, messages,
 * chargement) : ne pas les renommer. Les noms de champs (name="...") sont les attributs
 * de contact Brevo et sont identiques dans toutes les langues.
 *
 * Ajouter une langue : ajouter une entrée dans CONTACT_FORM_I18N (clé = <html lang="...">)
 * avec l'adresse "action" du formulaire Brevo de cette langue.
 *
 * Doit être chargé avant js/main.js (qui gère l'ouverture du popup et le téléphone).
 */

const CONTACT_FORM_I18N = {
  fr: {
    action: "https://54addb8a.sibforms.com/serve/MUIFAH7upIAqTLXgP9ZFxtPF8gIwMOkLizVXagZxrmSv-EW3ndPyWLsH1Nr-knk-R4Xoch4Fw2pyV4ftDoV7KgQko6iLaDZljhVDLm-e7BDcF6Df3FXzUXQKrAGpkx8Ozlzb7_ZXKouMEKkIPJ1tXd5Tr8kPAWF6VnR4wDfwEN3MJh5MGan68dUCBEwurm_b4P4tITddgENchjUlNg==",
    popupTitle: "Demande d'information",
    offerLabel: "Offre : ",
    error: "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer dans quelques instants.",
    success: "Votre demande a bien été envoyée ! Notre équipe vous recontactera dans les meilleurs délais pour vous accompagner dans la mise en place de l'offre sélectionnée.",
    firstName: "Prénom",
    lastName: "Nom",
    email: "E-mail",
    phone: "Téléphone",
    phoneCode: "Indicatif pays",
    phonePlaceholder: "6 12 34 56 78",
    phoneHelp: "Saisissez votre numéro sans le 0 initial.",
    phoneInvalid: "Numéro de téléphone invalide.",
    offer: "Offre souhaitée",
    brand: "Marque du bateau",
    model: "Modèle du bateau",
    year: "Année du bateau",
    multihull: "Multicoque",
    yes: "Oui",
    no: "Non",
    homePort: "Port d'attache",
    optIn: "J'accepte de recevoir les actualités et offres de Plaizance par e-mail.",
    unsubscribe: "Vous pouvez vous désinscrire à tout moment via le lien présent dans nos e-mails.",
    declaration: 'En envoyant ce formulaire, vous acceptez que vos données soient traitées conformément à notre <a href="politique-confidentialite.html" target="_blank">politique de confidentialité</a>. Elles sont collectées via Brevo, qui agit sous notre responsabilité et peut en utiliser certaines pour la sécurité de sa plateforme (<a href="https://www.brevo.com/fr/legal/privacypolicy/" target="_blank" rel="nofollow noopener">politique de confidentialité de Brevo</a>).',
    submit: "Envoyer",
    // messages du script Brevo
    brevo: {
      REQUIRED_CODE_ERROR_MESSAGE: "Veuillez choisir un code pays",
      INVALID: "Certaines informations saisies ne sont pas valides. Veuillez vérifier les champs concernés et réessayer.",
      REQUIRED_ERROR_MESSAGE: "Ce champ est obligatoire.",
      INVALID_DATE: "Veuillez saisir une date valide",
      REQUIRED_MULTISELECT_MESSAGE: "Veuillez choisir au moins une option",
      translation: { selectedList: "{quantity} liste sélectionnée", selectedLists: "{quantity} listes sélectionnées", selectedOption: "{quantity} sélectionné", selectedOptions: "{quantity} sélectionnés" }
    }
  },

  en: {
    action: "https://54addb8a.sibforms.com/serve/MUIFAOFECqqCGehHTk_eYxRYl2KiqRR110e57nv-biug0yPC4AdrpTGl19rb3sO4e_yKZrxipQ3KFmeCoZCM6mi9JyXjTlUFo2B7gFvcxqbXY6UYsSEh1Ui173zmn0oh-ZmpdxNNlT_39RSO50jdZ-XFgePNPAYV_n2b1_U4VJ4b4XiY11_0-cASIwP_rdmKZpuHprD0CroMTUAkxA==",
    popupTitle: "Information request",
    offerLabel: "Plan: ",
    error: "An error occurred while sending your request. Please try again in a few moments.",
    success: "Your request has been successfully sent! Our team will get back to you as soon as possible to help you set up the selected plan.",
    firstName: "First name",
    lastName: "Last name",
    email: "Email",
    phone: "Phone",
    phoneCode: "Country code",
    phonePlaceholder: "6 12 34 56 78",
    phoneHelp: "Enter your number without the leading 0.",
    phoneInvalid: "Invalid phone number.",
    offer: "Plan you are interested in",
    brand: "Boat make",
    model: "Boat model",
    year: "Year built",
    multihull: "Multihull",
    yes: "Yes",
    no: "No",
    homePort: "Home port",
    optIn: "I agree to receive news and offers from Plaizance by email.",
    unsubscribe: "You can unsubscribe at any time using the link in our emails.",
    declaration: 'By submitting this form, you agree that your data will be processed in accordance with our <a href="privacy-policy.html" target="_blank">privacy policy</a>. It is collected via Brevo, which acts on our behalf and may use some of it to keep its platform secure (<a href="https://www.brevo.com/legal/privacypolicy/" target="_blank" rel="nofollow noopener">Brevo privacy policy</a>).',
    submit: "Send",
    brevo: {
      REQUIRED_CODE_ERROR_MESSAGE: "Please choose a country code",
      INVALID: "Some of the information entered is not valid. Please check the relevant fields and try again.",
      REQUIRED_ERROR_MESSAGE: "This field is required.",
      INVALID_DATE: "Please enter a valid date",
      REQUIRED_MULTISELECT_MESSAGE: "Please choose at least one option",
      translation: { selectedList: "{quantity} list selected", selectedLists: "{quantity} lists selected", selectedOption: "{quantity} selected", selectedOptions: "{quantity} selected" }
    }
  }
};

// Indicatifs proposés (valeur envoyée à Brevo, drapeau affiché)
const PHONE_CODES = [
  ["+33", "🇫🇷"], ["+377", "🇲🇨"], ["+32", "🇧🇪"], ["+41", "🇨🇭"], ["+352", "🇱🇺"], ["+39", "🇮🇹"],
  ["+34", "🇪🇸"], ["+44", "🇬🇧"], ["+49", "🇩🇪"], ["+31", "🇳🇱"], ["+1", "🇺🇸"]
];

// Valeurs des attributs Brevo (identiques quelle que soit la langue affichée)
const OFFERS = ["Horizon", "Cap", "Plaizance", "Signature"];

(function renderContactForm() {
  const container = document.getElementById("contact-form");
  if (!container) return;

  const lang = document.documentElement.lang in CONTACT_FORM_I18N ? document.documentElement.lang : "fr";
  const t = CONTACT_FORM_I18N[lang];

  // textes du popup
  const popup = document.getElementById("popup");
  popup.dataset.offerLabel = t.offerLabel;
  popup.dataset.title = t.popupTitle;

  // messages utilisés par le script Brevo
  const m = t.brevo;
  window.LOCALE = lang;
  window.REQUIRED_CODE_ERROR_MESSAGE = m.REQUIRED_CODE_ERROR_MESSAGE;
  window.EMAIL_INVALID_MESSAGE = window.SMS_INVALID_MESSAGE = window.GENERIC_INVALID_MESSAGE = window.INVALID_NUMBER = m.INVALID;
  window.REQUIRED_ERROR_MESSAGE = m.REQUIRED_ERROR_MESSAGE;
  window.INVALID_DATE = m.INVALID_DATE;
  window.REQUIRED_MULTISELECT_MESSAGE = m.REQUIRED_MULTISELECT_MESSAGE;
  window.translation = { common: m.translation };
  window.AUTOHIDE = true; // après un envoi réussi, Brevo masque le formulaire (réaffiché par openBrevoForm)

  const error = '<label class="entry__error entry__error--primary"></label>';

  const text = (name, label, { required = false, autocomplete = "off", type = "text", extra = "" } = {}) => `
    <div class="sib-input sib-form-block">
      <div class="form__entry entry_block">
        <label class="entry__label" for="${name}"${required ? ' data-required="*"' : ""}>${label}</label>
        <div class="entry__field"><input class="input" type="${type}" id="${name}" name="${name}" maxlength="200" autocomplete="${autocomplete}"${required ? ' data-required="true" required' : ""} ${extra}></div>
        ${error}
      </div>
    </div>`;

  const choices = (blockClass, type, name, label, options) => `
    <div class="${blockClass} sib-form-block">
      <div class="form__entry entry_mcq">
        <p class="entry__label">${label}</p>
        <div class="entry__choices">
          ${options.map(([value, text]) => `<label class="entry__choice"><input type="${type}" name="${name}" value="${value}"><span>${text}</span></label>`).join("")}
        </div>
        ${error}
      </div>
    </div>`;

  container.innerHTML = `
  <div class="sib-form">
    <div id="sib-form-container" class="sib-form-container">

      <div id="error-message" class="sib-form-message-panel sib-form-message-panel--error">
        <div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">${t.error}</span></div>
      </div>
      <div id="success-message" class="sib-form-message-panel sib-form-message-panel--success">
        <div class="sib-form-message-panel__text"><span class="sib-form-message-panel__inner-text">${t.success}</span></div>
      </div>

      <div id="sib-container">
        <form id="sib-form" method="POST" action="${t.action}" data-type="subscription">

          <div class="sib-form-row">
            ${text("PRENOM", t.firstName, { required: true, autocomplete: "given-name" })}
            ${text("NOM", t.lastName, { required: true, autocomplete: "family-name" })}
          </div>

          ${text("EMAIL", t.email, { required: true, autocomplete: "email", type: "email" })}

          <!-- Téléphone : volontairement sans la classe "sib-sms-input", sinon le script Brevo
               remplace ce champ par son propre composant. Format vérifié par js/main.js. -->
          <div class="sib-input phone-field sib-form-block">
            <div class="form__entry entry_block">
              <label class="entry__label" for="SMS" data-required="*">${t.phone}</label>
              <div class="phone-input">
                <div class="entry__field phone-code">
                  <select class="phone-select" name="SMS__COUNTRY_CODE" aria-label="${t.phoneCode}">
                    ${PHONE_CODES.map(([code, flag]) => `<option value="${code}">${flag} ${code}</option>`).join("")}
                  </select>
                </div>
                <div class="entry__field phone-number">
                  <input type="tel" class="input" id="SMS" name="SMS" autocomplete="tel-national" placeholder="${t.phonePlaceholder}" data-required="true" required>
                </div>
              </div>
              <p class="entry__specification">${t.phoneHelp}</p>
              <label class="entry__error entry__error--primary" data-invalid="${t.phoneInvalid}"></label>
            </div>
          </div>

          ${choices("sib-checkbox-group", "checkbox", "FORFAIT_PLAIZANCE[]", t.offer, OFFERS.map(o => [o, o]))}

          <div class="sib-form-row">
            ${text("MARQUE_DE_VOTRE_BATEAU", t.brand)}
            ${text("MODELE_DE_VOTRE_BATEAU", t.model)}
          </div>

          <div class="sib-form-row">
            ${text("ANNEE_DU_BATEAU", t.year, { extra: 'inputmode="numeric" data-numeric="true"' })}
            ${choices("sib-radiobutton-group", "radio", "MULTICOQUE[]", t.multihull, [["Oui", t.yes], ["Non", t.no]])}
          </div>

          ${text("PORT_D_ATTACHE", t.homePort)}

          <div class="sib-optin sib-form-block">
            <div class="form__entry entry_mcq">
              <label class="entry__choice"><input type="checkbox" value="1" id="OPT_IN" name="OPT_IN"><span>${t.optIn}</span></label>
              ${error}
              <p class="entry__specification">${t.unsubscribe}</p>
            </div>
          </div>

          <p class="sib-form__declaration">${t.declaration}</p>

          <div class="sib-form-block">
            <button class="sib-form-block__button sib-form-block__button-with-loader" form="sib-form" type="submit">
              <!-- icône de chargement : requise par le script Brevo -->
              <svg class="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" aria-hidden="true"><path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z"/></svg>
              ${t.submit}
            </button>
          </div>

          <!-- anti-spam Brevo (honeypot) -->
          <input type="text" name="email_address_check" value="" class="input--hidden" tabindex="-1" autocomplete="off">
          <input type="hidden" name="locale" value="${lang}">
        </form>
      </div>
    </div>
  </div>`;
})();
