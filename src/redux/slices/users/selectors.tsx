import { RootState } from "../../store";

export const selectUsers = (state: RootState) => state?.users?.users;
export const selectIsLoading = (state: RootState) => state.users?.isLoading;
export const selectError = (state: RootState) => state.users?.isError;
