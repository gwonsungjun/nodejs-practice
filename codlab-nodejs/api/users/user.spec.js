const assert = require('assert');
const request = require('supertest');
const should = require('should');
const app = require('../../app');
const syncDatabase = require('../../bin/sync-db');
const models = require('../../models');

describe('GET /users', () => {
    before('sync database', done => {
        syncDatabase().then(() => {
            done();
        });
    });

    const users = [
        {name: 'alice'},
        {name: 'bek'},
        {name: 'chris'}
    ];

    before('insert 3 users into database', done => {
        models.User.bulkCreate(users).then(() => done());
    });


    it('should return 200 status code', (done) => {
        request(app)
            .get('/users')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.be.an.instanceOf(Array).and.have.length(3);
                res.body.map(user => {
                    user.should.have.properties('id', 'name');
                    user.id.should.be.a.Number();
                    user.name.should.be.a.String();
                });
                done();
            });
    });

    after('clear up database', done => {
        syncDatabase().then(() => done);
    });
});

describe('GET /users/:id', () => {
    it('should return 200 status code and user object', done => {
        request(app)
            .get('/users/1')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                res.body.should.be.an.instanceOf(Object);
                res.body.should.have.properties('id', 'name');
                res.body.id.should.be.a.Number();
                res.body.name.should.be.a.String();
                done();
            });
    });

    it('should return 400 status code on string id', done => {
        request(app)
            .get('/users/abc')
            .expect(400)
            .end((err, res) => {
                if(err) throw err;
                res.body.should.have.property('error');
                done();
            });
    });

    it('should return 404 status code on no user', done => {
        request(app)
            .get('/users/5')
            .expect(404)
            .end((err, res) => {
                if(err) throw err;
                res.body.should.have.property('error');
                done();
            })
    })
});

describe('POST /users', () => {
    it('should return 201 status code and new user object', done => {
        const name = 'daniel';

        request(app)
            .post('/users')
            .expect(201)
            .send({
                name: name
            })
            .end((err, res) => {
                if (err) throw err;
                res.body.should.have.property('id', 4);
                res.body.should.have.property('name', name);
                done();
            });
    });
})

describe('PUT /users/:id', () => {
    it('should return 200 status code', done => {
        request(app)
            .put('/users/1')
            .send({
                name: 'foo'
            })
            .end((err, res) => {
                if (err) throw err;
                done();
            });
    });
});