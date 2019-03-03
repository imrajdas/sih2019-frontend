var express = require('express');
var router = express.Router();
var moment = require('moment')
const checkAuth = require('../middleware/check-auth')
const axios = require('axios')
// let localStorage = require('localStorage')
var store = require('store-js')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.redirect('/admin/login');
  
});

router.get('/login', function(req, res, next) {
    res.render('admin_login', { title: 'Admin Login'})
});

router.post('/login', function(req, res, next) {

    axios.get(`https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/officier/login/${req.body.username}/${req.body.password}`)
    .then(function (response) {
      console.log(response.data);
      if(response.data.status === true){
        store.set('user', { officierid: response.data.message[0].officierid,
                            firstname: response.data.message[0].firstname, 
                            lastname: response.data.message[0].lastname,
                            postingarea: response.data.message[0].postingarea,
                            positionstate: response.data.message[0].positionstate,
                            positiondistrict: response.data.message[0].positiondistrict,
                            postingpincode: response.data.message[0].postingpincode,
                            postedfrom: response.data.message[0].postedfrom,
                            rank: response.data.message[0].rank,
                            email: response.data.message[0].email,
                            phone: response.data.message[0].phone,
                        })
        store.set('valid', 'true')
        res.redirect('/admin/home')
      }
    })
    .catch(function (error) {
      console.log(error);
    });

});

router.get('/home', checkAuth, function(req, res, next) {
    const user = store.get('user')
    console.log(user.officierid);
    
    const url = `https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${user.officierid}`
    console.log(url);

    const params = {
        type: 1
    }

    axios.post(`https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${user.officierid}`, params)
    .then(function (response) {
      console.log('response_home',response.data.message);
      res.render('admin_home', { title: 'Admin Home', data: response.data.message});
    })
    .catch(function (error) {
      console.log(error);
    });

});

router.get('/dashboard', function(req, res, next){
    
    var data = [{
        firstname: 'Raj',
        lastname: 'Das',
        rank: 'Sr. Offier',
        email: 'mail.rajdas@gmail.com',
        phone: '7809694275',
        postingarea: 'Patia',
        postedfrom: '2019-02-11'
    },
    {
        firstname: 'Raj',
        lastname: 'Das',
        rank: 'Sr. Offier',
        email: 'mail.rajdas@gmail.com',
        phone: '7809694275',
        postingarea: 'Patia',
        postedfrom: '2019-02-11'
    }]
    res.render('admin_dashboard', { title: 'Admin Dashboard', data: data })
})

router.get('/dum_complaint', function(req, res, next){
    
    res.render('dum_complaint', { title: 'Admin Dashboard', data: 'hi' })
})

router.get('/complaint/status', function(req, res, next){
    
    res.render('complaint_status', { title: 'Admin Dashboard', data: 'hi' })
})



router.get('/logout', function(req, res, next){
    store.set('valid', 'false')
    res.redirect('/admin/login')
})

router.get('/dashboard', checkAuth, function(req, res, next){
    const user = store.get('user')

    res.render('dashboard', {title: 'dashboard'})
})

router.get('/process', checkAuth, function(req, res, next){
    const user = store.get('user')

    const params = {
        type: 2
    }

    axios.post(`https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${user.officierid}`, params)
    .then(function (response) {
      console.log('response_home',response.data.message);
      res.render('process', { title: 'Processing complaints', data: response.data.message});
    })
    .catch(function (error) {
      console.log(error);
    });

})

router.get('/closed', checkAuth, function(req, res, next){
    const user = store.get('user')

    const params = {
        type: 3
    }

    axios.post(`https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${user.officierid}`, params)
    .then(function (response) {
      console.log('response_home',response.data.message);
      res.render('closed', { title: 'Closed Complaints', data: response.data.message});
    })
    .catch(function (error) {
      console.log(error);
    });
})

router.post('/closed', function(req, res, next){
    console.log(req.body);
    const data ={
        type: 4,
        complaintid: req.body.complaintid,
        closing_statement: req.body.closing_statement,
        report_file: req.body.file
    }
    console.log(data);
    
    axios.put(`https://uj2iaytcuj.execute-api.ap-south-1.amazonaws.com/test/complaint/update/1`, data)
    .then(function (response) {
      console.log('response_home',response.data.message);
      res.redirect('/admin/process')
    })
    .catch(function (error) {
      console.log(error);
    });
    
})

router.post('/labour/contact', function(req, res, next){
    console.log(req.body);
    const msg = req.body.sms
    const url = `http://login.smsadda.com/API/pushsms.aspx?loginID=giit&password=giitpc&mobile=+91${req.body.phone}&text=${msg}&senderid=GIITPC&route_id=1&Unicode=0`

    axios.get(url).then(function(response){
        console.log(response);
    })
    .catch(function(err){
        console.log(err);
    })
    
})
module.exports = router;
