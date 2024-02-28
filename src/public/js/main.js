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

//recibimos el array de usuarios del server
socket.on("usuarios", (data) => {
  const listaUsuarios = document.getElementById("listaUsuarios");
  listaUsuarios.innerHTML = "";
  data.forEach((usuario) => {
    listaUsuarios.innerHTML += `<li>${usuario.nombre} ${usuario.apellido} </li>`;
  });
});
