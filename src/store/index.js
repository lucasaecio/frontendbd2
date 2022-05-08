import Vue from "vue";
import Vuex from "vuex";
import orders from "./orders";
import shippers from "./shippers";
import employees from "./employees";
import suppliers from "./suppliers";
import products from "./products";
import customers from "./customers";
import dashboard from "./dashboard";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dashboard,
    customers,
    products,
    orders,
    shippers,
    employees,
    suppliers,
  },
});
