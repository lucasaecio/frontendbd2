const SET_CUSTOMERS = (state, data) => {
  state.customers = data;
};

const SET_SPECIFIED_CUSTOMER = (state, data) => {
  state.customer = data;
};

export { SET_CUSTOMERS, SET_SPECIFIED_CUSTOMER };
