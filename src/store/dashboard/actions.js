/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */

const getDashboardData = (context, payload) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/products/dashboard/${payload.SupplierID}`)
      .then((resp) => {
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

export { getDashboardData };
