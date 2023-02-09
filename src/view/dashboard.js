export const dashboard = () => {
    const viewDashboard = document.createElement('div');
    viewDashboard.classList.add('post-container');
    viewDashboard.innerHTML = `
  <div class= "post-div">
    <div class="logo-container">
      <img src="assets/logo.webp"/>
      <h1>PURRFECT BOOKS</h1>
    </div>
    <form class="post-form" id="post-form" >
    <h4>Nombre</h4>
    <div class="post-fields">
      <label for="title"></label>
    </div>
    <input type="text" id= "post-title" placeholder="Título del libro">
    <div >
      <label for="description"></label>
    </div>  
    <div>
      <textarea id="post-description" placeholder="Reseña"></textarea>
    </div>
    <div >
      <button class="button-post-save" id="button-post-save">Publicar</button>
    </div>
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
  </footer>
  </div>
  </div>
  
    <div id="post-container"></div>
  </form>`;
    return viewDashboard;
}
