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
    // req.headers.authorization = 'login'
    // localStorage.setItem('token', 'example')
    store.set('token', { name: "hello"})
    res.render('admin_login', { title: 'Admin Login'})
    // res.render('admin_login', { title: 'Admin Login',  });
});

router.post('/login', function(req, res, next) {
    console.log(req.body);

    axios.get(`https://269vosp78h.execute-api.ap-south-1.amazonaws.com/test/officier/login/${req.body.username}/${req.body.password}`)
    .then(function (response) {
      console.log(response.data);
      if(response.data.status === true){
        store.set('user', {officierid: response.data.message[0].officierid,
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

    const url = `https://ft223ffr50.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${store.get(user.officierid)}`
    console.log(url);
    
    axios.post(`https://ft223ffr50.execute-api.ap-south-1.amazonaws.com/test/list/complaints/${store.get(user.officierid)}`, {})
    .then(function (response) {
      console.log('response_home',response.data.message);
      res.render('admin_home', { title: 'Admin Home', data: response.data.message});

    })
    .catch(function (error) {
      console.log(error);
    });

    var data = [{
        complaintid: Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365.25),
        lin: 12345967122,
        name: 'Raj Das',
        address: 'KIIT',
        district: 'Patia',
        state: 'Bhubaneswar',
        pincode: '751024',
        phone: '7809694275',
        email: 'mail.rajdas@gmail.com',
        company_name: 'Raj Fincorp',
        position: 'Clerk',
        problem_category: 'Minimum Wage',
        complaint_desc: '11' ,
        status: 0,
        priority: null,
        critical: true,
        created_at: moment().format('MMMM Do YYYY')
    },
    {
        complaintid: Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365.25),
        lin: 12345967122,
        name: 'Raj Das',
        address: 'KIIT',
        district: 'Patia',
        state: 'Bhubaneswar',
        pincode: '751024',
        phone: '7809694275',
        email: 'mail.rajdas@gmail.com',
        company_name: 'Raj Fincorp',
        position: 'Clerk',
        problem_category: 'Minimum Wage',
        complaint_desc: '2' ,
        status: 0,
        priority: null,
        critical: false,
        created_at: moment().format('MMMM Do YYYY')        
    },
    {
        complaintid: Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365.25),
        lin: 12345967122,
        name: 'Raj Das',
        address: 'KIIT',
        district: 'Patia',
        state: 'Bhubaneswar',
        pincode: '751024',
        phone: '7809694275',
        email: 'mail.rajdas@gmail.com',
        company_name: 'Raj Fincorp',
        position: 'Clerk',
        problem_category: 'Minimum Wage',
        complaint_desc: '1' ,
        status: 0,
        priority: null,
        critical: false,
        created_at: moment().format('MMMM Do YYYY')        
    },
    {
        complaintid: Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365.25),
        name: 'Raj Das',
        lin: 12345967122,
        address: 'KIIT',
        district: 'Patia',
        state: 'Bhubaneswar',
        pincode: '751024',
        phone: '7809694275',
        email: 'mail.rajdas@gmail.com',
        company_name: 'Raj Fincorp',
        position: 'Clerk',
        problem_category: 'Minimum Wage',
        complaint_desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum' ,
        status: 0,
        priority: null,
        critical: true,
        created_at: moment().format('MMMM Do YYYY')        
    }
    ]

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

module.exports = router;
