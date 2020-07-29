var sendSMSService = function(lat0, lng0, lat1, lng1, distancia, destination) {
    return axios({
        method:"GET",
        // url: "http://localhost:8888",
        url: "https://pydistance.000webhostapp.com",
        params:{
            lato:lat0,
            lngo:lng0,
            latd:lat1,
            lngd:lng1,
            distance:distancia,
            destination:destination
        }
    }).then(function (res){
        return res.data
    } ).then(function (data){
        return Promise.resolve(data)
    }).catch(function(error){
        return Promise.reject(error);
    })
}