import axiosClient from "./axiosClient";

const authApi = {
  getAll: async () => {
    let url = `account`;
    return axiosClient.get(url);
  },

  delete: async (id) => {
    return axiosClient.delete(`account/delete/${id}`);
  },

  checkAccessToken: async () => {
    return;
  },

  updateUser: async (formData) => {
    let url = `account/update`;
    return axiosClient.put(url, formData);
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

  register: async (formData) => {
    return axiosClient.post("account/add", formData);
  },
};
export default authApi;
