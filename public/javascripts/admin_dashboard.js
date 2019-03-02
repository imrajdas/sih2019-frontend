$(function () {
    $('#datetimepicker1').datetimepicker();
});


window.onload = function() {
  document.getElementById('postingarea').addEventListener('click', function() {
    initAutocomplete()
  })
}

var autocomplete

function addOfficier(){
    console.log('add officier')
    var data = {
        firstname : document.getElementById('firstname').value,
        lastname : document.getElementById('lastname').value,
        rank : document.getElementById('rank').value,
        postingarea : document.getElementById('postingarea').value,
        postingstate : document.getElementById('state').value,
        postingdistrict : document.getElementById('district').value,
        postingpincode : document.getElementById('pincode').value,
        postedfrom : document.getElementById('postedfrom').value,
        email : document.getElementById('email').value,
        phone : document.getElementById('phone').value
    }


    console.log(data.postedfrom)

    axios.post('https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/add/officier', data)
    .then(function (response) {
      console.log(response);
      if(response.status === 200){
        Swal.fire(
          'Success!',
          'Officer is successfully added.',
          'success'
        )
      }

    })
    .catch(function (error) {
      console.log(error);
    });


    
}

function initAutocomplete() {
  let options = {
    types: ['geocode'],
    componentRestrictions: {
      country: "in"
    }
  }
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('postingarea'), options);

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