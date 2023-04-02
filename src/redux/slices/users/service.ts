import axios from "axios";
import { toast } from "react-toastify";
import { UserI } from "../../../models/UserI";

const API_URL = "https://retoolapi.dev/eqsQ4S/users/";

const getAllUsers = () => {
  return axios
    .get(API_URL)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.message);
      toast.error(`${error.message}`);
      throw error;
    });
};

const addUser = async (reqBody: UserI) => {
  return await axios
    .post(API_URL, reqBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.message);
      toast.error(`${error.message}`);
      throw error;
    });
};

const editUser = async (reqBody: UserI) => {
  return await axios
    .put(API_URL + reqBody.id, reqBody)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error(error.message);
      toast.error(`${error.message}`);
      throw error;
    });
};

const deleteUser = async (id: string) => {
  return await axios
    .delete(API_URL + id)
    .then(() => {
      return id;
    })
    .catch((error) => {
      console.error(error.message);
      toast.error(`${error.message}`);
      throw error;
    });
};

const usersService = {
  getAllUsers,
  addUser,
  editUser,
  deleteUser,
};

export default usersService;
