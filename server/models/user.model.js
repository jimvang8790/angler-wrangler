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
  img: {type: String, required: true},
  type: {type: String, required: true},
  size: {type: Number, required: true},
  weight: {type: Number, required: true},
  location: {type: String, required: true},
  // latitude: Number,
  // longitude: Number,
  description: {type: String, required: true}
});

// profile Schema
var ProfileSchema = new Schema({
  userId : [{ type: Schema.Types.ObjectId, ref: 'User' }],
  picture: {type: String, required: true},
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
module.exports.picture = mongoose.model('Picture', ProfileSchema);
