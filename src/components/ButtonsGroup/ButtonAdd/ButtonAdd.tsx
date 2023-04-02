import { memo } from "react";
import Button from "@mui/material/Button";

interface ButtonAddPropsI {
  openAddModalHandler: () => void;
}

const ButtonAdd = ({ openAddModalHandler }: ButtonAddPropsI) => {
  return (
    <Button onClick={openAddModalHandler} variant="contained" color="success">
      Добавить
    </Button>
  );
};

export default memo(ButtonAdd);
