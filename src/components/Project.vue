<template>
  <!-- <q-page class="flex flex-center"> -->
        <div class="q-pa-md">
            <q-table
            class="my-sticky-header-table"
            title="Treats"
            :data="data"
            :columns="columns"
            row-key="name"
            flat
            bordered
            ></q-table>
        </div>
  <!-- </q-page> -->
</template>

<style lang="stylus">

.my-sticky-header-table
  /* max height is important */
  .q-table__middle
    max-height 200px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
    background-color #c1f4cd

  thead tr:first-child th
    position sticky
    top 0
    opacity 1
    z-index 1
</style>

<script>

import project from "../api/project/index"
import { constants } from 'crypto';
export default {
  name: 'Project',

  data () {
    return {
      columns: [
        {
          name: 'idProject', //nama kolom
          required: true, //boleh kosong atau tidak
          label: 'ID Project', //label di tabel
          align: 'center', 
          field: row => row.id, //nama field dari database
          sortable: true
        },
        {
          name: 'nameProject',
          required: true, 
          label: 'Project Name',
          align: 'left', 
          field: row => row.projectName,
          sortable: true
        },
        {
          name: 'capacity',
          required: true,
          align: 'center',
          label: 'Kapasitas',
          field: row => row.capacity,
          sortable: true
        },
        {
          name: 'startDate',
          required: true,
          label: 'Start Date',
          align: 'center',
          field: row => row.startDate,
          sortable: true
        },
        {
          name: 'endDate',
          required: true,
          label: 'End Date',
          align: 'center',
          field: row => row.endDate,
          sortable: true
        },
        {
          name: 'status',
          required: true,
          label: 'Status',
          align: 'center',
          field: row => row.status,
          sortable: true
        },
        {
          name: 'paymentStatus',
          required: true,
          label: 'Payment Status',
          align: 'center',
          field: row => row.paymentStatus,
          sortable: true
        },
        {
          name: 'createAt',
          required: true,
          label: 'TimeStamps',
          align: 'center',
          field: row => row.createAt,
          sortable: true
        }
      ],

      data: []
    }
  },

  beforeCreate(){
      let self = this

      project.getAllProject(window).then(function(datas){
          return datas
      }).then(function(res){
          console.log(res)
          self.data = res
      }).catch(function(err){
          console.log(err)
      })
  }

}
</script>
