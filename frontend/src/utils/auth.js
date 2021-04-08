const BASE_URL = `${window.location.protocol}${'//api.mesto.aneko23.nomoredomains.icu' || '//localhost:3001'}`;

export const register = (password, email) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json()
    });
    
  };
  
  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      //mode: 'no-cors',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email, password})
    })
    .then((res) => {
      if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
    }
    return res.json()
  });
}

  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      headers: {
        //'Accept': 'application/json',
        //'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  }