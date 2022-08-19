import express from 'express'
import path from 'path'
import { engine } from 'express-handlebars'

const PORT = 3000
const app = express()
const publicDir = path.join(__dirname, 'public')

app
.engine('.hbs', engine({extname: '.hbs'}))
.set('view engine', '.hbs')
.set('views', path.resolve(__dirname)+'/public/views')
.enable('view cache')
.use(express.static(publicDir))
.get('/', (req, res) => {
    res.render('index', { layout: false })
})
.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`))
