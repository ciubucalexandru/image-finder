import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';

export const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
