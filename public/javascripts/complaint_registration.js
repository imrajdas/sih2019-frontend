$('#union').hide('fast')

$('#yes').click(function(){
  $('#union').fadeIn('slow');
})

$('#no').click(function(){
  $('#union').fadeOut('slow');
})

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}

var placeSearch, autocomplete;

var componentForm = {
  street_number: 'short_name',
  route: 'long_name',
  locality: 'long_name',
  administrative_area_level_1: 'short_name',
  country: 'long_name',
  postal_code: 'short_name'
};

window.onload=function(){
  if(navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      let coords = position.coords;
      let geocoder = new google.maps.Geocoder
      geocoder.geocode({ 'location': { lat: coords.latitude, lng: coords.longitude }}, function(results, status) {
        if(status === "OK" && results[0]) {
          let input = document.getElementById('address')
          input.value = results[0].formatted_address

          let splitted = results[0].formatted_address.split(",")

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
        }
      })
    }, function(obj) {
      console.log("Not allowed")
    })
  }
  document.getElementById('register').addEventListener('click', register)
  document.getElementById('lin').addEventListener('click', function(){
    document.getElementById('lin').style.borderColor = "lightgray"
  })
  document.getElementById('fullname').addEventListener('click', function(){
      document.getElementById('fullname').style.borderColor = "lightgray"
  })
  document.getElementById('email').addEventListener('click', function(){
    document.getElementById('email').style.borderColor = "lightgray"

  })
  document.getElementById('phone').addEventListener('click', function(){
    document.getElementById('phone').style.borderColor = "lightgray"

  })
  document.getElementById('address').addEventListener('click', function(){
    document.getElementById('address').style.borderColor = "lightgray"
    initAutocomplete()

  })
  document.getElementById('district').addEventListener('click', function(){
    document.getElementById('district').style.borderColor = "lightgray"

  })
  document.getElementById('state').addEventListener('click', function(){
    document.getElementById('state').style.borderColor = "lightgray"

  })
  document.getElementById('pincode').addEventListener('click', function(){
    document.getElementById('pincode').style.borderColor = "lightgray"

  })
  document.getElementById('company').addEventListener('click', function(){
    document.getElementById('company').style.borderColor = "lightgray"

  })
  document.getElementById('rank').addEventListener('click', function(){
    document.getElementById('rank').style.borderColor = "lightgray"

  })
  document.getElementById('complaint_desc').addEventListener('click', function(){
    document.getElementById('complaint_desc').style.borderColor = "lightgray"
  })

  document.getElementById('union_leader').addEventListener('click', function(){
    document.getElementById('union_leader').style.borderColor = "lightgray"
  })

  document.getElementById('union_name').addEventListener('click', function(){
    document.getElementById('union_name').style.borderColor = "lightgray"
  })

}

function register(){

  var data = {
    fullname: document.getElementById('fullname').value,
    lin: document.getElementById('lin').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value, 
    address: document.getElementById('address').value,
    district: document.getElementById('district').value,
    state: document.getElementById('state').value,
    pincode: document.getElementById('pincode').value,
    company: document.getElementById('company').value,
    rank: document.getElementById('rank').value, 
    complaint_desc: document.getElementById('complaint_desc').value,
    union_name: document.getElementById('union_name').value,
    union_leader: document.getElementById('union_leader').value
  }
  
  if(!data.lin || !data.fullname || !data.email || !data.phone || !data.address || !data.district || !data.state || !data.pincode || !data.company || !data.rank || !data.complaint_desc){
    var div = document.createElement('div');

    div.innerHTML = '<div id="danger-alert" class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Please Fill the red highlighted inputs!</strong> You should check in on some of those fields below.<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
    document.getElementById("danger-alert").appendChild(div);

    if(!data.lin)
      document.getElementById('lin').style.borderColor = "red";
    if(!data.fullname)
      document.getElementById('fullname').style.borderColor = "red";
    if(!data.email)
      document.getElementById('email').style.borderColor = "red";
    if(!data.phone)
      document.getElementById('phone').style.borderColor = "red";
    if(!data.address)
      document.getElementById('address').style.borderColor = "red";
    if(!data.district)
      document.getElementById('district').style.borderColor = "red";
    if(!data.state)
      document.getElementById('state').style.borderColor = "red";
    if(!data.pincode)
      document.getElementById('pincode').style.borderColor = "red";
    if(!data.company)
      document.getElementById('company').style.borderColor = "red";
    if(!data.rank)
      document.getElementById('rank').style.borderColor = "red";
    if(!data.complaint_desc)
      document.getElementById('complaint_desc').style.borderColor = "red";


  }

  if(document.getElementById('yes').checked){
    if(!data.union_name)
    document.getElementById('union_name').style.borderColor = "red";
    if(!data.union_leader)
      document.getElementById('union_leader').style.borderColor = "red";

  }
  
  
  // if(parseIntdocument.getElementById('phone').value != 10){
  //   var div = document.createElement('div');
  //   div.innerHTML = '<div id="danger-alert" class="alert alert-danger alert-dismissible fade show" role="alert"><strong>Invalid Phone no!</strong> Phone number must be of 10 digits<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
  //   document.getElementById("danger-alert").appendChild(div);

  // }
  else {
      axios.post('https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/complaint/create', data)
    .then(function (response) {
      console.log(response);
      if(response.status === 200){
        Swal.fire(
          'Success!',
          'Complaint has been registered.',
          'success'
        )
      }

    })
    .catch(function (error) {
      console.log(error);
    });

  }
  
}

function initAutocomplete() {
  // Create the autocomplete object, restricting the search predictions to
  // geographical location types.
  let options = {
    types: ['geocode'],
    componentRestrictions: {
      country: "in"
    }
  }
  autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'), options);

  // Avoid paying for data that you don't need by restricting the set of
  // place fields that are returned to just the address components.
  // autocomplete.setFields('address_components');

  // When the user selects an address from the drop-down, populate the
  // address fields in the form.
  autocomplete.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
  // Get the place details from the autocomplete object.
  var place = autocomplete.getPlace();

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

  // for (var component in componentForm) {
  //   document.getElementById(component).value = '';
  //   document.getElementById(component).disabled = false;
  // }

  // Get each component of the address from the place details,
  // and then fill-in the corresponding field on the form.
  // for (var i = 0; i < place.address_components.length; i++) {
  //   var addressType = place.address_components[i].types[0];
  //   console.log(place)
    // if (componentForm[addressType]) {
    //   var val = place.address_components[i][componentForm[addressType]];
    //   document.getElementById(addressType).value = val;
    // }
  // }
}

// Bias the autocomplete object to the user's geographical location,
// as supplied by the browser's 'navigator.geolocation' object.
function geolocate() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var geolocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      var circle = new google.maps.Circle(
          {center: geolocation, radius: position.coords.accuracy});
      autocomplete.setBounds(circle.getBounds());
    });
  }
}
