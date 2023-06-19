import { io } from "socket.io-client";

const socket = io('https://sua-chave-api.herokuapp.com/');
// const socket = io('http://localhost:3339/');

export {socket}