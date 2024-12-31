import { Server } from 'mock-socket';

export const startMockServer = () => {
  const server = new Server(process.env.REACT_APP_SOCKET_URL);

  server.on('connection', (socket) => {
    console.log('Mock server: Client connected');

    socket.on('message', (message) => {
      console.log('Mock server received:', message);

      // Echo the message back to the client
      socket.send(`Echo: ${message}`);
    });

    socket.on('close', () => {
      console.log('Mock server: Client disconnected');
    });
  });

  return server;
};
