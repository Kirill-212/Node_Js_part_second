var express         = require('express');
const ordersController = require('../controllers/orders');

module.exports=()=>{
	var router=express.Router();

	router.get('/get',ordersController.GetAllOrders);
	router.post('/post',ordersController.PostOrders);
	router.put('/put',ordersController.PutOrders);
	router.delete('/delete/:ID',ordersController.DeleteOrders);
	return router;
};