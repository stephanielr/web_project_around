import Popup from "./Popup.js";

export default class PopUpWithForm extends Popup {
  constructor(submitCallback, popUpSelector, selectors) {
    super(selectors);
    this._popUpSelector = popUpSelector;
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    const inputValues = {};
    const form = document
      .querySelector(this._popUpSelector)
      .querySelector("form");

    const inputs = form.querySelectorAll("input");

    inputs.forEach((input) => {
      inputValues[input.id] = input.value;
    });
    // console.log("input values", inputValues);
    return inputValues;
  }

  setEventListeners() {
    document.addEventListener("DOMContentLoaded", () => {
      const form = document
        .querySelector(this._popUpSelector)
        .querySelector("form");

      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputValues = this._getInputValues();
        this._submitCallback(inputValues);
      });
    });
  }
}
