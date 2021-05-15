const mongoose = require('mongoose');
const { Schema } = mongoose;

const expenseSchema = new Schema({
  title: { type: String, minLength: 1 },
  amount: { type: Number },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Budget', budgetSchema);
