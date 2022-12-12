import fetchData from "./fetchClient";
import { api } from "../store/constants";
const newApi = api + "/auth";

const authApi = {
  getAll: async () => {
    try {
      return await fetchData(`${newApi}/users`);
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  delete: async (id) => {
    try {
      return await fetchData(`${newApi}/users/${id}`, {
        method: "DELETE",
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  checkAccessToken: async () => {
    try {
      return await fetchData(`${newApi}/check`, {
        method: "GET",
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  login: async (loginData) => {
    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
    try {
      return await fetchData(`${newApi}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
    } catch (err) {
      return { success: false };
    }
  },

  register: async (registerData) => {
    try {
      return await fetchData(`${newApi}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });
    } catch (err) {
      return {
        success: false,
        message: "Internal server error",
      };
    }
  },
};
export default authApi;
