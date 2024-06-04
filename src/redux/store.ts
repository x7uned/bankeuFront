import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';

import authReducer from './slices/authSlice'; // Импортируйте ваш authReducer
import statsReducer from './slices/statsSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        stats: statsReducer
    },
});

interface AuthState {
    data: string | null; // Замените `string` на подходящий тип данных
    status: 'loading' | 'succeeded' | 'error';
}

export type RootState = {
    auth: AuthState;
} & ReturnType<typeof store.getState>;

// Определение типа AppDispatch
export type AppDispatch = typeof store.dispatch;

// Кастомные хуки с правильной типизацией
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Экспорт хранилища
export default store;