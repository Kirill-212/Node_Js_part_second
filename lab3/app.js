const express = require('express');
const path =require('path');
const bodyParser = require('body-parser');
const jsonParser = express.json();
const shopRoutes =require('./routes/Shop')();
const storageRoutes =require('./routes/storage')();
const customerRoutes =require('./routes/customer')();
const employeesRoutes =require('./routes/employees')();
const ordersRoutes =require('./routes/orders')();
const hbs = require('express-handlebars').create({extname:'.hbs'});
let app = express();

app.engine('.hbs',hbs.engine);
app.set("views",path.resolve(__dirname,'views'));
app.set('view engine','handlebars');

app.use('/shop/',jsonParser,shopRoutes);
app.use('/storage/',jsonParser,storageRoutes);
app.use('/customer/',jsonParser,customerRoutes);
app.use('/employees/',jsonParser,employeesRoutes);
app.use('/orders/',jsonParser,ordersRoutes);
app.use((err,req,res,next)=>{
    res.status(500).send(err);
})



app.listen(3000, ()=>{
    console.log('Express server listening on port 3000');
});
