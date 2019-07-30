<template>
  <q-page class="flex flex-center">
      <div>{{employeeData}}</div>

      <div class="row">

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
      
      <button @click="createEmployee()">Submit</button>

      
  </q-page>
</template>

<style>
</style>

<script>

import employee from "../api/employee/index"
import { constants } from 'crypto';
export default {
  name: 'Employee',

  data () {
    return {
      employeeData: {},
      firstNameDataOnly: [],
      lastNameDataOnly: [],
      param:{
        "firstName": "gugun",
        "lastName": "hitomi",
        "email": "gugun@ymail.com",
        "phone": "098878301235"
      }
    }
  },

  methods: {
    getFirstNameOnly(){
      const self = this;
      employee.getEmployee(window).then(function(datas){
        console.log('ini data nama depan ', datas)
        for(let i=0; i < datas.length; i++){
          self.firstNameDataOnly.push(datas[i].firstName) //firstName field di database
        }
        return datas;
      }).catch(function(err){
        console.log(err)
      });
    },

    getLastNameOnly(){
      const self = this;
      employee.getEmployee(window).then(function(datas){
        console.log('ini data nama belakang ', datas)
        for(let i=0; i < datas.length; i++){
          self.lastNameDataOnly.push(datas[i].lastName)
        }
        return datas;
      }).catch(function(err){
        console.log(err)
      });
    },

    createEmployee(){
      const self = this;
      employee.postEmployee(window, self.param).then(function(result){
        return result;
      }).catch(function(err){
        console.log(err)
      })
    }

  },

  beforeCreate () {

      let self = this

      employee.getEmployee(window).then(function (datas){
          return datas
      }).then(function(res){
          console.log(res)
          self.employeeData = res
      }).catch(function(err){
          console.log(err)
      })
  }
}
</script>
