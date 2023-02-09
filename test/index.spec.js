// importamos la funcion que vamos a testear
// import { myFunction } from '../src/lib/index';

// describe('myFunction', () => {
//   it('debería ser una función', () => {
//     expect(typeof myFunction).toBe('function');
//   });
// });
import { loginGoogle } from '../src/firebase/firebase.js';

describe('login google', () => {
  it('is a function', () => {
    expect(typeof loginGoogle).toBe('function');
  });
});
