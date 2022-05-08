<template>
  <v-container tag="section" class="mt-7">
    <div class="cards">
      <div>
        <span class="select">
          <v-select
            v-model="supplierFilterID"
            :items="suppliers"
            item-text="CompanyName"
            item-value="SupplierID"
            label="Fornecedor"
            required
          ></v-select>
        </span>
        <v-btn color="primary" elevation="2" @click="filterSupplier"
          >Filtrar</v-btn
        >
      </div>
    </div>

    <div
      class="chart-card mt-5"
      :class="{ 'default-chart': !isChatDataAvailable }"
      :key="forceUpdate"
    >
      <LineChartGenerator
        :chart-data="chartData"
        :chart-options="chartOptions"
        :width="700"
        v-if="isChatDataAvailable"
      />
      <p v-else>Nenhum dado disponível para o gráfico</p>
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  components: { LineChartGenerator },
  data: () => ({
    supplierFilterID: 0,
    forceUpdate: 0,
    chartData: {
      labels: [],
      datasets: [],
    },
    chartOptions: {
      responsive: true,
      elements: {
        line: {
          fill: true,
        },
      },
    },
  }),
  methods: {
    filterSupplier() {
      this.getDashboardData({ SupplierID: this.supplierFilterID }).then(
        (response) => {
          this.chartData.labels = response.products;
          let companiesData = Object.values(response.companies);

          companiesData.map((company, index) => {
            let sum = company.data.reduce(function (
              previousValue,
              currentValue
            ) {
              return previousValue + currentValue;
            });

            if (sum <= 150) {
              companiesData.splice(index, 1);
            }
          });

          this.chartData.datasets = companiesData;
          this.forceUpdate++;
        }
      );
    },
    ...mapActions({
      getAllSuppliers: "suppliers/getAllSuppliers",
      getDashboardData: "dashboard/getDashboardData",
    }),
  },
  computed: {
    ...mapState("suppliers", ["suppliers"]),
    isChatDataAvailable() {
      return (
        this.chartData.labels.length > 1 && this.chartData.datasets.length > 1
      );
    },
  },
  created() {
    this.getAllSuppliers();
  },
};
</script>

<style scoped>
.default-chart {
  height: 327px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9c9c9c;
}
.cards {
  display: flex;
  justify-content: space-between;
}

.chart-card {
  border: 1px solid #f2f2f2;
  border-radius: 10px;
  padding: 10px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.cards > div:first-child {
  width: 100%;
  display: flex;
  flex-direction: row;
  border: 1px solid #f2f2f2;
  align-items: center;
  border-radius: 10px;
  padding: 0px 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
}

.cards .select,
.cards button {
  flex: 1;
  margin: 10px;
}

@media (min-width: 992px) {
  section.container {
    max-width: 960px;
  }
}
</style>
