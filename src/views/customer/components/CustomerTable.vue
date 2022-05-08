<template>
  <v-container>
    <v-data-table :headers="headers" :items="customers" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Clientes</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="showDialogForm" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Novo Cliente
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col class="pl-0">
                      <v-text-field
                        v-model="editedItem.CompanyName"
                        label="Nome da empresa"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.ContactName"
                        label="Nome do contato"
                      ></v-text-field>
                    </v-col>

                    <v-col class="pr-0">
                      <v-text-field
                        v-model="editedItem.ContactTitle"
                        label="Cargo do contato"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row> </v-row>

                  <v-row>
                    <v-col class="pl-0">
                      <v-text-field
                        v-model="editedItem.Country"
                        label="País"
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="editedItem.Region"
                        label="Estado"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pr-0">
                      <v-text-field
                        v-model="editedItem.City"
                        label="Cidade"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col class="pl-0">
                      <v-text-field
                        v-model="editedItem.Address"
                        label="Endereço"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pr-0">
                      <v-text-field
                        v-model="editedItem.PostalCode"
                        label="CEP"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="pl-0">
                      <v-text-field
                        v-model="editedItem.Phone"
                        label="Celular"
                      ></v-text-field>
                    </v-col>
                    <v-col class="pr-0">
                      <v-text-field
                        v-model="editedItem.Fax"
                        label="Fax"
                      ></v-text-field>
                    </v-col>
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
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Tem certeza que deseja apagar?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDeleteDialog"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >Confirmar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>

      <template v-slot:[`item.description`]="{ value }">
        <div
          style="
            max-width: 17vw;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          "
        >
          {{ value }}
        </div>
      </template>

      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>

      <template v-slot:no-data>
        <p>Nenhum cliente cadastrado</p>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data: () => ({
    showDialogForm: false,
    dialogDelete: false,
    headers: [
      {
        text: "CustomerID",
        align: "start",
        value: "CustomerID",
      },
      { text: "CompanyName", value: "CompanyName" },
      { text: "ContactName", value: "ContactName" },
      { text: "ContactTitle", value: "ContactTitle" },
      { text: "Address", value: "Address" },
      { text: "Phone", value: "Phone" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: null,
    editedItem: {
      CompanyName: "",
      ContactName: "",
      ContactTitle: "",
      Address: "",
      City: "",
      Region: null,
      PostalCode: "",
      Country: "",
      Phone: "",
      Fax: "",
    },
    defaultItem: {
      CustomerID: "",
      CompanyName: "",
      ContactName: "",
      ContactTitle: "",
      Address: "",
      City: "",
      Region: null,
      PostalCode: "",
      Country: "",
      Phone: "",
      Fax: "",
    },
  }),

  computed: {
    ...mapState("customers", ["customers"]),
    formTitle() {
      return this.editedIndex === null ? "Novo Cliente" : "Atualizar Cliente";
    },
    updatingCustomer() {
      return !!this.editedIndex;
    },
    currentCustomerIndex() {
      return this.customers.findIndex((element) => {
        return element.CustomerID == this.editedIndex;
      });
    },
  },

  watch: {
    showDialogForm(val) {
      val || this.closeDialogForm();
    },
    dialogDelete(val) {
      val || this.closeDeleteDialog();
    },
  },

  methods: {
    ...mapActions({
      getAllCustomers: "customers/getAllCustomers",
      updateCustomer: "customers/updateCustomer",
      createCustomer: "customers/createCustomer",
      deleteCustomer: "customers/deleteCustomer",
    }),
    editItem(item) {
      this.editedItem = Object.assign({}, item);

      this.editedIndex = item.CustomerID;

      this.showDialogForm = true;
    },

    deleteItem(item) {
      this.editedItem = Object.assign({}, item);
      this.editedIndex = item.CustomerID;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      const indexToDelete = this.currentCustomerIndex;
      this.deleteCustomer(this.editedIndex).then((response) => {
        if (response.deleted) {
          this.customers.splice(indexToDelete, 1);
        }
      });
      this.closeDeleteDialog();
    },

    closeDialogForm() {
      this.showDialogForm = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = null;
      });
    },

    closeDeleteDialog() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = null;
      });
    },

    save() {
      if (!this.updatingCustomer) {
        this.createCustomer(this.editedItem).then((response) => {
          this.customers.push(response.data);
          this.customers.sort((a, b) =>
            a.CustomerID > b.CustomerID
              ? 1
              : b.CustomerID > a.CustomerID
              ? -1
              : 0
          );
        });
      } else {
        this.updateCustomer(this.editedItem).then(() => {
          this.getAllCustomers();
        });
      }
      this.closeDialogForm();
    },
    getContrastColor(hexcolor) {
      hexcolor = hexcolor.replace("#", "");
      var r = parseInt(hexcolor.substr(0, 2), 16);
      var g = parseInt(hexcolor.substr(2, 2), 16);
      var b = parseInt(hexcolor.substr(4, 2), 16);
      var yiq = (r * 299 + g * 587 + b * 114) / 1000;
      return yiq >= 128 ? "black" : "white";
    },
  },
};
</script>

<style></style>
