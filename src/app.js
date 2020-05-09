const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths to Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectory = path.join(__dirname, '../templates/views')
const partialsDirectory = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectory)
hbs.registerPartials(partialsDirectory)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Nir'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'This is my cute robot',
        name: 'Nir'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help title',
        msg: 'This is some help message',
        name: 'Nir'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'please provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longtitude, location} = {}) => {
        if (error) {
            return res.send({ error }) 
        }
        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                return res.send({ error }) 
            }           
            res.send({
                location: location,
                temprature: forecastData.temprature
            })
        })         
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nir',
        error: 'Help article does not exist'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nir',
        error: 'Page does not exist'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})