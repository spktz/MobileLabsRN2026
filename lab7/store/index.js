import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import productsReducer from './products/productsSlice';
import cartReducer from './cart/cartSlice';
import usersReducer from './users/usersSlice';
import ordersReducer from './orders/ordersSlice';

const persistConfig = {
    key: 'music-store-root',
    storage: AsyncStorage,
    whitelist: ['cart', 'orders', 'users'] // Тепер зберігаємо все важливе
};

const rootReducer = combineReducers({
    products: productsReducer,
    cart: cartReducer,
    users: usersReducer, // Додаємо профіль
    orders: ordersReducer, // Додаємо історію
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);