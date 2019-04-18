var mongoose = require("mongoose");

//create a Schema class.
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    body:{
        type: String
    }
});

//automatically save comments by object Id(referred within the article model.)

var Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;