function approved(id){

    var url = 'https://ft223ffr50.execute-api.ap-south-1.amazonaws.com/test/complaint/update/'+id
    var data = {
        type: 1
    }
    axios.put(url, data)
    .then(function (response) {
        // handle success
        console.log(response);
        Swal.fire(
            'Approved!',
            'Complaint has been approved.',
            'success'
        )
      
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        // always executed
    });


    
}