//user sign in schema
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, 
           unique: true,
           lowercase: true,
     validate( value ) {
           if(!validator.isEmail( value )) {
                throw new Error( 'Email is invalid')
                 }
            }
  },
  password: { type: String, required: true,
    minLength:7,
    //validation
            
  },
  //role: { type: String, required: true, default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

//model and export
const User = mongoose.model("User", UserSchema);
module.exports = User;