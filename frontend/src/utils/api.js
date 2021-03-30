class Api {
    constructor({adress, token, cohortId}) {
        this._token = token;
        this._adress = adress;
        this._cohortId = cohortId;
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(new Error(`Ошибка: ${res.status}`));
        }
        return res.json();
    } 

    addCard(name, link) {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name,
                link
            })
        })
        .then(this._getResponseData)
    }

    deleteCard(id) {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards/${id}`, {
            method: "DELETE",
            headers: {
                authorization: this._token
              }
        })
        .then(this._getResponseData)
    }
        

    getCards() {
        return fetch(`${this._adress}/v1/${this._cohortId}/cards`, {
            headers: {
                authorization: this._token
              }
        }).then((result) => {
            if (!result.ok) {
                return Promise.reject('Server error');
            }
            return result.json();
        }).then((data) => {
            return data;
        })
    }

    getUserProfile() {
        return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
        method: 'GET',
        headers: {
            authorization: this._token
          },
    })
    .then(this._getResponseData)
  }

  setUserProfile(name, about) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            name,
            about,
        }),
    })
    .then(this._getResponseData)
  }

  clickLike(id, isLiked) {
    return fetch(`${this._adress}/v1/${this._cohortId}/cards/likes/${id}`, {
        method: (isLiked) ? 'DELETE' : 'PUT',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          }
    })
    .then(this._getResponseData)
  }

  changeUserAvatar(avatar) {
    return fetch(`${this._adress}/v1/${this._cohortId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
            authorization: this._token,
            'Content-Type': 'application/json',
          },
        body: JSON.stringify({
            avatar
    })
    })
        .then(this._getResponseData)
    }


}

const api = new Api ({
    adress: 'https://mesto.nomoreparties.co',
    token: '31529348-ed42-4e11-a759-e58383781ff0',
    cohortId : `cohort-18`
}) 

export default api;