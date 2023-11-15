const path = require("path")  //  core modul
const hbs = require("hbs")

const express = require("express")

const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

// console.log(__dirname)  //  __ -> beépített változót jelent


const app = express()
const port = process.env.PORT  || 3000 //  a process.env-ben lehet hozzáférni környezeti változókhoz!

//  Út meghatározások az express config-hoz
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

//  Handlebars engine feltelepítése és a views helye
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

//  Statikus útvonal beállítása a serve-höz
app.use(express.static(publicDirectoryPath))

app.get("", (req,res)  => {
    res.render("index.hbs", {
        title: "Időjárás",
        name: "Kalmár István"
    })
})

app.get("/about", (req,res) => {
    res.render("about", {
        title: "Rólam",
        name: "Kalmár István"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        helpText: "Ez egy segítő szöveg",
        title: "Segítség",
        name: "Kalmár István"
    })
})

// app.get('', (req, res) => {
//     res.send('<h1>Időjárás</h1>')  //  a send() methoddal visszaküldhetünk valamit a kérés küldőjének
// })

app.get("/weather", (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "Kérem adjon meg egy címet!"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }

        forecast(latitude + "," + longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})



app.get("/products", (req, res) => {
    if(!req.query.search) {
    return  res.send({
            error: "Meg kell adnod egy keresési kifejezést!"
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get("/help/*", (req,res) => {
    res.render("404.hbs", {
        title: "404",
        name: "Kalmár Istán",
        errorMessage: "Segítő cikket nem találtam meg."
    })
})

app.get("*", (req, res) => {  //  * = wirld card character
    res.render("404.hbs", {
        title: "404",
        name: "Kalmár István",
        errorMessage: "Nem találtam meg a keresett oldalt."
    })
})

app.listen(port, () => {
    console.log(`A szerver a ${port}-es porton fut.`)
})  //  a szerverkészítés egy aszinkron művelet. a web szerver sosem áll le, csak ha leállítjuk. az a dolga hogy fusson és figyeljen és feldolgozzon bejövő kéréseket.

