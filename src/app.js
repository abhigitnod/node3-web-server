const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');


const app = express();


//Define Path for express config
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,'../templates/views');
const partialPath = path.join(__dirname,'../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebar engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);


//Handling requests and seding response
app.get('', (req, res) => {
    res.render('index',{
        title: 'Home Page',
        name: 'Ranchordas'
    })
    
})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'HBS Help Page',
        name: 'Farhan'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'Hbs About Page',
        name: 'PreRaju'
    })
})

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        return res.send({
            error: "Adderss must be provied."
        });
    }

    geocode(req.query.address, (error, {longitude, latitude, location}={}) => {
        if (error) {
            return res.send({error});
        }

        forecast(longitude, latitude, (error, {temp, pressure, humidity}={}) => {
            if (error) {
                return res.send({error});
            }

            // res.render('weather',);
            res.send({
                title: "Weather Forecast",
                location,
                temperature: temp,
                pressure,
                humidity,
                name: "Abhishek"
            });
        })
    })
    
})

app.listen(3000,() => {
    console.log("Server is up on port 3000");
    
})