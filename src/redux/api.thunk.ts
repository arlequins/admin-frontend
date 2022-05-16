import { createAsyncThunk } from '@reduxjs/toolkit';

export const createApiAsyncThunk = <Result, Arg>(key: string, action: (arg?: Arg) => Promise<Result>) => {
  return createAsyncThunk<Result, Arg>(key, async (arg, { rejectWithValue }) => {
    try {
      const data = await action(arg);

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  });
};
