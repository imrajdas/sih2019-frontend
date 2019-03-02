function approved(id){

    var url = 'https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/complaint/update/'+id
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
        ).then(function(){
            location.reload();
        })
      
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
}

function decline(id){

    var url = 'https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/complaint/update/'+id
    var data = {
        type: 2
    }
    axios.put(url, data)
    .then(function (response) {
        // handle success
        console.log(response);
        Swal.fire(
            'Decline!',
            'Complaint has been Declined.',
            'success',
        ).then(function(){
            location.reload();
        })

    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
     
}