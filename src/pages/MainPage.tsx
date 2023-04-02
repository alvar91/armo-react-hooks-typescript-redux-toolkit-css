import { memo, useState, useEffect } from "react";

import { useAppDispatch } from "../redux/store";

import Layout from "../components/Layout";
import ButtonsGroup from "../components/ButtonsGroup";
import Table from "../components/Table";

import { SelectedRowI } from "../models/SelectedRowI";
import ModalAddUser from "../components/ModalAddUser/ModalAddUser";
import ModalEditUser from "../components/ModalEditUser";
import ModalDeleteUser from "../components/ModalDeleteUser";

import "react-toastify/dist/ReactToastify.css";

import { selectUsers, selectIsLoading } from "../redux/slices/users/selectors";
import { useSelector } from "react-redux";
import { getAllUsersRequest } from "../redux/slices/users/slice";

const MainPage = () => {
  const dispatch = useAppDispatch();

  // Fetch users
  const users = useSelector(selectUsers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getAllUsersRequest());
  }, [dispatch]);

  const [isModalAddOpened, setIsAddModalOpened] = useState<boolean>(false);
  const openAddModalHandler = () => {
    setIsAddModalOpened(true);
  };
  const closeAddModalHandler = () => {
    setIsAddModalOpened(false);
  };

  const [isModalEditOpened, setIsEditModalOpened] = useState<boolean>(false);
  const openEditModalHandler = () => {
    setIsEditModalOpened(true);
  };
  const closeEditModalHandler = () => {
    setIsEditModalOpened(false);
  };

  const [isModalDeleteOpened, setIsDeleteModalOpened] =
    useState<boolean>(false);
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpened(true);
  };
  const closeDeleteModalHandler = () => {
    setIsDeleteModalOpened(false);
  };

  const [selectedRow, setSelectedRow] = useState<SelectedRowI | null>(null);

  return (
    <Layout>
      <Table
        setSelectedRow={setSelectedRow}
        users={users}
        error={isError}
        isLoading={isLoading}
      />

      <ButtonsGroup
        openAddModalHandler={openAddModalHandler}
        openEditModalHandler={openEditModalHandler}
        openDeleteModalHandler={openDeleteModalHandler}
        selectedRow={selectedRow}
      />

      {isModalAddOpened && (
        <ModalAddUser
          isModalAddOpened={isModalAddOpened}
          closeAddModalHandler={closeAddModalHandler}
        />
      )}

      {isModalEditOpened && selectedRow && (
        <ModalEditUser
          selectedRow={selectedRow}
          isModalEditOpened={isModalEditOpened}
          closeEditModalHandler={closeEditModalHandler}
        />
      )}

      {isModalDeleteOpened && selectedRow && (
        <ModalDeleteUser
          selectedRow={selectedRow}
          isModalDeleteOpened={isModalDeleteOpened}
          closeDeleteModalHandler={closeDeleteModalHandler}
        />
      )}
    </Layout>
  );
};

export default memo(MainPage);
