const bodyParser=require('body-parser');
const express=require('express');
const request=require('request');
const https=require("https");
const app=express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
res.sendFile(__dirname+"/signup.html");
})
app.post("/",function(req,res){
    const firstname=req.body.fname;
    const lastname=req.body.lname;
    const emailid=req.body.email;
    const data={
        members:[
           { email_address:emailid,
             status:"subscribed",
             merge_fields:{
              FNAME:firstname,
              LNAME:lastname,
             }
           }

        ]
    };
    const jsonData=JSON.stringify(data);
    const url="https://us4.api.mailchimp.com/3.0/lists/b262e21fdd";
    const options={
        method:"POST",
        auth:"therohitbansal:984092fd9bfc701871cbddbd1eb9e04a-us4"
    }
  const request=https.request(url,options,function(response){
    if(response.statusCode===200)
    {
        res.sendFile(__dirname+"/success.html")
    }
    else
    res.sendFile(__dirname+"/failure.html");
response.on("data",function(data){
    console.log(JSON.parse(data));
})
})
request.write(jsonData);
request.end();
});
app.post("/failure",function(req,res){
    res.redirect("/");
})
app.listen(3000,function(){
    console.log("Listining");
})
// Api key
// 984092fd9bfc701871cbddbd1eb9e04a-us4
// List id b262e21fdd