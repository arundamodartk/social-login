const localSignup = () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = {
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
  }).then((result) => {
    window.location = '/login';
    return result.json();
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
  }).then((result) => {
    console.log(result);
  }).catch((err) => {
    console.log(err);
  });
};
