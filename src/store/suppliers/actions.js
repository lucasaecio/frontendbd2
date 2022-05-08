/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */

const getAllSuppliers = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/suppliers`)
      .then((resp) => {
        commit("SET_ALL_SUPPLIERS", resp.data.data);
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export { getAllSuppliers };
