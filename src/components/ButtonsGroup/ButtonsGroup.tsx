import { memo } from "react";
import ButtonAdd from "./ButtonAdd";
import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import { SelectedRowI } from "../../models/SelectedRowI";

import styles from "./ButtonsGroup.module.css";

interface ButtonsGroupPropsI {
  openAddModalHandler: () => void;
  openEditModalHandler: () => void;
  openDeleteModalHandler: () => void;
  selectedRow: SelectedRowI | null;
}

const ButtonsGroup = ({
  openAddModalHandler,
  openEditModalHandler,
  openDeleteModalHandler,
  selectedRow,
}: ButtonsGroupPropsI) => {
  return (
    <div className={styles.buttonsGroup}>
      <ButtonAdd openAddModalHandler={openAddModalHandler} />

      <ButtonEdit
        openEditModalHandler={openEditModalHandler}
        selectedRow={selectedRow}
      />

      <ButtonDelete
        openDeleteModalHandler={openDeleteModalHandler}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default memo(ButtonsGroup);
