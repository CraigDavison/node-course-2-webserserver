const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
let app = express();
let currentYear = new Date().getFullYear();

// Tell handlebars to use partials.
hbs.registerPartials(__dirname + '/views/partials');


//some custom express middleware
app.use((req, res, next)=>{
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(`${now}: ${req.method} ${req.url}`);
    fs.appendFile('server.log',log + '\n',(err) =>{
        if(err){
            console.log('Unable to append');
        }
    })
    //next tells express this is done and can continue
    next();
});
// This will be uncommented to enter maintanence
/*app.use((req,res,next) => {
    res.render('maintanence.hbs');
});*/

// Some express middleware
// This will allow us to use a static folder with static pages
app.use(express.static(__dirname+'/public'));

// set handlebasrs as templating engine
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear',() => {
    return currentYear;
})
hbs.registerHelper('scream',(text) => {
    return text.toUpperCase()
})

// Route handler for root (equivilant to index.html)
app.get('/',(req,res) => {
    res.render('home.hbs',{
        title:'Home Page',
        welcomeMsg: 'Welcome to this page'
    });
});

//Route to About
/*app.get('/about',(req,res) => {
    res.send('About Page');
});*/
//Above output some text, now we will output html document instead
app.get('/about',(req,res) => {
    res.render('about.hbs',{
        title:'About Page'
    });
});

// Route to bad
app.get('/bad',(req,res) => {
    res.send({
        errMsg:'It all went wrong!'
    });
});


// Bind application to port 3000
app.listen(3000, () => {
    console.log('Server is up')
});