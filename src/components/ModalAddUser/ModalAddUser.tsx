import { memo, useState } from "react";

import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, FormControlLabel } from "@mui/material";

import moment from "moment";

import { modalStyle } from "../../constants/modalStyle";
import { addUserRequest } from "../../redux/slices/users/slice";
import { useAppDispatch } from "../../redux/store";

import { validationMessages } from "../../constants/validationMessages";
import { adultYear } from "../../constants/adultYear";

import styles from "./ModalAddUser.module.css";

const userValidationSchema = yup
  .object({
    id: yup.string().required(validationMessages.required),
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

interface ModalAddUserPropsI {
  isModalAddOpened: boolean;
  closeAddModalHandler: () => void;
}

const ModalAddUser = ({
  isModalAddOpened,
  closeAddModalHandler,
}: ModalAddUserPropsI) => {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(userValidationSchema),
  });

  const [isChecked, setChecked] = useState<boolean>(false);

  const setCheckedHandler = () => {
    setChecked(!isChecked);
  };

  const onSubmit: SubmitHandler<FieldValues> = async (formData) => {
    const { birthDate, email, name, id, lastName } = formData;

    dispatch(
      addUserRequest({
        id,
        email,
        name,
        lastName,
        birthDate,
        access: isChecked,
      })
    );

    closeAddModalHandler();
  };

  return (
    <Modal open={isModalAddOpened} onClose={closeAddModalHandler}>
      <Box sx={modalStyle}>
        <Typography variant="h6" component="h6">
          Добавление пользователя
        </Typography>

        <form
          noValidate
          className={styles.form}
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            id="id"
            label="Идентификатор"
            error={!!errors.id}
            helperText={errors.id ? `${errors.id.message}` : ""}
            {...register("id")}
            fullWidth
          />

          <TextField
            id="lastName"
            label="Фамилия"
            error={!!errors.lastName}
            helperText={errors.lastName ? `${errors.lastName.message}` : ""}
            {...register("lastName")}
            fullWidth
          />

          <TextField
            id="name"
            label="Имя"
            error={!!errors.name}
            helperText={errors.name ? `${errors.name.message}` : ""}
            {...register("name")}
            fullWidth
          />

          <TextField
            id="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email ? `${errors.email.message}` : ""}
            type="email"
            {...register("email")}
            fullWidth
          />

          <TextField
            id="birthDate"
            label="Дата рождения"
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
            <Button color="success" type="submit" variant="contained">
              Добавить
            </Button>
            <Button
              onClick={closeAddModalHandler}
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

export default memo(ModalAddUser);
