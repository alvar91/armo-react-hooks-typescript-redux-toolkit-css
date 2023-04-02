import { memo } from "react";

import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import { SelectedRowI } from "../../../models/SelectedRowI";

interface ButtonDeletePropsI {
  openDeleteModalHandler: () => void;
  selectedRow: SelectedRowI | null;
}

const ButtonDelete = ({
  openDeleteModalHandler,
  selectedRow,
}: ButtonDeletePropsI) => {
  const handlerDeletedUser = () => {
    if (selectedRow === null)
      toast.error("Для удаления пользователя, выберите его из списка.");
    else {
      openDeleteModalHandler();
    }
  };

  return (
    <Button onClick={handlerDeletedUser} variant="contained" color="error">
      Удалить
    </Button>
  );
};

export default memo(ButtonDelete);
