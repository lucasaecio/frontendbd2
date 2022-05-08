/*
 *  As actions abaixo são requisições feitas para o servidor portal-backend-v2
 *  Ex.Obtendo dados dos usuario atualizando excluindo imagem e criando redefinindo senha.
 */

const getAllEmployees = ({ commit }) => {
  return new Promise((resolve, reject) => {
    window.axios
      .get(`/employees`)
      .then((resp) => {
        commit("SET_ALL_EMPLOYEES", resp.data.data);
        resolve(resp.data.data);
      })
      .catch((error) => {
        reject(error.data.errors);
      });
  });
};

export { getAllEmployees };
