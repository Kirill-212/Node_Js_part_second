var redis =require('redis');

client=redis.createClient('//redis-10746.c8.us-east-1-4.ec2.cloud.redislabs.com:10746'
	,{password:'8dD0IwdNp8GPTkfoiKNyJikgk44w11bG'});

client.on('ready',()=>{
	console.log('redy');
});

client.on('error',(err)=>{
	console.log('error    '+err);
});

client.on('connect',()=>{
	console.log('connect');
});

client.on('end',()=>{
	console.log('end incr');
	console.log(end1-start1);
		console.log('end decr');
	console.log(end2-start2);
});



	client.set('incr',0,(err,result)=>{
		console.log('err = ',err,'  |  result = ',result);
	});




start1=new Date().getTime();
for(i=0;i<9999;i++){
	client.incr('incr',(err,result)=>{
		console.log('err = ',err,'  |  result = ',result);
	});
}

end1=new Date().getTime();



start2=new Date().getTime();
for(i=0;i<9999;i++){
	client.decr('incr',(err,result)=>{
		console.log('err = ',err,'  |  result = ',result);
	});
}

end2=new Date().getTime();







client.quit();
