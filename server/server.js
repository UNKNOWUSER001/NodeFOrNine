const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const dotenv = require('dotenv')
const {readdirSync} = require('fs')
const app = express()




///middleware
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'20mb'}))
app.use(cors())


readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)))



app.listen(8000,()=>{
    console.log('Server is running on port 8000')
})