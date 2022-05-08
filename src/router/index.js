import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "hash",
  scrollBehavior() {
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

router.beforeEach((to, from, next) => {
  // verifique se a rota requer autenticação e o usuário não está logado

  // se logado, redireciona para o dashboard
  if (to.path === "/") {
    next({ name: "customer@home" });
    return;
  }
  next();
});

export default router;
