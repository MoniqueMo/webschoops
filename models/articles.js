var mongoose = require("mongoose");
// create a Schema class
var Schema = mongoose.Schema;

//Create article schema
var ArticleSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required:true,
        unique: true,
    },

    saved: {
        type: Boolean,
        required: true,
        default: false
    },

    comments:[{
        type: Schema.ObjectId,
        ref:'comment'
    }]
});

var Article = mongoose.model("article", ArticleSchema);

module.exports = Article;