const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose').default || require('passport-local-mongoose');

const userSchema = new Schema({
    name: {
    type: String,
    required: true
  },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], // allowed values
        default: 'user' // default role
    },
     isVerified:{
        type:Boolean,
        default:false
    },

    verificationToken:{
        type:String,
        default:null
    },

    resetPasswordToken:{
        type:String,
        default:null
    },

    resetPasswordExpires:{
        type:Date,
        default:null
    }

});

// plugin
userSchema.plugin(passportLocalMongoose,{
    usernameField:'email'
});

module.exports = mongoose.model("User", userSchema);