const localSignup = () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {
    name: name,
    email: email,
    password: password
  };
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  fetch('/user/signup', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(async (result) => {
    result = await result.json();
    if (result.status !==200) {
      alert(JSON.stringify(result.message));
    } else {
      window.location = '/login';
    }
  }).catch((err) => {
    console.log(err);
  });
};

const localLogin = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {
    email: email,
    password: password
  };
  const headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');
  fetch('/user/login', {
    method: 'POST',
    headers,
    body: JSON.stringify(data)
  }).then(async (result) => {
    // user details will be set in session and cookie by passportjs during login
    // and authorization will be handled in subsequent request.
    window.location = '/user/dashboard';
  }).catch((err) => {
    console.log(err);
  });
};

const userLogout = () => {
  fetch('/user/logout').then((result) => {
    window.location = '/';
  }).catch((err) => {
    console.log(err);
  });
};
