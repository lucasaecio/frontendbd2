<template>
  <v-container tag="section">
    <customer-table></customer-table>
  </v-container>
</template>

<script>
import table from "@/views/customer/components/CustomerTable.vue";
export default {
  name: "customerHome",
  components: { "customer-table": table },
};
</script>

<style></style>
