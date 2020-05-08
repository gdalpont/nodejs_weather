const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Defining paths fr express config
const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars and views location
app.set('views',viewsPath)
app.set('view engine','hbs')
hbs.registerPartials(partialsPath)

//Setup static directory
app.use(express.static(publicDirectory))


app.get('', (req,res) => {
    res.render('index',{
        title : 'Weather App',
        name : 'Gianluca'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title : 'About',
        name : 'Gianluca'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title: 'Help',
        message : 'If you need help ask someone else',
        name : 'Gianluca'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided'
        })
    }

    geocode(req.query.address, (error,{longitude,latitude,place_name} = {}) => {
        if(error){
            return res.send({
                error: 'Error during geocoding'
            })
        }
        else{
            forecast(longitude, latitude, (error, forecastData) => {
                if(error){
                    return res.send({
                        error: 'Error getting the forecast'
                    })
                }
                else{
                    res.send({
                        address: place_name,
                        weather : forecastData
                    })
                }
            })
        }
    })


})


//Help 404 page
app.get('/help/*',(req,res) => {
    res.render('404',{
        title: 'Error',
        message: 'Article not found',
        name : 'Gianluca'
    })
})

//Generic 404 Page
app.get('*',(req,res) => {
    res.render('404',{
        title: 'Error',
        message: '404 Error',
        name : 'Gianluca'
    })
})

app.listen(port, () => {
    console.log('Server up and running on port '+port)
})