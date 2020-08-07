const express = require('express');
const path=require('path');
const port=8000;

const db= require('./config/mongoose');
const Contact = require('./models/contact');

const app=express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //middleware1
// app.use(function(req,res,next){
// //    console.log('middleware 1 called');
//     next();
// });

// //middleware2
// app.use(function(req,res,next){
// //    console.log('middleware 2 called');
//     next();
// });

var contactList=[
    {
        name: "Arpan",
        phone: "1111111111"
    },
    {
        name : "Tony Stark",
        phone: "2222222222"
    },
    {
        name: "Sumbul",
        phone: "3333333333"
    },
    {
        name : "Blah",
        phone: "4444444444"
    }
]

app.get('/',function(req,res){
    
    return res.render('home', {
        title : "Contact List",
        contact_list: contactList
    });
});

app.get('/practice',function(req,res){
    return res.render('practice',{
        title: "Let us play with ejs"
    });
});

app.post('/create-contact',function(req,res){
    // contactList.push({
    //     name: req.body.name,
    //     phone: req.body.phone
    // });
    // contactList.push(req.body);
    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    },function(err,newCContact){
        if(err){
            console.log('error in creating a contact!');
            return;
        }
        console.log('*******',newCContact);
        return res.redirect('back');
    });

    return res.redirect('/');
})

//for deleting a contact
app.get('/delete-contact',function(req,res){
    //get the query from the url
    let phone=req.query.phone;
    
    let contactIndex= contactList.findIndex(contact => contact.phone == phone);
    
    if(contactIndex!=-1){
        contactList.splice(contactIndex,1);
    }

    return res.redirect('back');
});

app.listen(port,function(err){
    if(err){console.log('Error in running the server',err);}

    console.log('Yup! My express server is running on port : ',port);
});