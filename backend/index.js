const express = require('express')
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/categories')
const path = require('path');
const cors = require('cors');
const port = process.env.PORT || 5000;

dotenv.config();
app.use(express.json());
app.use(cors())
app.use('/images', express.static(path.join(__dirname, "/images")))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(console.log("Connected to WinLou-Blog database"))
    .catch(err => {
        console.log(err)
    })


const storage = multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, "backend/images")
    }, 
    filename: (req, file, cb) => {
        cb(null, req.body.name);
    } 
})

const upload = multer({storage})

app.post('/api/upload', upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded")
})

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
// app.use("/api/categories", categoryRoute);

// Production
if(process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve();

    app.use(express.static(path.join(__dirname, "/frontend/build")))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    })
} else {
    app.get('/', (req, res) => res.send('API running successfully...'))
}


app.listen(port, () => {
    console.log("Backend is running", port)
})

