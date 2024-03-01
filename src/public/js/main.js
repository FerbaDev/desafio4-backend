console.log("conectado");
//importamos socket
const socket = io();

//para enviar mensajes del cliente al servidor, utilizamos la palabra "emit", con el id
//del evento y el contenido del mensaje

//los ids de los eventos deben coincidir entre el cliente y el servidor

socket.emit("mensaje", "hola mundo, soy el cliente");

//recibimos el mensaje del servidor

socket.on("saludo", (data) => {
  console.log(data);
});

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
    <button>Eliminar</button>
    </div>
    `;
  });
});
