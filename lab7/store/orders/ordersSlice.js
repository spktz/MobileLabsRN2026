import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        history: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.history.push({
                id: Date.now().toString(),
                date: new Date().toLocaleString(),
                items: action.payload.items,
                total: action.payload.total,
                user: action.payload.user,
            });
        },
    },
});

export const { addOrder } = ordersSlice.actions;
export default ordersSlice.reducer;