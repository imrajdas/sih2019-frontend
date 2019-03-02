var store = require('store-js')

module.exports = (req, res, next) => {
    // console.log('auth',req.headers, res);
    console.log(store.get('user'))
    console.log(store.get('valid'))
        
    if(store.get('valid') === 'true'){
        next();    
    }
    else{
        res.redirect('/admin/login')
    }

}