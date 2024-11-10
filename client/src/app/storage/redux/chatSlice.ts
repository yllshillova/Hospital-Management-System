// chatSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import ChatMessage from '../../models/ChatMessage';

interface ChatState {
    messages: { [key: string]: ChatMessage[] }; // key is the chatId
}

const initialState: ChatState = {
    messages: {},
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage(state, action: PayloadAction<{ chatId: string; message: ChatMessage }>) {
            const { chatId, message } = action.payload;
            if (!state.messages[chatId]) {
                state.messages[chatId] = [];
            }
            state.messages[chatId].push(message);
        },
        loadMessages(state, action: PayloadAction<{ chatId: string; messages: ChatMessage[] }>) {
            const { chatId, messages } = action.payload;
            state.messages[chatId] = messages;
        },
    },
});

export const { addMessage, loadMessages } = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
export default chatSlice.reducer;