const express = require("express");
const app = express();
const hbs = require("express-handlebars");
const path = require("path");
var formidable = require('formidable');
const fs = require("fs")
const port =process.env.PORT||3000;
const formidableMiddleware = require('express-formidable');
const nodemailer=require("nodemailer");
app.engine("handlebars", hbs())
app.set('view engine', 'handlebars');
app.use('/public', express.static(path.join(__dirname, 'public')));

app.use(formidableMiddleware({
    encoding: 'utf-8',
    uploadDir: __dirname + '/tmp',
    multiples: false,
}));

app.get("/", (req, res) => {

    res.render("index", { layout: false })
});


app.post("/upload", (req, res) => {
    console.log(req.files.name);
    // console.log(req.fields);
// var newname=req.files.avatar.path + '.pdf'
//     fs.rename(req.files.avatar.path,newname, (err, data) => {
//         console.log(data);
//          console.log(err);
//     });
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'thilakal9299@gmail.com',
          pass: "9944681892"
        }
      });
      //machine leanring is an art
      var string=""
      for(var key in req.fields){
        
          string+= key+":"+req.fields[key]+"\n"
      }
      
      console.log(string)
      var mailOptions = {
        from: 'thilakal9299@gmail.com',
        to:"thilakal9299@gmail.com",
        //to: 'linguisticsresearch@phoenicorn.com',
        subject: 'Crypers Mail Service',
        text: string
      
        //attachments:[{filename:newname}]
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
           // res.send("somthing went wrong")
           res.render('error',{layout:false});
        } else {
          console.log('Email sent: ' + info.response);
           res.render('thankyou', { layout: false });
         // res.send("Thank you for your response ")
          // return res.render("file:///C:/Users/ACAL/Desktop/Natours/contact.html");


        }
      });
    
});
app.listen(port, (req, res) => {
    console.log("app is running on 3000")
})
