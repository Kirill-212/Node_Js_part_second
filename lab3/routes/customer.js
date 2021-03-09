var express         = require('express');
const customerController = require('../controllers/customer');

module.exports=()=>{
	var router=express.Router();
	router.get('/get/page',customerController.GetPage);
	router.get('/get',customerController.GetAllCustomer);
	router.post('/post',customerController.PostCustomer);
	router.put('/put',customerController.PutCustomer);
	router.delete('/delete/:ID',customerController.DeleteCustomer);
	return router;
};