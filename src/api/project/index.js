import VueResource from 'vue-resource'
import Vue from 'vue'
import {getApiNoAuth} from '../utils'

Vue.use(VueResource)

export default {
    getAllProject (window){
        return getApiNoAuth().get('Projects?filter=%7B%22include%22%3A%7B%22relation%22%3A%22employee%22%2C%22scope%22%3A%7B%22include%22%3A%22roles%22%7D%7D%7D') //lihat di request url loopback
            .then(function (response){
                console.log(response)
                return response.data
            }).catch(function(err){
                console.log(err)
            })
    },

    // getDetailProject (window){
    //     return getApiNoAuth().get('Projects?') //lihat di request url loopback
    //         .then(function (response){
    //             console.log(response)
    //             return response.data
    //         }).catch(function(err){
    //             console.log(err)
    //         })
    // },

}