const mongoose = require('mongoose');
const { Schema } = mongoose;

const budgetSchema = new Schema({
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Budget', budgetSchema);
