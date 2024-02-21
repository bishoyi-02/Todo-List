const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')



require("dotenv").config()

const routes = require('./routes/ToDoRoutes')

const cors = require('cors')
const { uploadImage } = require('./controller/ToDoController')

const app = express()
const PORT = process.env.PORT || 5000


//Middleware
app.use(express.json())
app.use(cors())

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

mongoose
.connect(process.env.MONGO_URI)
.then(()=>console.log("DB Connected"))
.catch((err)=>console.log(err))


app.use('/api',routes)
app.post('/api/save', upload.single('image'), uploadImage)

app.listen(PORT,()=>{
    console.log(`Listening at ${PORT}`);
})

module.exports=upload

