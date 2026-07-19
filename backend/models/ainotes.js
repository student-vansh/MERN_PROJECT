const mongoose = require("mongoose");

const aiNoteSchema = new mongoose.Schema({
  user : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required : true
  },
  topic: {
    type : String,
    required : true
  },

  classLevel:String,
  examType : String,

  revisionMode : {
    type: Boolean,
    default:false
  },
   includeDiagram : Boolean,
   includeChart : Boolean,

   content:{
    type : mongoose.Schema.Types.Mixed, // Ai response 
    required : true
   }
}, { timestamps: true });

module.exports = mongoose.model("AiNotes", aiNoteSchema);