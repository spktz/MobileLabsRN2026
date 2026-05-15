import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [
        {
            id: 1,
            name: 'Fender Stratocaster',
            desc: 'Класична електрогітара з чистим звучанням.',
            price: 52000,
            img: 'https://picsum.photos/id/145/400/300'
        },
        {
            id: 2,
            name: 'Синтезатор Roland K-25m',
            desc: 'Компактний модуль для створення електронної музики.',
            price: 18500,
            img: 'https://picsum.photos/id/225/400/300'
        },
        {
            id: 3,
            name: 'Барабани Yamaha Stage Custom',
            desc: 'Професійна акустична установка з берези.',
            price: 45000,
            img: 'https://picsum.photos/id/352/400/300'
        },
        {
            id: 4,
            name: 'Мікрофон Shure SM58',
            desc: 'Легендарний динамічний мікрофон для вокалу.',
            price: 4800,
            img: 'https://picsum.photos/id/454/400/300'
        }
    ],
};

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
});

export default productsSlice.reducer;