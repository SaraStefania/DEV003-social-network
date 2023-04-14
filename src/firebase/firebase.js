import { getDoc } from 'firebase/firestore';
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  signOut,
  onAuthStateChanged,
  collection,
  addDoc,
  orderBy,
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  onSnapshot,
  deleteDoc,
  query,
} from '../lib/firebase-utils';

import { auth, db } from './firebase-config.js';

// autenticar a un usuarion con google
const provider = new GoogleAuthProvider();

// coleccion de usuarios
export const userData = async (userId, userEmail) => {
  try {
    // referencia a la colleccion - contiene los datos que se desea agregar al nuevo documento
    const docRef = await addDoc(collection(db, 'users'), { // pausa la ejecucion - agregar un nuevo documento a users
      id: userId,
      username: userEmail,
    });
    // id del documento recien agregado
    console.log('Document written with ID: ', docRef.id);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

// coleccion de usuarios google
const googleUsers = async () => {
  const user = auth.currentUser;
  if (user !== null) {
    // referencia a la colleccion de firestore donde se desea agregar los campos
    // contiene los datos que se desea agregar al nuevo documento
    const docRef = await addDoc(collection(db, 'googleUsers'), {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photo: user.photoURL,
    });
    // id del documento recién agregado
    console.log(docRef);
  }
};

// CORREO DE VERIFICACION
export const sendVerification = () => sendEmailVerification(auth.currentUser);

// LOGIN CON CORREO Y CONTRASEÑA
export const loginEmail = (email, password) => signInWithEmailAndPassword(auth, email, password);

// REGISTRO CON CORREO Y CONSTRASEÑA
export const newRegister = (email, password, username) => createUserWithEmailAndPassword(auth, email, password, username);

// GOOGLE SIGNIN
export const ssoGoogle = async () => {
  try {
    // iniciar sesión en Firebase utilizando la cuenta de Google
    const sso = await signInWithPopup(auth, provider);
    // si inicia sesion correctamente se obtienen las credenciales de autenticaccion con google
    const credential = GoogleAuthProvider.credentialFromResult(sso);
    // si ha iniciado correctamente
    if (credential.accessToken) {
      googleUsers();
      window.alert(sso.user.displayName);
      window.location.hash = '#/dashboard';
      return true;
    }
    window.alert('LOGIN INVALIDO');
    return false;
  } catch (err) {
    console.log('SSO FAILED', err);
    return err;
  }
};

// LOGOUT
export const logout = () => {
  // cuando se cumple la promesa
  signOut(auth).then(() => {
    console.log('logout');
    window.location.hash = '#/login';
  });
};

// create post
export const addPost = (
  title,
  description,
) => {
  addDoc(collection(db, 'posts'), {
    userId: auth.currentUser.uid,
    name: auth.currentUser.displayName,
    username: auth.currentUser.email,
    photo: auth.currentUser.photoURL,
    title,
    description,
    datePosted: new Date(),
    likes: [],
    likesCounter: 0,
  });
};

// cargar pagina
// else ejecutará cada vez que se actualice la lista de publicaciones. cada vez que se crea la consulta se ejecuta el callback
// actualizacion en tiempo real
export const onGetPost = async (callback) => {
  const getPost = await onSnapshot(query(collection(db, 'posts'), orderBy('datePosted', 'desc')), callback, {
  });
  return getPost;
};

// editar post
export const postEdit = async (id, title, description) => {
  // obtener referencia
  // base de datos de Firestore, el nombre de la colección y el id del documento
  const postRef = doc(db, 'posts', id);
  await updateDoc(postRef, {
    title,
    description,
  });
  // referencia del documento actualizado
  console.log(postRef);
};

// eliminar post
export const deletePost = async (id) => {
  const eliminarPost = await deleteDoc(doc(db, 'posts', id), {
  });
  return eliminarPost;
};

// like
export const removeLike = async (userId, postId) => {
  const postRef = doc(db, 'posts', postId);
  // devulve una copia del documento que contiene la version actual
  const postSnapshot = await getDoc(postRef);
  // obtiene los valores
  const likes = postSnapshot.get('likes');
  const likesCounter = postSnapshot.get('likesCounter');
  await updateDoc(postRef, {
    // eliminar el userId del array de likes
    likes: arrayRemove(userId),
    likesCounter: likesCounter - 1,
  });
  console.log(likes);
};

export const addLike = async (userId, postId) => {
  const postRef = doc(db, 'posts', postId);
  const postSnapshot = await getDoc(postRef);
  const likes = postSnapshot.get('likes');
  const likesCounter = postSnapshot.get('likesCounter');
  await updateDoc(postRef, {
    // aumentar
    likes: arrayUnion(userId),
    likesCounter: likesCounter + 1,
  });
  console.log(likes);
};

export const observer = () => {
  // observa los cambios en la autenticacion
  onAuthStateChanged(auth, (user) => {
    console.log(user);
    if (user == null) {
      window.location.hash = '#/';
      window.location.hash = '#/signup';
    }
    // es la ruta de inicio y redirige al usuario a la página de dashboard
    if (window.location.hash === '#/' && user) {
      window.location.hash = '#/dashboard';
    }
    if (window.location.hash === '' && user) {
      window.location.hash = '#/dashboard';
    }
  });
};
