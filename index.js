// MAIN SERVER ENTRY POINT FILE 

// Dependensies 
import express    from 'express';       
import mongoose   from 'mongoose';      
import bodyParser from 'body-parser';
import path       from 'path';  
  
// Route Files
import quizRoutes    from './routes/quiz-routes';        

// Config Files
import dbConfig from  './config/db'

// Create a new Express Instance
const app = express();

app.set('view engine', 'ejs');

const port = process.env.PORT || 8000;

// Database Connection Mongoose
mongoose.connect(dbConfig.database)
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + dbConfig.database)
});

mongoose.connection.on('error', (err) => {
    console.log('Database error ' + err)
});

//body-parser middleware to handle form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// Api Routes For application 
app.get('/', function(req, res){ 
  res.render('index');
});
app.use('/quiz',quizRoutes);


// Set Public Folder
app.use("/styles",  express.static(path.join(__dirname, 'public', 'css')));
app.use("/js",  express.static(path.join(__dirname, 'public', 'js')));
app.use("/images",  express.static(path.join(__dirname, 'public', 'images')));


// Configuration Of server 
app.listen(port, ()=> {
  console.log('Server started at port number: ', port);
});
