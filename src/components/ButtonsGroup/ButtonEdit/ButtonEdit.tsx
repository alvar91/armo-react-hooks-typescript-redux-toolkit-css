import { memo } from "react";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";

import { SelectedRowI } from "../../../models/SelectedRowI";

interface ButtonEditPropsI {
  selectedRow: SelectedRowI | null;
  openEditModalHandler: () => void;
}

const ButtonEdit = ({
  selectedRow,
  openEditModalHandler,
}: ButtonEditPropsI) => {
  const handlerOpenModal = () => {
    if (selectedRow === null)
      toast.error("Для изменения пользователя, выберите его из списка.");
    else openEditModalHandler();
  };

  return (
    <Button onClick={handlerOpenModal} variant="contained">
      Изменить
    </Button>
  );
};

export default memo(ButtonEdit);
