var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

// user Schema
var UserSchema = new Schema({
    username: {type: String, required: true, index: {unique: true}},
    password: {type: String, required: true}
});

// items Schema
var ItemSchema = new Schema({
  userId : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  imgUrl: {type: String, required: false},
  type: {type: String, required: false},
  size: {type: Number, required: false},
  weight: {type: Number, required: false},
  date: {type: Date, required: false},
  location: {type: String, required: false},
  latitude: {type: Number, required: false},
  longitude: {type: Number, required: false},
  description: {type: String, required: false}
});



// Called before adding a new user to the DB. Encrypts password.
UserSchema.pre('save', function(next) {
    var user = this;

    if(!user.isModified('password')) {
      return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) {
          return next(err);
        }

        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) {
              return next(err);
            }

            user.password = hash;
            next();
        });
    });
});

// Used by login methods to compare login form password to DB password
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
    // 'this' here refers to this instance of the User model
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) {
          return callback(err);
        }

        callback(null, isMatch);
    });
};

// exporting
module.exports = mongoose.model('User', UserSchema);
module.exports.item = mongoose.model('Item', ItemSchema);
