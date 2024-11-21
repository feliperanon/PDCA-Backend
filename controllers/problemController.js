const Problem = require('../models/Problem');

// Criar um novo problema
exports.createProblem = async (req, res) => {
    try {
        const problem = new Problem(req.body);
        await problem.save();
        res.status(201).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar problema' });
    }
};

// Listar todos os problemas
exports.getProblems = async (req, res) => {
    try {
        const problems = await Problem.find();
        res.status(200).json(problems);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar problemas' });
    }
};

// Atualizar um problema
exports.updateProblem = async (req, res) => {
    try {
        const problem = await Problem.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(problem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar problema' });
    }
};

// Deletar um problema
exports.deleteProblem = async (req, res) => {
    try {
        await Problem.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Problema deletado com sucesso' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar problema' });
    }
};
