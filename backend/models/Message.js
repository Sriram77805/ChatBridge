const mongoose = require('mongoose');


const MessageSchema = new mongoose.Schema({
from: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
to: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
text: { type: String, required: true },
isDeleted: { type: Boolean, default: false }, // Soft delete flag
deletedAt: { type: Date, default: null }
}, { timestamps: true });


module.exports = mongoose.model('Message', MessageSchema);