const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');


// Get messages. If ?withUser=ID provided, returns conversation between logged-in user and that user; otherwise returns public (to:null) messages.
router.get('/', auth, async (req, res) => {
try {
const { withUser } = req.query;
let filter = { isDeleted: false };
if (withUser) {
const myId = req.user.id;
filter = { ...filter, $or: [ { from: myId, to: withUser }, { from: withUser, to: myId } ] };
} else {
filter = { ...filter, to: null };
}
const messages = await Message.find(filter).sort({ createdAt: 1 }).limit(200).populate('from', 'username avatar').populate('to', 'username avatar');
res.json(messages);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


router.post('/', auth, async (req, res) => {
const { to = null, text } = req.body;
try {
const msg = new Message({ from: req.user.id, to, text });
await msg.save();
const populated = await msg.populate('from', 'username avatar');
res.json(populated);
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


// Delete message (soft delete)
router.delete('/:id', auth, async (req, res) => {
try {
const message = await Message.findById(req.params.id);
if (!message) return res.status(404).json({ message: 'Message not found' });
// Only allow deletion by message sender
if (message.from.toString() !== req.user.id) {
return res.status(403).json({ message: 'Unauthorized to delete this message' });
}
message.isDeleted = true;
message.deletedAt = new Date();
await message.save();
res.json({ message: 'Message deleted' });
} catch (err) {
console.error(err);
res.status(500).send('Server error');
}
});


module.exports = router;