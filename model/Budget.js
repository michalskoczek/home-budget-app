const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
  userId: { type: String },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Budget', budgetSchema);
