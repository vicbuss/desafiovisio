const express = require('express');
const router = express.Router();
const Base = require('../models/base');
const axios = require('axios');


//Listar 
router.get('/', async (req, res) => {
    let base;
    try {
        base = await Base.find(req.query, {nomeFachada: 0});
        
        if(base == null) {
            return res.status(404).json({ message: 'Cannot find base' });
        }
        
    } catch (erro) {
        res.status(500).json({ message: erro.message });
    }
    return res.json(base); 
})

//Listar por ID
router.get('/:id', async (req, res) => {
    let base;
    try{
        base = await Base.findById(req.params.id, {nomeFachada: 0});
        if(base == null) {
            return res.status(404).json({ message: 'Cannot find base' });
        }
        
    } catch (erro) {
        return res.status(500).json({ message: erro.message });
    }
    return res.json(base);
})


//Cadastrar nova base
router.post('/', async (req, res) => {
    const base = new Base({
        titulo: req.body.titulo,
        nomeFachada: req.body.nomeFachada,
        cidade: req.body.cidade,
        tecnologias: req.body.tecnologias
    })
    try {
        const novaBase = await base.save();
        res.status(201).json(novaBase);
    } catch (erro) {
        res.status(400).json({ message: erro.message })
    }
})
//Atualizar cadastro
router.put('/:id', async (req, res) => {
    let base;
    try {
        base = await Base.findByIdAndUpdate(req.params.id, req.body);
        if(base == null) {
            return res.status(404).json({ message: 'Cannot find base' });
        }
        const baseAtualizada = await Base.findById(req.params.id);
        res.json({baseAtualizada});
    } catch (erro) {
        res.status(400).json({ message: erro.message });
    }
})

// Deletar uma
router.delete('/:id', async (req, res) => {
    let base;
    try {
        base = await Base.findById(req.params.id);
        if(base == null) {
            return res.status(404).json({ message: 'Cannot find base' })
        }
        await Base.findByIdAndDelete(req.params.id);
        res.json({ message: 'Base deleted' });
    } catch (erro) {
        res.status(500).json({message: erro.message});
    }
})



module.exports = router;
