const express = require("express");
require("./db/connection");
const path = require("path");
const app = express();
const User = require("./models/usermessage");
const hbs = require("hbs");
const port = process.env.PORT || 3000;


// Register Part:
const Register = require("./models/registers");



// Setting the app.
const staticpath = path.join(__dirname,"../public"); 
const templatespath = path.join(__dirname,"../templates/views"); 
const partialspath = path.join(__dirname,"../templates/partials"); 


// console.log(path.join(__dirname,"../public"));

// middleware.
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/js")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/jquery/dist")));

// Now taking the proper format of the data to let know expreess that we wanted to et the dataa:
app.use(express.urlencoded({extended:false}));
app.use(express.static(staticpath));
app.set("view engine","hbs");
app.set("views",templatespath);
hbs.registerPartials(partialspath);


// Routing
app.get("/",(req,res)=>{
    res.render("index");
});

// app.get("/contact",(req,res)=>{
//     res.render("contact");
// });

app.get("/about",(req,res)=>{
    res.render("about");
});

app.get("/service",(req,res)=>{
    res.render("service");
});



// login 
app.get("/login",(req,res)=>{
    res.render("login");
});

app.post("/login",async(req,res)=>{
    try{
       const email = req.body.email;
       const password = req.body.password;
       
    //    Checking the validity of the data.
        const usere = await Register.findOne({email:email});
        if(usere.password === password){
            res.status(201).render("userpage");
        }else{
            res.send("Wrong Password");
        }
    }
    catch(error){
        res.status(400).send("Invalid");
    }
})









// registation
app.get("/register",(req,res)=>{
    res.render("register");
});

app.post("/register",async(req,res)=>{
    try{
        const registerUser = new Register({
            firstname : req.body.firstname,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password,
        })
        const registered =   await registerUser.save();
        res.status(201).render("index");
    }
    catch(error){
        res.status(400).send(error);
    }
})


// contact
app.get("/contact",(req,res)=>{
    res.render("contact");
});

app.post("/contact",async(req,res)=>{
  try{
        // res.send(req.body)
        const userData = new User(req.body);
        await userData.save();
        res.status(201).render("index");
  }catch(error){
        res.status(500).send(error);
  }
})


// Server 
app.listen(port,()=>{
   console.log(`Server is running Successfully at port ${port}`)
});