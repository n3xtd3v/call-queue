const express = require('express')
const mssql = require('mssql')
const cors = require('cors')
const dbConfig = require('./utils/dbConfig')
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(cors())

app.use('/api', require('./routes/queueRouter'))
app.use('/api', require('./routes/floorRouter'))

;
(async() => {
    try {
        await mssql.connect(dbConfig)
        console.log('Connected to database mssql.')
    } catch (err) {
        console.log(err.message)
    }
})()

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})