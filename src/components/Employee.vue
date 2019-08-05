<template>
  <q-page>
    <div class="row">
      <div class="col-md-4 q-pa-md">
        <div id="loginHeader">Create New Employee</div>
        <hr />
        <br />
        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
          <q-input
            autofocus
            filled
            v-model="firstname"
            label="First Name*"
            hint="Employee First Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />
          <q-input
            filled
            v-model="lastname"
            label="Last Name*"
            hint="Employee Last Name"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="email"
            label="Email*"
            hint="Employee Email"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <q-input
            filled
            v-model="phone"
            label="Phone Number*"
            hint="Employee Phone Number"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please type something']"
          />

          <select v-model="projectModel">
            <option v-for="option in projectData" v-bind:value="option.id">{{ option.projectName }}</option>
          </select>

          <b-form-select v-model="selected" class="mb-3">
            <option :value="null">Please select an option</option>
            <option value="a">Option A</option>
            <option value="b" disabled>Option B (disabled)</option>
            <optgroup label="Grouped Options">
              <option :value="{ C: '3PO' }">Option with object value</option>
              <option :value="{ R: '2D2' }">Another option with object value</option>
            </optgroup>
          </b-form-select>

          <!-- <q-select outlined v-model="projectModel" :options="projectNama" label="Project Name" /> -->

          <q-toggle v-model="accept" label="I accept the license and terms" />

          <div>
            <q-btn label="Submit" type="submit" color="primary" />
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </div>
      <div class="col-md-8 q-pa-md">
        <q-table
          class="my-sticky-header-table"
          title="Data Employees"
          :data="employeeData"
          :columns="columns"
          row-key="name"
          flat
          bordered
        ></q-table>
      </div>
    </div>

    <!-- <div class="row">

        <div class="sm-col-6">
          <p>ini firstname</p>
          <button @click="getFirstNameOnly()">FirstName</button>
          <div>
            <p>{{firstNameDataOnly}}</p>
          </div>
        </div>

        <div class="sm-col-6">
          <p>ini lastname</p>
          <button @click="getLastNameOnly()">LastName</button>
          <div>
            <p>{{lastNameDataOnly}}</p>
          </div>
        </div>

      </div>
      
    <button @click="createEmployee()">Submit</button>-->
  </q-page>
</template>

<style>
#loginHeader {
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
</style>

<script>

//import Vue from 'vue'

import employee from "../api/employee/index";
import project from "../api/project/index";

// import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import BootstrapVue from 'bootstrap-vue'

import { constants } from "crypto";
import { runInThisContext } from "vm";

Vue.use(BootstrapVue)

export default {
  name: "Employee",

  data() {
    return {
      firstNameDataOnly: [],
      lastNameDataOnly: [],
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      accept: false,
      projectModel: "",
      // param:{
      //   "firstName": "gugun",
      //   "lastName": "hitomi",
      //   "email": "gugun@ymail.com",
      //   "phone": "098878301235"
      // }
      columns: [
        {
          name: "idEmployee", //nama kolom
          required: true, //boleh kosong atau tidak
          label: "ID Employee", //label di tabel
          align: "left",
          field: row => row.id, //nama field dari database
          sortable: true
        },
        {
          name: "FirstNameEmployee",
          required: true,
          label: "First Name",
          align: "left",
          field: row => row.firstName,
          sortable: true
        },
        {
          name: "LastNameEmployee",
          required: true,
          align: "left",
          label: "Last Name",
          field: row => row.lastName,
          sortable: true
        },
        {
          name: "emailEmployee",
          required: true,
          label: "Email",
          align: "left",
          field: row => row.email,
          sortable: true
        },
        {
          name: "phoneEmployee",
          required: true,
          label: "Phone Number",
          align: "left",
          field: row => row.phone,
          sortable: true
        },
        {
          name: "createAt",
          required: true,
          label: "TimeStamps",
          align: "left",
          field: row => row.createAt,
          sortable: true
        }
      ],
      employeeData: [],

      projectData: [],
      idProject: []
    };
  },

  methods: {
    getFirstNameOnly() {
      const self = this;
      employee
        .getEmployee(window)
        .then(function(datas) {
          console.log("ini data nama depan ", datas);
          for (let i = 0; i < datas.length; i++) {
            self.firstNameDataOnly.push(datas[i].firstName); //firstName field di database
          }
          return datas;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    getLastNameOnly() {
      const self = this;
      employee
        .getEmployee(window)
        .then(function(datas) {
          console.log("ini data nama belakang ", datas);
          for (let i = 0; i < datas.length; i++) {
            self.lastNameDataOnly.push(datas[i].lastName);
          }
          return datas;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    createEmployee() {
      const self = this;
      employee
        .postEmployee(window, self.param)
        .then(function(result) {
          return result;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    onSubmit() {
      if (this.accept !== true) {
        this.$q.notify({
          color: "red-5",
          textColor: "white",
          icon: "fas fa-exclamation-triangle",
          message: "You need to accept the license and terms first"
        });
      } else {
        let param = {
          firstName: this.firstname,
          lastName: this.lastname,
          email: this.email,
          phone: this.phone,
          projectId: this.projectModel
        };

        const self = this;
        employee
          .postEmployee(window, param)
          .then(function(result) {
            return result;
          })
          .catch(function(err) {
            console.log(err);
          });

        employee
          .getEmployee(window)
          .then(function(datas) {
            return datas;
          })
          .then(function(res) {
            console.log(res);
            self.employeeData = res;
          })
          .catch(function(err) {
            console.log(err);
          });

        this.$q.notify({
          color: "green-4",
          textColor: "white",
          icon: "fas fa-check-circle",
          message: "Submitted"
        });
      }
    },

    onRefresh() {
      let self = this;
      employee
        .getEmployee(window)
        .then(function(datas) {
          return datas;
        })
        .then(function(res) {
          console.log("jnijnijn : ", res);
          self.employeeData = res;
        })
        .catch(function(err) {
          console.log(err);
        });
    },

    onReset() {
      this.firstname = null;
      this.lastname = null;
      this.email = null;
      this.phone = null;
    },

    onItemClick() {
      console.log("Clicked on an Item");
    }
  },

  beforeCreate() {
    let self = this;

    employee
      .getEmployee(window)
      .then(function(datas) {
        return datas;
      })
      .then(function(res) {
        console.log(res);
        self.employeeData = res;
      })
      .catch(function(err) {
        console.log(err);
      });

    project
      .getAllProject(window)
      .then(function(datas) {
        return datas;
      })
      .then(function(res) {
        console.log(res);
        self.projectData = res;
      })
      .catch(function(err) {
        console.log(err);
      });

    // project
    //   .getAllProject(window)
    //   .then(function(datas) {
    //     console.log("ini data project", datas);
    //     for (let i = 0; i < datas.length; i++) {
    //       self.projectNama.push(datas[i].projectName);
    //       self.idProject.push(datas[i].id);
    //     }
    //     return datas;
    //   })
    //   .catch(function(err) {
    //     console.log(err);
    //   });
  }
};
</script>
