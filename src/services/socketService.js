import { io } from 'socket.io-client';

class SocketService {
  constructor() {
    this.socket = null;
  }

  connect() {
    this.socket = io('http://localhost:3001');

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server!');
    });

    this.socket.on('receiveMessage', (message) => {
      console.log('Received message from server:', message);
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });
  }

  sendMessage(message) {
    if (this.socket) {
      this.socket.emit('sendMessage', message);
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}

const socketService = new SocketService();
export default socketService;
