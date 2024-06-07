import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store';

interface StatsState {
    data: any | null;
    cards: any[] | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

export const fetchGetStats = createAsyncThunk('stats/fetchGetStats', async () => {
    const { data } = await axios.get('data/me');
    return data;
})

export const fetchRemoveCard = createAsyncThunk('stats/fetchRemoveCard', async () => {
    const { data } = await axios.patch('data/removecard');
    return data;
})

export const fetchGetCards = createAsyncThunk('stats/fetchGetCards', async () => {
    const { data } = await axios.get('data/cards');
    return data;
})

export const fetchSelectCard = createAsyncThunk('stats/fetchSelectCard', async (params: { id: number }) => {
    console.log(params)
    const { data } = await axios.post('data/selectcard', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data;
})

export const fetchSetDesign = createAsyncThunk('stats/fetchSetDesign', async (params: {id : number, design: string}) => {
    const { data } = await axios.post('data/setdesign', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data;
})

export const fetchTransfer = createAsyncThunk('stats/fetchTransfer', async (params: {addresserNumber : number, receiverNumber: number, sum: number; comment: string;}) => {
    const { data } = await axios.post('transaction/transfer', params, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return data;
})

const initialState: StatsState = {
    data: null,
    cards: null,
    status: 'idle',
};

const statsSlice = createSlice({
    name: 'stats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGetStats.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchGetStats.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchGetStats.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
            .addCase(fetchRemoveCard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchRemoveCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(fetchRemoveCard.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(fetchGetCards.pending, (state) => {
                state.status = 'loading';
                state.cards = null;
            })
            .addCase(fetchGetCards.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.cards = action.payload.cards;
            })
            .addCase(fetchGetCards.rejected, (state) => {
                state.status = 'failed';
                state.cards = null;
            })
            .addCase(fetchSelectCard.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchSelectCard.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data.selectedCard = action.payload.selectedCard;
            })
            .addCase(fetchSelectCard.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

const statsReducer = statsSlice.reducer;

export default statsReducer;
