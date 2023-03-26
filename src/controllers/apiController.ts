import { Request, Response } from 'express';
import { Phrase } from '../models/Phrase';
import { Sequelize } from 'sequelize';

export const ping = (req: Request, res: Response) => {
    res.json({pong: true});
};

export const random = async (req: Request, res: Response) => {
    let nRand: number = Math.floor( Math.random() * 10);

    res.json({number: nRand});
};

export const name = async (req: Request, res: Response) => {
    let nome = req.params.nome;
    res.json({nome: `Você enviou o nome ${nome}`});
}

export const createPhrase = async (req: Request, res: Response) => {
    let {author, txt } = req.body

    let newPhrase = await Phrase.create({author, txt});

    res.status(201);
    res.json({ id: newPhrase.id, author, txt } );
};

export const listPhrases = async (req: Request, res: Response) => {
    let list = await Phrase.findAll();
    res.json({ list })
};

export const findPhrase = async (req: Request, res: Response) => {
    let {id} = req.params;

    let frase = await Phrase.findByPk(id);
    if( frase ) {
        res.json({ frase });
    } else {
        res.json({ error: 'Frase não encontrada ou inexistente'})
    }
}

export const editPhrase = async (req: Request, res: Response) => {
    let {id} = req.params;
    let {author, txt} = req.body;

    let frase = await Phrase.findByPk(id);
    if( frase ) {
        frase.author = author;
        frase.txt = txt;
        await frase.save();

        res.json({ frase });
    } else {
        res.json({ error: 'Frase não encontrada ou inexistente'})
    }
    
}

export const removePhrase = async (req: Request, res: Response) => {
    let {id} = req.params;
    
    if(id) {
        await Phrase.destroy({ where: {id}})
        res.json('frase excluída com sucesso')
    } else {
        res.json({ error: 'frase não encontrada'});
    }
}

export const randomPhrase = async (req: Request, res: Response) => {
    let phrase = await Phrase.findOne({
        order: [
            Sequelize.fn('Random')
        ]
    });
    if(phrase) {
        res.json({phrase});
    } else {
        res.json({ error: 'Frase não encontrada'})
    }
}