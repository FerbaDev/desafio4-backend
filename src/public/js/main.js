console.log("conectado");
//importamos socket
const socket = io();

//los ids de los eventos deben coincidir entre el cliente y el servidor

//recibimos los productos del server
socket.on("productos", (data) => {
  const listaProductos = document.getElementById("listaProductos");
  listaProductos.innerHTML = "";
  data.forEach((producto) => {
    listaProductos.innerHTML += `
    <div class='product-card'>
    <h3>Titulo : ${producto.title}</h3>
    <p>Descripción : ${producto.description}</p>
    <p>$${producto.price}</p>
    <button class='deleteButton'>Eliminar</button>
    </div>
    `;
  });

  //configuramos eliminar
  const deleteButtons = document.querySelectorAll(".deleteButton");
  deleteButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      deleteProduct(data[index].id);
    });
  });

  //boton agregar
  const submitButton = document.getElementById("submit-button");
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    addProduct();
  });
});

const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

const addProduct = () => {
  // Obtener valores del formulario
  const title = document.getElementById("form-title").value;
  const state = document.getElementById("form-select").value === "true"; // Convertir a booleano
  const category = document.getElementById("form-category").value;
  const description = document.getElementById("form-description").value;
  const price = parseFloat(document.getElementById("form-price").value);
  const thumbnail = document.getElementById("form-thumbnail").value;
  const code = document.getElementById("form-code").value;
  const stock = parseInt(document.getElementById("form-stock").value);

  // Verificar si todos los campos están presentes
  if (
    title &&
    state !== undefined &&
    category &&
    description &&
    price &&
    thumbnail &&
    code &&
    stock !== undefined
  ) {
    // Crear objeto con los datos del formulario
    const product = {
      title,
      state,
      category,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    // Enviar el producto a través del socket

    socket.emit("addProduct", product);
  } else {
    console.error("Algunos campos del formulario no están definidos.");
  }
};
