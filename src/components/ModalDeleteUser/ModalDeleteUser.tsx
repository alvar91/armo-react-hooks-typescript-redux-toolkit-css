import { memo } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button } from "@mui/material";
import { SelectedRowI } from "../../models/SelectedRowI";

import { useAppDispatch } from "../../redux/store";
import { deleteUserRequest } from "../../redux/slices/users/slice";

import { modalStyle } from "../../constants/modalStyle";

import styles from "./ModalDeleteUser.module.css";

interface ModalDeleteUserPropsI {
  selectedRow: SelectedRowI;
  isModalDeleteOpened: boolean;
  closeDeleteModalHandler: () => void;
}

const ModalDeleteUser = ({
  selectedRow: {
    id,
    row: { lastName, name },
  },
  isModalDeleteOpened,
  closeDeleteModalHandler,
}: ModalDeleteUserPropsI) => {
  const dispatch = useAppDispatch();

  const deleteHandler = () => {
    if (id !== null) {
      dispatch(deleteUserRequest(id));
      closeDeleteModalHandler();
    }
  };

  return (
    <Modal open={isModalDeleteOpened} onClose={closeDeleteModalHandler}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
          Удаление пользователя: {id}
        </Typography>
        <Typography component="p" sx={{ mb: 2 }}>
          Уверены, что хотите удалить пользователя: {lastName} {name}?
        </Typography>

        <div className={styles.buttonsGroup}>
          <Button color="error" onClick={deleteHandler} variant="contained">
            Удалить
          </Button>
          <Button
            onClick={closeDeleteModalHandler}
            variant="contained"
            color="primary"
          >
            Закрыть
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default memo(ModalDeleteUser);
