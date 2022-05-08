/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */
import Vue from "vue";

const getAllOrders = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/orders`)
      .then((resp) => {
        commit("SET_ORDERS", resp.data.data);
        resolve(resp.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const createOrder = (context, payload) => {
  const formData = new FormData();
  formData.append("CustomerID", payload.customer.CustomerID);
  formData.append("EmployeeID", payload.EmployeeID);

  formData.append("ShipVia", payload.shipVia);
  formData.append("ShipName", payload.customer.CompanyName);
  formData.append("ShipAddress", payload.customer.Address);
  formData.append("ShipCity", payload.customer.City);
  formData.append("ShipPostalCode", payload.customer.PostalCode);
  formData.append("ShipCountry", payload.customer.Country);

  payload.products.forEach((item, index) => {
    formData.append(`products[${index}][ProductID]`, item.ProductID);
    formData.append(`products[${index}][Quantity]`, item.Quantity);
  });

  return new Promise((resolve, reject) => {
    window.axios
      .post(`/orders`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((resp) => {
        Vue.$toast.success("Compra efetuada com sucesso!");
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
      })
      .finally(() => {});
  });
};

export { getAllOrders, createOrder };
