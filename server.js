const express=require('express');

const fs = require('fs');

const hbs=require('hbs');

var app= express();

const port =process.env.PORT||3000;

hbs.registerPartials(__dirname+'/views/partials');

app.set('view engine','hbs');



// app.use((req,res,next)=>{
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname+'/public'));

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=(`${now}:${req.method}.${req.url}`);
  console.log(log);
  fs.appendFile('server.log',log + '\n');
next();
});

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamit',(text)=>{
  return text.toUpperCase();
});

app.get('/',(req,res)=>{
  // res.send('<h1>Hello Express</h1>');
//   res.send({name:'ajith',
// sex:'male',
// age:26});
  res.render('Home.hbs',{
    pageTitle:'Home Page',
    welcomemessage:'Welcome to Ajiths Website'
  });
});

app.get('/about',( req,res)=>{
//res.send('This is about page')
res.render('about.hbs',{
  pageTitle:'About Page'
});
});

app.get('/Projects',( req,res)=>{
//res.send('This is about page')
res.render('Projects.hbs',{
  pageTitle:'Project main Page'
});
});

app.get('/bad',(req,res)=>{
  res.send({ErrorMessage:'404 :Following occured error',
})
});

app.listen(port,()=>{
  console.log(`server is up at ${port}.`);
});
