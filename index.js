const express=require('express')
const mongoose=require('mongoose')
const port_configs=require('./configs/port.configs')
const db_configs=require('./configs/db.configs')

const app=express()
app.use(express.json())

app.listen(port_configs.PORT,()=>{
    console.log(`server has started on port number ${port_configs.PORT}`)
})

require('./routes/todo.routes')(app)

mongoose.connect(db_configs.db_url, { useNewUrlParser: true, useUnifiedTopology: true })
const db=mongoose.connection

db.once("open",()=>{
    console.log("connection with mongoDB established")
})

db.on("error",()=>{
    console.log("connection with mongoDB failed")
})