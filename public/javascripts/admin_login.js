

function search(){
    var inspector_name = document.getElementById('inspector_name').value
    // var area = document.getElementById('area')
    var url = `https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/list/complaints/0`
    var data = {
        type: 4,
        search_name: inspector_name.toLowerCase().replace(/\s/g,''),
        postingpincode: '751024'
    }
    console.log(data);
    
    axios.post(url, data)
    .then(function (response) {
        console.log(response.data);
        var search_result = document.getElementById('search_result')
        var html = ''
        for(var i=0; i<response.data.message.length; i++){
            html += `<button class="list-group-item list-group-item-action active">
                            <div class="row">
                                <div class="col">Name</div>
                                <div class="col">Rank</div>
                                <div class="col">District</div>
                            </div>
                        </button>
                        <button class="list-group-item list-group-item-action" id="${response.data.message[i].officierid}">
                            <div class="row" onclick="selectOfficer(${response.data.message[i].officierid})" >
                                <div class="col" >
                                <b>${response.data.message[i].firstname} ${response.data.message[i].lastname}</b>
                                <input type="hidden" id= "officiername"  value="${response.data.message[i].firstname} ${response.data.message[i].lastname}" />
                                </div>
                                <div class="col"><b>${response.data.message[i].rank}</b></div>
                                <div class="col"><b>${response.data.message[i].postingdistrict}</b></div>
                            </div>
                        </button>
                        `
        }
        console.log(html);
        
        search_result.innerHTML = html
    })
    .catch(function (error) {
        console.log(error);
    })
}


function selectOfficer(id){
    
    
    const data = {
        type: 3,
        officierid: id,
        officername: document.getElementById('officiername').value,
        complainee_phoneno: document.getElementById('phone').value,
        complaintid: document.getElementById('complaintid').value,
        old_officierid: document.getElementById('officierid').value
    }
    console.log(data);
    
    var url = `https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/complaint/update/${data.complaintid}`
    axios.put(url, data)
    .then(function (response) {
        console.log(response.data);
        if (response.data.status == true) {
            Swal.fire(
                'Transferred!',
                'Complaint has been transferred.',
                'success'
            ).then(function(){
                location.reload();
            })
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}