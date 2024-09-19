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

const searchSlice2 = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        }
        
    },
});

export const { setSearchTerm} = searchSlice2.actions;
export default searchSlice2.reducer;