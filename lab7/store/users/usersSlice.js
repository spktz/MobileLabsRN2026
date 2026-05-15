import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        profile: {
            fullName: '',
            email: '',
            phone: '',
            address: '',
        },
    },
    reducers: {
        updateProfile: (state, action) => {
            state.profile = { ...state.profile, ...action.payload };
        },
        clearProfile: (state) => {
            state.profile = { fullName: '', email: '', phone: '', address: '' };
        },
    },
});

export const { updateProfile, clearProfile } = usersSlice.actions;
export default usersSlice.reducer;