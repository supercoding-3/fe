const createSocketService = () => {
  let socket = null;

  const connect = () => {
    socket = new WebSocket(process.env.REACT_APP_SOCKET_URL);

    socket.onopen = () => {
      console.log('Connected to WebSocket server!');
    };

    socket.onmessage = (event) => {
      if (messageHandler) messageHandler(event.data);
    };

    socket.onclose = () => {
      console.log('Disconnected from WebSocket server');
    };
  };

  let messageHandler = null;
  const onMessage = (handler) => {
    messageHandler = handler;
  };

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
  };

  return { connect, onMessage, sendMessage, disconnect };
};

const socketService = createSocketService();
export default socketService;
