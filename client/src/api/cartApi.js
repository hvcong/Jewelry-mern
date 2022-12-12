import fetchData from "./fetchClient";
import { api } from "../store/constants";
const newApi = api + "/cart";

const cartApi = {
  getAll: async () => {
    try {
      return await fetchData(`${newApi}`);
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  add: async (productId, quantity) => {
    try {
      return await fetchData(`${newApi}/${productId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: quantity ? quantity : 1 }),
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  plus: async (productId) => {
    try {
      let response = await fetchData(`${newApi}/${productId}/plus`, {
        method: "POST",
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  minus: async (productId) => {
    try {
      let response = await fetchData(`${newApi}/${productId}/minus`, {
        method: "POST",
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  remove: async (productId) => {
    try {
      const response = await fetchData(`${newApi}/${productId}`, {
        method: "DELETE",
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  resetCart: async () => {
    try {
      const response = await fetchData(`${newApi}/reset`, {
        method: "DELETE",
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};
export default cartApi;
