//Imports
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithImage from "./PopupWithImage.js";
import PopUpWithForm from "./PopUpWithForm.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";
import UserInfo from "./UserInfo.js";
import { addNewCard } from "./utils.js";
export {
  profileAdd,
  formValidationImage,
  apiNewCard,
  profileEdit,
  profileEditImage,
};
import Api from "./Api.js";

/* Instancias */

// Instancia de cards iniciales
const apiInitialCards = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1/",
  headers: {
    authorization: "354781f2-b486-4ab1-9379-468b53f9329e",
  },
});
apiInitialCards.getInitialCards();

// Instancia para agregar nuevas cards
const imageForm = document.querySelector("#add-card-form");
imageForm.addEventListener("submit", addNewCard);

const apiNewCard = new Api({
  baseUrl: "https://around-api.es.tripleten-services.com/v1",
  headers: {
    authorization: "354781f2-b486-4ab1-9379-468b53f9329e",
    "Content-Type": "application/json",
  },
});
// Instancia para abrir Popup editar perfil
const profileEdit = new Popup({
  dialogID: "#modal-edit",
  formID: "#profile-form",
  openButtonElement: "#edit-button-open",
  closeButtonElement: "#edit-button-close",
});

// Instancia para abrir Popup agregar imagen

const profileAdd = new Popup({
  dialogID: "#modal-add",
  formID: "#profile-form",
  openButtonElement: "#add-button-open",
  closeButtonElement: "#add-button-close",
});

//Instancia para abrir Popup Editar Avatar
const profileEditImage = new Popup({
  dialogID: "#modal-avatar",
  formID: "#avatar-form",
  openButtonElement: "#avatar-edit-button",
  closeButtonElement: "#avatar-button-close",
});

// Instancia para abrir imagenes
const openImage = new PopupWithImage({
  openButtonElement: ".element__button-image",
  closeButtonElement: "#dialog-close-button",
  dialogID: "#modal-image",
});

// Instancia para eliminar cards
const deleteCard = new PopupWithConfirmation({
  dialogID: "#modal-delete",
  openButtonElement: "#delete-image-btn",
  closeButtonElement: "#confirmation-dialog-close",
  confirmButtonElement: ".profile__delete-button",
});

/* Instancias de FormValidator editar perfil*/
const formValidationProfile = new FormValidator("#profile-form", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "form__input_type_error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationProfile.enableValidation();

formValidationProfile.toggleSaveButton(
  formValidationProfile.inputList,
  formValidationProfile.buttonElement
);
// Form Validator para subir imagen
const formValidationImage = new FormValidator("#modal-add", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "#title-error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationImage.enableValidation();

formValidationImage.toggleSaveButton(
  formValidationImage.inputList,
  formValidationImage.buttonElement
);

//Form validator para cambiar imagen del perfil
const formValidationAvatar = new FormValidator("#avatar-form", {
  inputSelector: ".profile__edit-form-input",
  inputErrorClass: "#title-error",
  errorClass: "form__input-error_active",
  buttonSelector: ".profile__edit-form-button",
});
formValidationAvatar.enableValidation();

formValidationAvatar.toggleSaveButton(
  formValidationAvatar.inputList,
  formValidationAvatar.buttonElement
);

// Instancia pop up with form para editar perfil
const profilePopupForm = new PopUpWithForm(
  (inputValues) => {
    info.setUserInfo(inputValues);
  },
  "#modal-edit",
  { dialogID: "#modal-edit" }
);
profilePopupForm._getInputValues();

//Instancia para popup con avatar para cambiar avatar
const avatarPopupForm = new PopUpWithForm(
  (inputValues) => {
    info.setAvatar(inputValues);
  },
  "#modal-avatar",
  { dialogID: "#modal-avatar" }
);
avatarPopupForm._getInputValues();

// instancia user info
const info = new UserInfo({
  nameSelector: "#profile-name",
  jobSelector: "#profile-job",
  avatarSelector: ".profile__avatar",
});
info.getProfileInfo(formValidationProfile);
