const createSocketService = () => {
  let socket: WebSocket | null = null;
  let messageHandler: ((message: string) => void) | null = null;

  const connect = (transactionId: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      console.warn('⚠️ WebSocket이 이미 연결되어 있습니다.');
      return;
    }

    const socketUrl = process.env.REACT_APP_SOCKET_URL;
    if (!socketUrl) {
      console.error('❌ WebSocket URL이 정의되지 않았습니다.');
      return;
    }

    // TODO: 토큰 추가 필요 > 수정
    socket = new WebSocket(`${socketUrl}/chat/room/${transactionId}`);

    socket.onopen = () => {
      console.log('✅ WebSocket 서버에 연결되었습니다!');
    };

    socket.onmessage = (event) => {
      console.log('!!', event.data);
      try {
        if (messageHandler) {
          messageHandler(event.data);
        }
      } catch (error) {
        console.error('❌ 메시지 처리 중 오류 발생:', error);
      }
    };

    socket.onclose = () => {
      console.warn('⚠️ WebSocket 서버와의 연결이 종료되었습니다.');
      socket = null;
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket 오류 발생:', error);
    };
  };

  const onMessage = (handler: (message: string) => void) => {
    messageHandler = handler;
  };

  const sendJsonMessage = (jsonObject: Record<string, any>) => {
    sendMessage(JSON.stringify(jsonObject));
  };

  const sendMessage = (message: string) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(message);
    } else {
      console.warn(
        '⚠️ WebSocket이 열려 있지 않아 메시지를 보낼 수 없습니다:',
        message
      );
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
      socket = null;
    }
  };

  return { connect, onMessage, sendMessage, sendJsonMessage, disconnect };
};

const socketService = createSocketService();
export default socketService;
