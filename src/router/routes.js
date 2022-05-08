const routes = [
  {
    path: "/",
    component: () => import("../layout/Layout.vue"),
    children: [
      {
        path: "dashboard",
        name: "dashboard@home",
        component: () => import("../views/dashboard/Home.vue"),
      },
      {
        path: "customers",
        name: "customer@home",
        component: () => import("../views/customer/Home.vue"),
      },
      {
        path: "orders",
        name: "order@home",
        component: () => import("../views/order/Home.vue"),
      },
    ],
  },
];

export default routes;
