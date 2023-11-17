/*VARIABLES*/

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrito = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

/*LISTENERS*/
cargarEventsListeners();
function cargarEventsListeners() {
  //Cuando agregas un curso pulsando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarCurso);
  //Eliminar curso del carrito
  carrito.addEventListener("click", eliminarCurso);
  //Muestra los cursos de Local Storage
  document.addEventListener('DOMContentLoaded', () => {
    articulosCarrito = JSON.parse( localStorage.getItem('carrito') ) || [];

    carritoHTML();
  });
  //Vaciar carrito
  vaciarCarrito.addEventListener("click", () => {
    articulosCarrito = []; //Se resetea el array
    limpiarHTML(); //Se resetea el HTML del carrito
  });
}

/*FUNCIONES*/

//Agregar un curso al carrito
function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

//Eliminar curso del carrito
function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");
    //Elimina el array por id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    carritoHTML(); //mostramos HTML
  }
}

//Lee el contenido del HTML al que clicas y extrae info
function leerDatosCurso(curso) {
  //Crear un obj con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  //Revisa si un elemento ya existe en el carrito
  if (articulosCarrito.some((curso) => curso.id === infoCurso.id)) {
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    articulosCarrito = [...articulosCarrito, infoCurso];
  }
  console.log(articulosCarrito);
  carritoHTML();
}

// Mostrar el carrito en HTML
function carritoHTML() {
  //Limpiar el HTML
  limpiarHTML();

  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td><img src=${imagen} width="100"></td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td><a href="#" class="borrar-curso" data-id="${id}"> X </a></td>
        `;
    //Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });

    //Agregar carrito de compras a Storage
    sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
};

//Elimina los cursos del tbody
function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
