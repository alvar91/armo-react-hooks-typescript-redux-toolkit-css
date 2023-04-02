import { configureStore } from "@reduxjs/toolkit";
import users from "./slices/users/slice";

import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    users,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
