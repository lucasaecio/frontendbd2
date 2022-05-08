<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="orders"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Compras</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="showDialogForm" max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Nova Compra
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-select
                      v-model="editedItem.EmployeeID"
                      :items="employees"
                      item-value="EmployeeID"
                      :item-text="
                        (item) => item.FirstName + ' ' + item.LastName
                      "
                      label="Funcionário"
                      required
                    >
                    </v-select>
                  </v-row>

                  <v-row>
                    <v-select
                      v-model="editedItem.customer"
                      :items="customers"
                      item-text="CompanyName"
                      return-object
                      label="Cliente"
                      required
                    ></v-select>
                  </v-row>
                  <v-row>
                    <v-select
                      v-model="editedItem.shipVia"
                      :items="shippers"
                      item-text="CompanyName"
                      item-value="ShipperID"
                      label="Forma de envio"
                      required
                    ></v-select>
                  </v-row>
                  <v-row v-for="qtd in productCount" :key="`product-` + qtd">
                    <v-col cols="5">
                      <v-select
                        v-model="editedItem.products[qtd - 1].ProductID"
                        :items="products"
                        item-text="ProductName"
                        item-value="ProductID"
                        label="Produto"
                        required
                      ></v-select>
                    </v-col>
                    <v-col cols="2">
                      <v-text-field
                        v-model="editedItem.products[qtd - 1].Quantity"
                        hide-details
                        single-line
                        type="number"
                        min="1"
                      />
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        :value="totalPriceProduct(editedItem.products[qtd - 1])"
                        label="Total do produto"
                        disabled
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn
                        small
                        fab
                        dark
                        color="indigo"
                        @click="addOrderProduct"
                      >
                        <v-icon dark> mdi-plus </v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-row>
                    <h1>Total da compra: {{ totalPriceAllProducts }}</h1>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDialogForm">
                  Cancelar
                </v-btn>
                <v-btn color="blue darken-1" text @click="save"> Salvar </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.Products`]="{ item }">
        <div
          v-for="orderDetail in item.OrderDetails"
          :key="'detail' + orderDetail.OrderID + orderDetail.ProductID"
        >
          <v-chip class="ma-2">
            {{ orderDetail.product[0].ProductName }} | Qtd:
            {{ orderDetail.Quantity }} | Preço:
            {{ orderDetail.UnitPrice | filterFloatNumber }}
          </v-chip>
        </div>
      </template>

      <template v-slot:[`item.TotalPrice`]="{ item }">
        <span>
          {{ calcTotalPrice(item.OrderDetails) }}
        </span>
      </template>

      <template v-slot:no-data>
        <p>Nenhuma compra cadastrada</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import Vue from "vue";
import { mapState, mapActions } from "vuex";
const DEFAULT_ORDER_PRODUCT = {
  ProductID: null,
  Quantity: 1,
};

export default {
  data: () => ({
    showDialogForm: false,
    headers: [
      {
        text: "OrderID",
        align: "start",
        value: "OrderID",
      },
      { text: "CustomerID", value: "CustomerID" },
      { text: "ShipPostalCode", value: "ShipPostalCode" },
      { text: "ShipAddress", value: "ShipAddress" },
      { text: "ShipCity", value: "ShipCity" },
      { text: "ShipCountry", value: "ShipCountry" },
      { text: "OrderDate", value: "OrderDate" },
      { text: "Products", value: "Products" },
      { text: "TotalPrice", value: "TotalPrice" },
    ],
    editedIndex: -1,
    editedItem: {
      EmployeeID: "",
      customer: {},
      products: [
        {
          ProductID: null,
          Quantity: 1,
        },
      ],
      shipVia: null,
    },
    defaultItem: {
      EmployeeID: "",
      customer: {},
      products: [],
      shipVia: null,
    },
    productCount: 1,
  }),

  computed: {
    ...mapState("orders", ["orders"]),
    ...mapState("customers", ["customers"]),
    ...mapState("products", ["products"]),
    ...mapState("shippers", ["shippers"]),
    ...mapState("employees", ["employees"]),
    formTitle() {
      return this.editedIndex === -1 ? "Nova Compra" : "Visualizar Compra";
    },
    totalPriceAllProducts() {
      let totalPrice = 0;
      this.editedItem.products.map((product) => {
        totalPrice += this.totalPriceProduct(product);
      });

      return totalPrice;
    },
  },
  filters: {
    filterFloatNumber(number) {
      return parseFloat(number).toFixed(1);
    },
  },

  methods: {
    totalPriceProduct(product) {
      let currentProduct = this.products.find(
        (element) => element.ProductID == product.ProductID
      );

      if (!currentProduct || !product.ProductID) {
        return 0;
      }

      return currentProduct.UnitPrice * product.Quantity;
    },
    addOrderProduct() {
      if (!this.editedItem.products[this.productCount - 1].ProductID) {
        return Vue.$toast.error("Seleciona um produto para adicionar outros");
      }

      this.editedItem.products.push({ ...DEFAULT_ORDER_PRODUCT });
      this.productCount++;
    },
    calcTotalPrice(orderDetails) {
      var sum = 0;
      orderDetails.map(function (oderDetail) {
        sum += oderDetail.Quantity * oderDetail.UnitPrice;
      });

      return sum.toFixed(2);
    },
    ...mapActions({
      getAllProducts: "products/getAllProducts",
      getAllOrders: "orders/getAllOrders",
      createOrder: "orders/createOrder",
    }),

    closeDialogForm() {
      this.showDialogForm = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.createOrder(this.editedItem).finally(() => {
        this.productCount = 1;
        this.editedItem.products = [{ ...DEFAULT_ORDER_PRODUCT }];

        this.getAllOrders();
      });

      this.closeDialogForm();
    },
  },
  created() {
    this.getAllOrders();
    this.getAllProducts();
  },
};
</script>

<style></style>
