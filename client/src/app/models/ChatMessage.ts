export default interface ChatMessage
{
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp?: Date; // or Date if you prefer
    alignment: 'left' | 'right';
}