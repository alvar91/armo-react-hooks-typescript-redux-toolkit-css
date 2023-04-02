import { memo, useState } from "react";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import { validationMessages } from "../../constants/validationMessages";

import moment from "moment";
import { adultYear } from "../../constants/adultYear";

import styles from "./ModalEditUser.module.css";
import { useAppDispatch } from "../../redux/store";

import { SelectedRowI } from "../../models/SelectedRowI";
import { modalStyle } from "../../constants/modalStyle";
import { normalizeDateString } from "../../utils/normalizeDateString";
import { editUserRequest } from "../../redux/slices/users/slice";

const userValidationSchema = yup
  .object({
    email: yup
      .string()
      .required(validationMessages.required)
      .email(validationMessages.email),

    name: yup.string().required(validationMessages.required),
    lastName: yup.string().required(validationMessages.required),

    birthDate: yup
      .string()
      .required(validationMessages.required)
      .test("isAdult", validationMessages.adult, function (value, ctx) {
        if (value !== undefined) {
          const validationDate = new Date(value);
          const nowDate = new Date();
          const valid =
            moment(nowDate).diff(moment(validationDate), "years") >= adultYear;

          return !valid ? ctx.createError() : valid;
        }
      }),
  })
  .required();

interface ModalEditUserPropsI {
  selectedRow: SelectedRowI | null;
  isModalEditOpened: boolean;
  closeEditModalHandler: () => void;
}

const ModalEditUser = ({
  selectedRow,
  isModalEditOpened,
  closeEditModalHandler,
}: ModalEditUserPropsI) => {
  const dispatch = useAppDispatch();

  // Initial values
  const row = selectedRow?.row;
  const initLastName = row?.lastName;
  const initName = row?.name;
  const initEmail = row?.email;
  const initBirthDate =
    typeof row?.birthDate === "string"
      ? normalizeDateString(row?.birthDate)
      : "";

  const initId = row?.id;
  const initAccess = row?.access ?? false;

  // Form validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userValidationSchema),
  });


  const [isChecked, setChecked] = useState<boolean>(initAccess);

  const setCheckedHandler = () => {
    setChecked(!isChecked);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const { birthDate, email, name, lastName } = formData;

    if (initId) {
      dispatch(
        editUserRequest({
          id: initId,
          email,
          name,
          lastName,
          birthDate,
          access: isChecked,
        })
      );

      closeEditModalHandler();
    }
  };

  return (
    <Modal open={isModalEditOpened} onClose={closeEditModalHandler}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h6">
          Изменение пользователя: {initId}
        </Typography>

        <form
          noValidate
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="lastName"
            defaultValue={initLastName}
            label="Фамилия"
            error={!!errors.lastName}
            helperText={errors.lastName ? `${errors.lastName.message}` : ""}
            {...register("lastName")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            id="name"
            label="Имя"
            defaultValue={initName}
            error={!!errors.name}
            helperText={errors.name ? `${errors.name.message}` : ""}
            {...register("name")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            id="email"
            label="Email"
            defaultValue={initEmail}
            error={!!errors.email}
            helperText={errors.email ? `${errors.email.message}` : ""}
            type="email"
            {...register("email")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <TextField
            id="birthDate"
            label="Дата рождения"
            defaultValue={initBirthDate}
            type="date"
            error={!!errors.birthDate}
            helperText={errors.birthDate ? `${errors.birthDate.message}` : ""}
            {...register("birthDate")}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={isChecked}
                onChange={setCheckedHandler}
                name="allow"
                aria-label={"Доступ"}
              />
            }
            label="Доступ"
          />

          <div className={styles.buttonsGroup}>
            <Button color="primary" type="submit" variant="contained">
              Изменить
            </Button>
            <Button
              onClick={closeEditModalHandler}
              variant="contained"
              color="error"
            >
              Закрыть
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default memo(ModalEditUser);
