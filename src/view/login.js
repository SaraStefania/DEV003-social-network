import { loginEmail, loginGoogle } from '../firebase/firebase.js';

export const login = () => {
  const viewLogIn = document.createElement('div');
  viewLogIn.classList.add('login-container');
  viewLogIn.innerHTML = `
  <main>
<div class="container">
<div class="logo-container">
<img src="assets/logo.webp"/>
<h1>PURRFECT BOOKS</h1>
</div>
<h2>Ingresar</h2>
<form id="login-form">
<div class="container-item">
<label class="label-login" for="login-email">Correo</label>
<input type="text" id="login-email" class="login-input" placeholder="ejemplo@email.com" />
<label class="label-login" for="login-password">Contraseña</label>
<input type="password" id="login-password" class="login-input" placeholder="**************" />
<span class="error-feedback" id="error-feedback"></span>
</div>
<div class="signup-container-btn">
<button type="submit" id="login-form-button" class="login-btn">
Iniciar sesión
</button>
</div>
<div class="login-google">
<p>o</p>
<button type="button" id="login-google" class="login-google-btn">
<img src="./assets/btn_google_signin.png" alt="logo-google" />
</button>
</div>
<div class="login-span">
<span
>¿Todavía no tienes cuenta? <a href="#/signup" class="span-btn">Regístrate aquí.</a
></span>
</div>
</form>
<div class="footer">
<footer>
<p class="description-footer">Esta red social ha sido elaborada por:</p>
<div class="nombres">
<p class="name-footer">Carmen</p>
<p class="name-footer">Francisca</p>
<p class="name-footer">Sara</p>
</div>
<a title="github carmen" href="https://github.com/CarmenArayaRodriguez"><img class="logo-github"src="assets/logoGithub.webp"/></a>
<a title="github francisca" href="https://github.com/pnxu"><img class="logo-github" src="assets/logogithub.webp"/></a>
<a title="github sara" href="https://github.com/sara040616"><img class="logo-github" src="assets/logoGithub.webp"/></a>
</div>
</footer>
</div>
</div>
</main>
  `;
  const loginForm = viewLogIn.querySelector('#login-form-button');
  loginForm.addEventListener('click', async (e) => {
    e.preventDefault();
    try {
      const email = document.querySelector('#login-email').value;
      const password = document.querySelector('#login-password').value;
      const response = await loginEmail(email, password);
      // FUNCION QUE MANEJA LOS ERRORES DEL LOGIN
      //console.log({ response });
      window.location.hash = '#/dashboard';
    } catch (err) {
      loginErrorHandler(err);
    }
  });
  // LOGIN GOOGLE
  const loginGoogleBtn = viewLogIn.querySelector('#login-google');
  loginGoogleBtn.addEventListener('click', (e) => {
    loginGoogle();
  });
  return viewLogIn;
};


const loginErrorHandler = (error) => {
  const errorCode = error.code;
  //console.log(errorCode);
  const errorFeedback = document.getElementById('error-feedback');

  if (errorCode === 'auth/invalid-email') {
    errorFeedback.innerHTML = 'Ingresa un correo válido.';
  } else if (errorCode === 'auth/user-not-found') {
    errorFeedback.innerHTML = 'Usuario no registrado.';
  } else if (errorCode === 'auth/internal-error') {
    errorFeedback.innerHTML = 'Ingresa una constraseña.';
  } else if (errorCode === 'auth/wrong-password') {
    errorFeedback.innerHTML = 'Correo y/o contraseña inválidos.';
  } else if (errorCode === 'auth/too-many-requests') {
    errorFeedback.innerHTML = 'Se han realizado demasiados intentos fállidos.';
  }
};
