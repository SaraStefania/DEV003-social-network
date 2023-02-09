import {
  loginGoogle,
  newRegister,
  sendVerification,
} from '../../firebase/firebase.js';

import { footer } from '../../components/footer.js';

import {
  validateEmail,
  validatePassword,
  validateConfirmPassword,
  validateNickname,
} from './signup-validations.js';

import { signupErrorHandler } from './signup-error-handler.js';

export const signup = () => {
  const viewSignUp = document.createElement('div');
  viewSignUp.classList.add('signup-container');
  viewSignUp.innerHTML = `
  <main>
  <div class="container">
  <div class="logo-container">
  <img src="assets/logo.webp" alt="logo" />
  <h1>PURRRFECT BOOKS</h1>
  </div>
  <h2>Regístrate</h2>
  <form id="signup-form">
  <div class="container-item">
  <label class="label-signup" for="signup-email">Correo</label>
  <input type="text" id="signup-email" class="signup-input" placeholder="ejemplo@email.com"/>
  <p class="error-text" id="email-validation"></p>
  <label class="label-signup" for="signup-password">Contraseña</label>
  <input type="password" id="signup-password" class="signup-input" placeholder="**************" />
  <p class="error-text" id="password-validation"></p>
  <label class="label-signup" for="signup-confirm-password">Confirmar contraseña</label>
  <input type="password" id="signup-confirm-password" class="signup-input" placeholder="**************"/>
  <p class="error-text" id="password-confirm-validation"></p>
  <label class="label-signup" for="signup-nickname">Nombre</label>
  <input type="text" id="signup-nickname" class="signup-input" placeholder="ej: Juan"/>
  <p class="error-text" id="nickname-validation"></p>
  </div>
  <div class="signup-container-btn">
  <button type="submit" id="signup-submit-button" class="signup-btn">
  Regístrar
  </button>
  </div>
  </form>
  <div class="login-google">
  <p>o</p>
  <button type="button" id="login-google" class="login-google-btn">
  <img src="assets/btn_google_signin.png" alt="logo-google" />
  </button>
  </div>
  <div class="signup-span">
  <span>¿Ya tienes cuenta?<a href="#/login" class="span-btn">
  Ingresa aqui</a></span>
  </div>

  </div>
  </main>
`;
  // GOOGLE LOGIN
  viewSignUp.querySelector('#login-google').addEventListener('click', (e) => {
    loginGoogle();
    // console.log("hola");
  });

  // REGISTRO
  viewSignUp
    .querySelector('#signup-submit-button')
    .addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        const email = document.querySelector('#signup-email').value;
        const password = document.querySelector('#signup-password').value;
        const passwordConfirm = document.querySelector(
          '#signup-confirm-password'
        ).value;
        const nickname = document.querySelector('#signup-nickname').value;

        // console.log({ email, password, passwordConfirm, nickname });
        const emailIsValid = validateEmail(email);
        const passwordIsValid = validatePassword(password);
        const passwordConfirmIsValid = validateConfirmPassword(
          password,
          passwordConfirm
        );
        const nicknameIsValid = validateNickname(nickname);
        if (
          !emailIsValid ||
          !passwordIsValid ||
          !passwordConfirmIsValid ||
          !nicknameIsValid
        ) {
          return false;
        }

        const userCredential = await newRegister(email, password, nickname);
        console.log(userCredential);
        const user = userCredential.user;
        console.log({ userCredential, user });
        await sendVerification();
        alert('Se envío un enlace de verificación a tu correo.');
        window.location.hash = '#/login';
        console.log(user);
        return true;
      } catch (err) {
        signupErrorHandler(err);
      }
    });
  viewSignUp.appendChild(footer());
  return viewSignUp;
};
