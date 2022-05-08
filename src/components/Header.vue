<template>
  <header>
    <v-app-bar app color="white" elevation="1">
      <v-container fluid>
        <v-row justify="center">
          <div>
            <router-link class="views_link" :to="{ name: 'dashboard@home' }">
              Dashboard
            </router-link>
            <span class="divider"></span>
            <router-link class="views_link" :to="{ name: 'customer@home' }">
              Clientes
            </router-link>
            <span class="divider"></span>
            <router-link class="views_link" :to="{ name: 'order@home' }">
              Compras
            </router-link>
          </div>
        </v-row>
      </v-container>
    </v-app-bar>
  </header>
</template>

<script>
export default {
  name: "header-app",
};
</script>

<style scoped>
.views_link {
  background-color: #f2f2f2;
  padding: 8px 21px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 500;
  color: #0072ed;
}

.views_link.router-link-exact-active {
  background-color: #238cff;
  color: #ffffff;
}

.divider {
  border-right: 2px solid #f2f2f2;
  margin: 0 6px;
  padding: 2px 0;
}
</style>
