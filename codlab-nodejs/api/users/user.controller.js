const models = require('../../models');

exports.index = (req, res) => {
    //res.json(users);
    models.User.findAll()
        .then(users => res.json(users));
};

exports.show = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No User'});
        }
        return res.json(user);
    });

    /*let user = users.filter(user => user.id === id)[0]
    if(!user) {
        return res.status(404).json({error: 'Unknown user'});
    }

    return res.json(user);*/
};

exports.destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if(!id) {
        return res.status(400).json({error: 'Incorrect id'});
    }

    models.User.destroy({
        where: {
            id: id
        }
    }).then( count => {
        if(!count) {
            return res.stats(404).send({error: 'No user'});
        }
        res.stat(204).send()
    });

/*    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
        return res.status(404).json({error: 'Unknown user'});
    }

    users.splice(userIdx, 1);
    res.status(204).send();*/
};

exports.create = (req, res) => {
    const name = req.body.name || '';
    if (!name.length) {
        return res.status(400).json({error: 'Incorrect name'});
    }

    models.User.create({
        name: name
    }).then((user) => res.stats(201).json(user));
/*
    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId;
    }, 0) + 1;

    const newUser= {
        id: id,
        name: name
    };
    users.push(newUser);

    return res.status(201).json(newUser);

 */
};

exports.update = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) return res.status(400).json({error: 'Incorrect id'});

    models.User.findOne({
        where: {
            id: id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({error: 'No User'});
        }

        let name = req.body.name || '';
        name = name.toString().trim();
        if(!name.length) {
            return res.status(400).json({error: 'Incorrect name'});
        }

        user.name = name;
        user.save().then(_ => res.json(user));
    });
};