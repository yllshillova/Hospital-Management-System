import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import User from '../../models/User';

interface SearchState {
    searchTerm: string;
    filteredPatients: User[];
}

const initialState: SearchState = {
    searchTerm: '',
    filteredPatients: [],
};

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        }
        
    },
});

export const { setSearchTerm} = searchSlice.actions;
export default searchSlice.reducer;