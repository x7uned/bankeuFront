import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';
import { FormValues } from '@/app/components/forms/login.form';

interface AuthState {
    data: any | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed'; // Добавлено состояние 'idle'
}

export const fetchLogin = createAsyncThunk('auth/fetchLogin', async (params: FormValues) => {
    const { data } = await axios.post('/auth/login', params);
    return data;
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (params: FormValues) => {
    const { data } = await axios.post('/auth/register', params);
    return data;
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
    const { data } = await axios.get('auth/me');
    return data;
})

const initialState: AuthState = {
    data: null,
    status: 'idle',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;

            })
            .addCase(fetchLogin.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
            .addCase(fetchAuthMe.pending, (state) => {
                state.status = 'loading';
                state.data = null;
            })
            .addCase(fetchAuthMe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;

            })
            .addCase(fetchAuthMe.rejected, (state) => {
                state.status = 'failed';
                state.data = null;
            })
    },
});

const authReducer = authSlice.reducer;

export default authReducer;

export const selectIsAuth = (state: any) => Boolean(state.auth.data);
export const userData = (state: any) => (state.auth.data)

export const { logout } = authSlice.actions;
