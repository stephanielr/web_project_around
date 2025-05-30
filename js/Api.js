import { Card } from "./Card.js";
import Section from "./Section.js";
import { handleCardClick } from "./utils.js";

// class
export default class Api {
  constructor(options) {
    this._options = options;
  }

  getInitialCards() {
    return fetch(`${this._options.baseUrl}/cards`, {
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Instancia de cards iniciales
        const cardList = new Section(
          {
            item: data,
            renderer: (item) => {
              const card = new Card(
                item,
                "#template-selector",
                handleCardClick
              );
              const cardElement = card.generateCard();
              cardList.addItem(cardElement);
            },
          },
          ".element-list__item"
        );
        cardList.renderItems();
      });
  }

  addNewCard() {
    return fetch(`${this._options.baseUrl}/cards`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        name: this._options.name,
        link: this._options.link,
      }),
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  getUserInfo() {
    return fetch(`${this._options.baseUrl}/users/me`, {
      headers: {
        authorization: this._options.headers.authorization,
      },
    }).then((res) => {
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      return res.json();
    });
  }

  updateUserInfo(newUserData) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: newUserData.name,
        about: newUserData.job,
      }),
    })
      .then((res) => res.json())
      .finally(() => {});
  }

  setAvatar(newAvatarData) {
    return fetch(`${this._options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: newAvatarData.avatarURL,
      }),
    })
      .then((res) => res.json())
      .then((data) => {});
  }

  deleteCard(clickedButtonID) {
    return fetch(`${this._options.baseUrl}/cards/${clickedButtonID}`, {
      method: "DELETE",
      headers: {
        authorization: this._options.headers.authorization,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log("Tarjeta eliminada", clickedButtonID);
        clickedButtonID.remove();
      })
      .catch((err) => console.log("Error al eliminar la tarjeta:", err));
  }

  changeLikeCardStatus(clickedButtonID, isLiked) {
    const method = isLiked ? "PUT" : "DELETE";
    const body = isLiked ? JSON.stringify({ isLiked: true }) : null;
    return fetch(`${this._options.baseUrl}/cards/${clickedButtonID}/likes`, {
      method,
      headers: {
        authorization: this._options.headers.authorization,
        "Content-Type": "application/json",
      },
      body,
    }).then((res) => res.json());
  }

  //Funciones de carga

  renderTextLoading(isLoading, saveButtonElement) {
    if (isLoading) {
      saveButtonElement.textContent = "Guardando...";
    } else {
      saveButtonElement.textContent = "Guardar";
    }
  }
}
