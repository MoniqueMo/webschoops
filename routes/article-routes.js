var express = require("express");
var cheerio = require("cheerio");
var Article = require("../models/articles");
var Comment = require("../models/comments")
var axios = require("axios")
var app = express();

// Scrape data from TiempoLatino website and save to database(mongo)
app.get("/scrape", function(req,res){
    axios.get("http://eltiempolatino.com/news/noticias/nacional").then(function(response){
 //use cherrio to grab article elements.
    var $ = cheerio.load(response.data);
    $(".story_list").each(function(i,element){
//save in an array
        var result = {};
        result.title = $(this).children("h4").text();
        result.description = $(this).children(".entry-content").text();
        console.log(result)
//create a new article using the result return.
        Article.create(result).then(function(articles){
            console.log(articles);
        })
        .catch(function(err){
            console.log(err);
        });
    });
    res.redirect("/");
    });
});

app.get("/articles", function(req,res){
    Article.find({}).then(function(articles){
        res.json(articles);
    })
    .catch(function(err){
    res.json(err);
    });
});

//save an article route
app.post("/save/:id", function(req,res){
    Article.findOneAndUpdate({"_id":req.params.id},{"saved":true})
    .then(function(articles){
        res.json(articles);
    })
    .catch(function(err){
        res.json(err)
    });
});

//route saved articles to saved page
app.get("/articles/:id", function(req,res){
    Article.findOne({"_id":req.params.id}).populate("comments")
    .then(function(dbArticle){
        res.json(dbArticle);
    })
    .catch(function(err){
        res.json(err);
    });
});

//create new comment route
app.post("/comment:id", function(req,res){
    var newComment = new Comment(req.body);
    newComment.save(function(error,newComment){
        if(error){
            console.log(error);
        }else {
            Article.findOneAndUpdate({"_id": req.params.id}, {$push:{"comments": newComment._id}}, {new:true})
            .exec(function(err, article){
                if (err){
                    console.log(err);
                }else{
                    console.log("article: ", article);
                    res.send(article);
                }
            });
        }
    });
});

app.post("/unsaved/:id",function(req,res){
    Article.findOneAndUpdate({"_id":req.params.id}, {"saved": false})
    .then(function(err,doc){
        if(err){
            console.log(err);
        }else{
            console.log("Article Removed from saved articles page");
        }   
    });
    res.redirect("/saved");
});
module.exports = app;