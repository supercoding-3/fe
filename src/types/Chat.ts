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

export interface ChatListCardProps {
  id: number;
  thumbnail: string;
  title: string;
  price: number;
  sellerImg: string;
  seller: string;
}
