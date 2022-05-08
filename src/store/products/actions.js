/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */

const getAllProducts = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/products`)
      .then((resp) => {
        commit("SET_ALL_PRODUCTS", resp.data.data);
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

export { getAllProducts };
