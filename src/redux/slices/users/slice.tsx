import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserI } from "../../../models/UserI";

import {
  getAllUsersReducer,
  addUserReducer,
  editUserReducer,
  deleteUserReducer,
} from "./reducers";

import usersService from "./service";

const initialState = {
  users: [],
  isLoading: false,
  isError: false,
};

// Requests
export const getAllUsersRequest = createAsyncThunk(
  "users/getAllUsersRequest",
  async () => await usersService.getAllUsers()
);

export const addUserRequest = createAsyncThunk(
  "users/addUserRequest",
  async (user: UserI) => await usersService.addUser(user)
);

export const editUserRequest = createAsyncThunk(
  "users/editUserRequest",
  async (user: UserI) => await usersService.editUser(user)
);

export const deleteUserRequest = createAsyncThunk(
  "users/removeUserRequest",
  async (id: string) => await usersService.deleteUser(id)
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch users
    builder.addCase(getAllUsersRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });

    builder.addCase(getAllUsersRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      getAllUsersReducer(state, action);
    });

    builder.addCase(getAllUsersRequest.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Add user
    builder.addCase(addUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      addUserReducer(state, action);
    });
    builder.addCase(addUserRequest.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Edit user
    builder.addCase(editUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(editUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      editUserReducer(state, action);
    });
    builder.addCase(editUserRequest.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });

    // Delete user
    builder.addCase(deleteUserRequest.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(deleteUserRequest.fulfilled, (state, action) => {
      state.isLoading = false;
      deleteUserReducer(state, action);
    });
    builder.addCase(deleteUserRequest.rejected, (state) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default usersSlice.reducer;
