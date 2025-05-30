export default class FormValidator {
  constructor(form, settings) {
    this.form = document.querySelector(form);
    this.settings = settings;
  }

  showInputError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this.settings.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add("form__input-error_active");
  }
  hideInputError(inputElement) {
    const errorElement = this.form.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove(this.settings.inputErrorClass);
    errorElement.textContent = "";
  }

  checkInputValidity(inputElement) {
    !inputElement.validity.valid
      ? this.showInputError(inputElement)
      : this.hideInputError(inputElement);
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      // la linea del error
      return !inputElement.validity.valid;
    });
  }

  toggleSaveButton(inputList, buttonElement) {
    if (this.hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.style.backgroundColor = "transparent";
      buttonElement.style.color = "#c4c4c4";
      buttonElement.style.cursor = "not-allowed";
    } else {
      buttonElement.disabled = false;
      buttonElement.style.backgroundColor = "black";
      buttonElement.style.color = "white";
      buttonElement.style.cursor = "pointer";
    }
  }

  setEventListener() {
    this.inputList = Array.from(
      this.form.querySelectorAll(this.settings.inputSelector)
    );
    this.buttonElement = this.form.querySelector(this.settings.buttonSelector);
    this.inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this.checkInputValidity(inputElement);
        this.toggleSaveButton(this.inputList, this.buttonElement);
      });
    });
  }

  enableValidation() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this.setEventListener();
  }
}
