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
	console.log('end');
});



client.publish('channel-01','from pub client mes 1');

client.publish('"channel-01','from pub client mes 2');


setTimeout(()=>
client.publish('channel-01','from pub client mes 3'),1000)



setTimeout(()=>
client.publish('channel-01','from pub client mes 4'),2000)


setTimeout(()=>
client.publish('channel-01','from pub client mes 5'),3000)


setTimeout(()=>
client.publish('channel-01','from pub client mes 6'),4000)




