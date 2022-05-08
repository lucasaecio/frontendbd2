<template>
  <div>
    <Header></Header>
    <main id="content" role="main" class="main">
      <transition mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import { mapActions } from "vuex";

export default {
  components: { Header },
  methods: {
    ...mapActions({
      getAllCustomers: "customers/getAllCustomers",
      getAllShippers: "shippers/getAllShippers",
      getAllEmployees: "employees/getAllEmployees",
    }),
  },
  created() {
    Promise.all([
      this.getAllCustomers(),
      this.getAllShippers(),
      this.getAllEmployees(),
    ]);
  },
};
</script>

<style scoped>
.v-enter,
.v-leave-to {
  transform: translate3d(-20px, 0, 0);
  opacity: 0;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.1s;
}
</style>
