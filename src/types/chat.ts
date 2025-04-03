export enum MessageType {
  CHAT = 'CHAT',
  ENTER = 'ENTER',
  LEAVE = 'LEAVE',
}

export interface ChatData {
  id: number;
  sender: string;
  receiver: string;
  message: string;
  messageType: MessageType.CHAT | MessageType.ENTER | MessageType.LEAVE;
}
export interface ChatRoom {
  chatRoomId: number;
  productName: string;
  productPrice: number;
  productProfileImageUrl: string;
  oppositeNickname: string;
  oppositeProfileImageUrl: string | null;
}
