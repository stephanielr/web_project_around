import Api from "./Api.js";
export class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._image = data.link;
    this._title = data.name;
    this._id = data._id;
    this.isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._clickedButton = null;
    this._clickedButtonID = null;

    this._api = new Api({
      baseUrl: "https://around-api.es.tripleten-services.com/v1",
      headers: {
        authorization: "354781f2-b486-4ab1-9379-468b53f9329e",
        "Content-Type": "application/json",
      },
    });
  }

  // Cambiar like
  toggleLike() {
    this.isLiked = !this.isLiked;
  }
  deleteCard() {
    this._clickedButton.remove();
    this._api.deleteCard(this._clickedButtonID);
  }

  _getTemplate() {
    const template = document.querySelector(this._templateSelector);
    const cardElement = template.content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    // Title
    this._element.querySelector(".element__title").textContent = this._title;
    // Image
    const imgElement = this._element.querySelector(".element__image");
    imgElement.src = this._image;
    imgElement.alt = this._title;
    // Id
    this._element.id = this._id;

    // Like button
    const likeButton = this._element.querySelector(".element__button-like");
    const likeIcon = this._element.querySelector(".element__like-button");

    // Set initial state of like button
    this.updateLikeButtonState(likeIcon);

    // Like button event listener
    likeButton.addEventListener("click", () => {
      this.toggleLike();

      this._api
        .changeLikeCardStatus(this._id, this.isLiked)
        .then((data) => {
          this.isLiked = data.isLiked;
          this.updateLikeButtonState(likeIcon);
          if (data.isLiked === true) {
            console.log("Se likeo a la tarjeta ");
          } else {
            console.log("Se deslikeo la tarjeta");
          }
        })
        .catch((err) => {
          console.error(
            `Error al ${this.isLiked ? "dar" : "quitar"} like a la tarjeta:`,
            err
          );
        });
    });

    return this._element;
  }

  updateLikeButtonState(likeIcon) {
    if (this.isLiked) {
      likeIcon.src = "../images/heart-on.svg";
    } else {
      likeIcon.src = "../images/heart.svg";
    }
  }
}
