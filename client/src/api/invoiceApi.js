import { api } from "../store/constants";
import fetchData from "./fetchClient";

const newApi = api + "/invoices";

const invoiceApi = {
  // click payment
  create: async (invoice) => {
    try {
      const response = await fetchData(`${newApi}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoice),
      });

      return response;
    } catch (err) {
      return {
        success: false,
      };
    }
  },

  // for admin
  getAll: async () => {
    try {
      return await fetchData(`${newApi}/admin`, {
        method: "GET",
      });
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  deleteOne: async (id) => {
    try {
      const response = await fetchData(`${newApi}/admin/${id}`, {
        method: "DELETE",
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },

  updateOne: async ({ id, ...invoiceUpdate }) => {
    try {
      const response = await fetchData(`${newApi}/admin/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(invoiceUpdate),
      });

      return response;
    } catch (error) {
      return {
        success: false,
      };
    }
  },
};
export default invoiceApi;
