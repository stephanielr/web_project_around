import Api from "./Api.js";
import { profileEdit, profileEditImage } from "./script.js";
export default class UserInfo {
  constructor(infoSelectors) {
    this._infoSelectors = infoSelectors;

    // Intancia de la API
    this._api = new Api({
      baseUrl: "https://around-api.es.tripleten-services.com/v1",
      headers: {
        authorization: "354781f2-b486-4ab1-9379-468b53f9329e",
        "Content-Type": "application/json",
      },
    });
  }

  getUserInfo() {
    const nameElement = document.querySelector(
      this._infoSelectors.nameSelector
    );
    const jobElement = document.querySelector(this._infoSelectors.jobSelector);

    if (nameElement && jobElement) {
      const currentInfo = {
        name: nameElement.textContent,
        job: jobElement.textContent,
      };
      return currentInfo;
    }
  }

  setUserInfo(newUserData) {
    const nameElement = document.querySelector(
      this._infoSelectors.nameSelector
    );
    const jobElement = document.querySelector(this._infoSelectors.jobSelector);
    const saveButtonElement = document.querySelector("#save-button");

    nameElement.textContent = newUserData.name;
    jobElement.textContent = newUserData.job;

    if (newUserData.avatar) {
      const avatarElement = document.querySelector(
        this._infoSelectors.avatarSelector
      );
      avatarElement.src = newUserData.avatar;
    }

    // Mostrar estado de carga en el botón
    this._api.renderTextLoading(true, saveButtonElement);

    // Actualización del servidor
    this._api.updateUserInfo(newUserData).finally(() => {
      // Restaurar el botón después de la actualización
      this._api.renderTextLoading(false, saveButtonElement);
      profileEdit.closeDialog();
    });
  }

  getProfileInfo(formValidator = null) {
    this._api
      .getUserInfo()
      .then((data) => {
        // Actualizar la información del perfil en la página
        this.setUserInfo({
          name: data.name,
          job: data.about,
          avatar: data.avatar,
        });

        // Actualizar los valores del formulario con la información del perfil
        this._updateFormValues(data, formValidator);
      })
      .catch((error) => {
        console.error("Error al obtener información del perfil:", error);
      });
  }

  _updateFormValues(data, formValidator) {
    const inputName = document.querySelector("#name");
    const inputJob = document.querySelector("#job");

    if (inputName && inputJob) {
      inputName.value = data.name;
      inputJob.value = data.about;

      // Si se proporcionó un validador, usarlo en lugar de crear uno nuevo
      if (formValidator) {
        formValidator.toggleSaveButton(
          formValidator.inputList,
          formValidator.buttonElement
        );
      }
    }
  }

  setAvatar(newAvatarData) {
    const avatarElement = document.querySelector(
      this._infoSelectors.avatarSelector
    );

    const saveButtonElement = document.querySelector("#save-button-avatar");

    this._api.renderTextLoading(true, saveButtonElement);

    // Agregar un retraso para que el texto "Guardando" sea visible por más tiempo
    setTimeout(() => {
      avatarElement.src = newAvatarData.avatarURL;
      this._api.setAvatar(newAvatarData);
      this._api.renderTextLoading(false, saveButtonElement);
      profileEditImage.closeDialog();
    }, 2000);
  }
}
