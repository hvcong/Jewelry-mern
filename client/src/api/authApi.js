import fetchData from "./fetchClient";
import { api } from "../store/constants";
import axiosClient from "./axiosClient";
const newApi = api + "/auth";

const authApi = {
  getAll: async () => {
    return;
  },

  delete: async (id) => {
    return;
  },

  checkAccessToken: async () => {
    return;
  },

  login: async ({ email, password }) => {
    console.log(email, password);
    if (email == "hvcong@gmail.com" && password == "1111111") {
      return {
        email: email,
        role: "ad",
        name: "Hoang Van Cong",
      };
    }
    return null;
  },

  register: async (data) => {
    if (data.email == "hvcong@gmail.com") {
      return {
        email: data.email,
        role: "ad",
        name: "Hoang Van Cong",
      };
    } else {
      return null;
    }
  },
};
export default authApi;
