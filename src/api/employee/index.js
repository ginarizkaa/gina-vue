import VueResource from 'vue-resource'
import Vue from 'vue'
import {getApiNoAuth} from '../utils'

Vue.use(VueResource)

export default {
    getEmployee (window){
        return getApiNoAuth().get('Employees')
            .then(function (response){
                console.log(response)
                return response.data
            }).catch(function(err){
                console.log(err)
            })
    },
    postEmployee (window, param){
        return getApiNoAuth().post('Employees', param)
            .then(function (response){
                console.log(response)
                return response.data
            }).catch(function(err){
                console.log(err)
            })
    },

    
}