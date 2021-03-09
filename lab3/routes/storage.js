var express         = require('express');
const storageController = require('../controllers/storage');

module.exports=()=>{
	var router=express.Router();

	router.get('/get',storageController.GetAllStorage);
	router.post('/post',storageController.PostStorage);
	router.put('/put',storageController.PutStorage);
	router.delete('/delete/:ID',storageController.DeleteStorage);
	return router;
};