var express         = require('express');
const employeesController = require('../controllers/employees');

module.exports=()=>{
	var router=express.Router();

	router.get('/get',employeesController.GetAllEmployees);
	router.post('/post',employeesController.PostEmployees);
	router.put('/put',employeesController.PutEmployees);
	router.delete('/delete/:ID',employeesController.DeleteEmployees);
	return router;
};