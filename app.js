const express = require("express");
const bodyParser = require("body-parser");
const app = express();

//  For adding items to home page
let newItem = ["Buy Food", "Cook Food", "Eat Food"];
//  For adding items to work page
let workItem= [];
//  For adding items to about page
let aboutItem= [];

//  For implementing css through app.js
app.use(express.static('public'));

//  For taking inputs from the body of the html or ejs files.
app.use(bodyParser.urlencoded({extended: true}));

// accessing ejs package
app.set('view engine', 'ejs');

app.get("/", function(req, res)
{
  const date = new Date();
  const option = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
};
  const today = date.toLocaleDateString("en-US", option)
  res.render("index", {todayTask: today, newListItems: newItem});
});

app.post("/", function(req, res){
  let item = req.body.newItem;
  if(req.body.button === "Work Page"){
    workItem.push(item);
    res.redirect("/work");
  }
  else if(req.body.button === "About"){
    aboutItem.push(item);
    res.redirect("/about");
  }
  else{
    // console.log(req.body);
    newItem.push(item);
    res.redirect("/");
  }
});


//  For work page
app.get("/work", function(req, res){
  res.render("index", {todayTask: "Work Page", newListItems: workItem});
});    


//  For about page
app.get("/about", function(req, res){
  res.render("index", {todayTask: "About", newListItems: aboutItem});
});


//  For listening to port
app.listen(3000, function(){
  console.log("Server is running on port: 3000.");
});