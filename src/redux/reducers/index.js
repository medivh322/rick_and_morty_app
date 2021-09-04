import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { isEqual } from 'lodash';

const initialState = {
    characters: [],
    filterParameters: {
        name: "",
        status: "",
        gender: "",
        species: "",
        type: ""
    },
    detailCharacter: {},
    openDetailModal: false,
    curPage: 1,
    countPages: 1,
    loading: false,
    bigLoading: false
}

export const fetchCharactersAll = createAsyncThunk(
    'characters/fetchAll',
    async (arg, thunkApi) => {
        const stateFilter = thunkApi.getState().filterParameters;
        let newPage = arg.newPage;
        if (!isEqual(stateFilter, arg.filterParameters)) {
            newPage = 1;
        }
        const { name, status, gender, species, type } = arg.filterParameters;
        try {
            const result = await fetch(`https://rickandmortyapi.com/api/character/?page=${newPage}&name=${name}&status=${status}&gender=${gender}&species=${species}&type=${type}`)
            .then(res => {
                if(res.status === 404){
                    return 404;
                }else{
                    return res.json();
                }
            }).then(data => {
                return data;
            });
            
            return (result === 404) ? thunkApi.rejectWithValue(arg.filterParameters) : thunkApi.fulfillWithValue(result);
        } catch (err) {
            return thunkApi.rejectWithValue("Oops");
        }
    }
);

export const fetchDetailCharacter = createAsyncThunk(
    'characters/fetchDetail',
    async (id, thunkApi) => {
        try {
            const res = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
            return res.json();
        } catch (err) {
            return thunkApi.rejectWithValue("Oops");
        }
    }
)

const rootReducer = createSlice({
    name: 'characters',
    initialState,
    reducers: {
        closeModal(state, aciton) {
            state.openDetailModal = false;
        }
    },
    extraReducers: {
        [fetchCharactersAll.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchCharactersAll.fulfilled]: (state, action) => {
            state.loading = false;
            state.curPage = Number(action.meta.arg.newPage);
            state.countPages = Number(action.payload.info.pages);
            [state.characters, state.filterParameters] = [action.payload.results, action.meta.arg.filterParameters]
        },
        [fetchCharactersAll.rejected]: (state, action) => {
            state.loading = false;
            [state.characters, state.filterParameters, state.countPages, state.curPage] = [[], action.payload, 1, 1]
        },
        [fetchDetailCharacter.pending]: (state, action) => {
            state.bigLoading = true;
        },
        [fetchDetailCharacter.fulfilled]: (state, action) => {
            state.detailCharacter = action.payload;
            state.openDetailModal = true;
            state.bigLoading = false;
        },
        [fetchDetailCharacter.rejected]: (state, action) => {
            state.bigLoading = false;
        },
    }
});

export const actions = rootReducer.actions;

export default rootReducer.reducer;