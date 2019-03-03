window.onload = function() {
    document.getElementById('area').addEventListener('click', function() {
      initAutocomplete()
    })
}
  
var autocomplete

function initAutocomplete() {
    let options = {
      types: ['geocode'],
      componentRestrictions: {
        country: "in"
      }
    }
    autocomplete = new google.maps.places.Autocomplete(
        document.getElementById('area'), options);
  
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components.
    // autocomplete.setFields('address_components');
  
    autocomplete.addListener('place_changed', fillInAddress);
  }
  
  function fillInAddress() {
    let place = autocomplete.getPlace()
    let formatted_address = place.formatted_address
    let splitted = formatted_address.split(",")
  
    let length = splitted.length
    // district
    let district = splitted[length-3]
  
    // state
    let stateWithPin = splitted[length-2]
    let state = stateWithPin.trim().split(" ")[0]
    let pincode = stateWithPin.trim().split(" ")[1]
  
    document.getElementById('district').value = district
    document.getElementById('state').value = state
    document.getElementById('pincode').value = pincode
  
    console.log(autocomplete)
  }
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
