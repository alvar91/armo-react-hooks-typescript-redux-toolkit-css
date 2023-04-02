import { PayloadAction } from "@reduxjs/toolkit";
import { WritableDraft } from "immer/dist/internal";
import { UserI } from "../../../models/UserI";

export function getAllUsersReducer(
  state: WritableDraft<{
    users: UserI[];
    isLoading: boolean;
    isError: boolean;
  }>,
  action: PayloadAction<
    any,
    string,
    { arg: void; requestId: string; requestStatus: "fulfilled" },
    never
  >
) {
  state.users = action.payload;
}

export function addUserReducer(
  state: WritableDraft<{
    users: UserI[];
    isLoading: boolean;
    isError: boolean;
  }>,
  action: PayloadAction<
    any,
    string,
    { arg: UserI; requestId: string; requestStatus: "fulfilled" },
    never
  >
) {
  state.users = [...state.users, action.payload];
}

export function editUserReducer(
  state: WritableDraft<{
    users: UserI[];
    isLoading: boolean;
    isError: boolean;
  }>,
  action: PayloadAction<
    any,
    string,
    { arg: UserI; requestId: string; requestStatus: "fulfilled" },
    never
  >
) {
  state.users = state.users.map((user: UserI) =>
    action.payload.id === user.id ? action.payload : user
  );
}

export function deleteUserReducer(
  state: WritableDraft<{
    users: UserI[];
    isLoading: boolean;
    isError: boolean;
  }>,
  action: { payload: any; type?: string }
) {
  state.users = state.users.filter((user: UserI) => user.id !== action.payload);
}
