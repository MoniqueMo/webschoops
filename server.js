// require dependencies
var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var exhbs = require("express-handlebars");
var cheerio = require("cheerio");


// require models
    var Article = require("./models/articles.js")
    var Comment = require("./models/comments.js")

//require routes
var htmlRouter = require("./routes/html-routes.js");
var articleRouter = require("./routes/article-routes.js");

mongoose.Promise = Promise;

//set up port and initialize Express

var PORT = process.env.PORT || 3000;
var app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({
    extended: false
  }));

//Initialize Handlebard
app.engine("handlebars", exhbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

//set up routing
app.use("/", htmlRouter);
app.use("/articles", articleRouter);

//database configuration with mongoose.
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

var URI = process.env.MONGODB_URI || "mongodb://localhost:27017/scrapperdb";
mongoose.connect(URI);

var db = mongoose.connection;

    //console mongoose errors   
    db.on("error", function(error){
        console.log("mongoose error: ", error);
    });

//console log success message

    db.once("open", function(){
        console.log("Mongoose connection succesful")
    });

//listen on port 3000
app.listen(PORT,function(){
    console.log("app running on port http://localhost: " + PORT + "/");
});
    
