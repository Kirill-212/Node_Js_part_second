var express         = require('express');
const shopController = require('../controllers/Shop');

module.exports=()=>{
	var router=express.Router();

	router.get('/get',shopController.GetAllShop);
	router.post('/post',shopController.PostShop);
	router.put('/put',shopController.PutShop);
	router.delete('/delete/:ID',shopController.DeleteShop);
	return router;
};