const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const VerificationTokenSchema = new mongoose.Schema({
    _userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
});

VerificationTokenSchema.methods.generate = function(userID) {
    const verificationToken = this;
    const token = jwt.sign({id: userID}, process.env.JWT_SECRET_3, {expiresIn: '1d'});
    verificationToken.token = token;
    return verificationToken.save().then(() => token);
};

const VerificationToken = mongoose.model('VerificationToken', VerificationTokenSchema);
module.exports = VerificationToken;
