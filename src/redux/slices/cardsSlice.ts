import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';
import { FormAddCardValues } from '@/app/components/forms/addCard.form';
import { FormCreateCardValues } from '@/app/components/forms/createCard.form.';
import { FormChangePIN } from '@/app/components/statsPage/components/modals/changePIN.modal';

interface CardsState {
    data: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Добавлено состояние 'idle'
}

export const fetchAddCard = createAsyncThunk('cards/fetchAddCard', async (params: FormAddCardValues) => {
    const { data } = await axios.post('cards/add', params);
    return data;
})

export const fetchCreateCard = createAsyncThunk('cards/fetchCreateCard', async (params: FormCreateCardValues) => {
    const { data } = await axios.post('cards/create', params);
    return data;
})

export const fetchChangePIN = createAsyncThunk('cards/fetchChangePIN', async (params: FormChangePIN) => {
    const { data } = await axios.post('cards/updatepin', params);
    return data;
})

export const fetchCard = createAsyncThunk('cards/fetchCard', async () => {
    const { data } = await axios.get('cards/get');
    return data;
})

const initialState: CardsState = {
    data: null,
    status: 'idle',
};

const cardsSlice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchAddCard.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAddCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;

            })
            .addCase(fetchAddCard.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
    },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const cardsReducer = cardsSlice.reducer;

export default cardsReducer;