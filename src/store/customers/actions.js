/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */
import Vue from "vue";

const getAllCustomers = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/customers`)
      .then((resp) => {
        commit("SET_CUSTOMERS", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

const getSpecifiedProduct = ({ commit }, product_id) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/customers/${product_id}`)
      .then((resp) => {
        commit("SET_SPECIFIED_CUSTOMER", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

const updateCustomer = (context, payload) => {
  const formData = new FormData();
  formData.append("CompanyName", payload.CompanyName);
  formData.append("ContactName", payload.ContactName);
  formData.append("ContactTitle", payload.ContactTitle);
  formData.append("Address", payload.Address);
  formData.append("City", payload.City);
  formData.append("Region", payload.Region);
  formData.append("PostalCode", payload.PostalCode);
  formData.append("Country", payload.Country);
  formData.append("Phone", payload.Phone);
  formData.append("Fax", payload.Fax);

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/customers/${payload.CustomerID}?_method=PUT`, formData)
      .then((resp) => {
        Vue.$toast.success("Cliente atualizado com sucesso!");
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

const deleteCustomer = (context, CustomerID) => {
  return new Promise((resolve, reject) => {
    window.axios
      .delete(`/customers/${CustomerID}`)
      .then((resp) => {
        Vue.$toast.success("Cliente excluído com sucesso!");
        resolve(resp.data.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      })
      .finally(() => {});
  });
};

const createCustomer = (context, payload) => {
  const formData = new FormData();
  formData.append("CompanyName", payload.CompanyName);
  formData.append("ContactName", payload.ContactName);
  formData.append("ContactTitle", payload.ContactTitle);
  formData.append("Address", payload.Address);
  formData.append("City", payload.City);
  formData.append("Region", payload.Region);
  formData.append("PostalCode", payload.PostalCode);
  formData.append("Country", payload.Country);
  formData.append("Phone", payload.Phone);
  formData.append("Fax", payload.Fax);

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/customers`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => {
        Vue.$toast.success("Cliente criado com sucesso!");
        resolve(resp.data);
      })
      .catch((error) => {
        let objectError = error.response.data.errors;
        if (objectError) {
          Object.values(objectError).forEach((error, key) => {
            Vue.$toast.error(error[key]);
          });
        }
        reject(error.response);
      });
  });
};

export {
  getAllCustomers,
  getSpecifiedProduct,
  updateCustomer,
  deleteCustomer,
  createCustomer,
};
