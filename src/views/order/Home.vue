<template>
  <v-container tag="section">
    <order-table></order-table>
  </v-container>
</template>

<script>
import table from "@/views/order/components/OrderTable.vue";
export default {
  name: "orderHome",
  components: { "order-table": table },
};
</script>

<style></style>
