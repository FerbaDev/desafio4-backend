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
    <div class='productCard'>
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
    deleteProduct(data[index].id)
  });
});





});

const deleteProduct = (id) => {
  socket.emit('deleteProduct', id);
};