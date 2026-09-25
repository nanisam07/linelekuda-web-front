import { io } from 'socket.io-client';

let socket = null;

export function connectSocket() {
  if (socket) return socket;
  socket = io('/', { transports: ['websocket', 'polling'] });
  
  socket.on('connect', () => {
    console.log('[AdminSocket] Connected:', socket.id);
  });
  
  socket.on('disconnect', () => {
    console.log('[AdminSocket] Disconnected');
  });
  
  return socket;
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function onNewMessage(callback) {
  if (!socket) return;
  socket.off('new_message');  // remove previous listener
  socket.on('new_message', callback);
}

export function onNewAppointment(callback) {
  if (!socket) return;
  socket.off('new_appointment');
  socket.on('new_appointment', callback);
}

export function getSocket() {
  return socket;
}
