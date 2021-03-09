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
	console.log('end ');
});



client.on('subscribe',(channel,count)=>{
	console.log('channel = ',channel,' count = ',count);
});

client.on('message',(channel,message)=>{
	console.log('sub channel  '+channel+' : '+message);
});

client.subscribe('channel-01');

setTimeout(()=>{
	client.unsubscribe();
	client.quit();
},6000);







