const mongoose = require('mongoose');

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    goal: { type: String, required: true },
    responsible: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: String, default: 'Pendente' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Problem', ProblemSchema);
