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
	console.log('end hset');
	console.log(end1-start1);
		console.log('end hget');
	console.log(end2-start2);
});

// JSON.stringify({id:i,val:"val-"+i})
start1=new Date().getTime();
for(i=0;i<9999;i++){
	str='{id:'+i+',val: "val-'+i+'"}';
	client.hset(i,i,str,(err,result)=>{
		console.log('err = ',err,'  |  result = ',result);
	});
}

end1=new Date().getTime();



start2=new Date().getTime();
for(i=0;i<9999;i++){
	client.hget(i,i,(err,result)=>{
		console.log('err = ',err,'  |  result = ',result);
	});
}

end2=new Date().getTime();







client.quit();
