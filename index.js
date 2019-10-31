const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const MongoObjectID = require('mongodb').ObjectID;
const mongo = require('./config.js');

app.get('/', (req, res) => {
    mongo.then((db) => {
        db.collection('users').find().toArray((err, result) => {
            res.render('list', {data:result});
        });
    });
});

app.get('/insert', (req, res) => {
    res.render('insert.ejs');
});

app.post('/insert', (req, res) => {
    mongo.then((db) => {
        var data = {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            gender : req.body.gender,
            address : req.body.address,
            color : req.body.color
        };

        db.collection('users').insertOne(data, (err, r) => {
            res.redirect('/');
        });
    });
});

app.get('/delete/:_id', (req, res) => {
    mongo.then((db) => {
        query = {_id : new MongoObjectID.ObjectID(req.params._id)};
        db.collection('users').deleteOne(query, (err, r) => {
            res.redirect('/');
        });
    });
});

app.get('/update/:_id', (req, res) => {
    mongo.then((db) => {
        query = {_id : new MongoObjectID.ObjectID(req.params._id)};
        db.collection('users').find(query).toArray((err, result) => {
            var data = {
                _id : result[0]._id,
                firstname : result[0].firstname,
                lastname : result[0].lastname,
                gender : result[0].gender,
                address : result[0].address,
                color : result[0].color
            };
            res.render('update.ejs', data);
        });
    });
});

app.post('/update', (req, res) => {
    mongo.then((db) => {
        query = {_id : new MongoObjectID.ObjectID(req.body._id)};
        data = {$set: {
            firstname : req.body.firstname,
            lastname : req.body.lastname,
            gender : req.body.gender,
            address : req.body.address,
            color : req.body.color
        }};

        db.collection('users').updateOne(query, data, (err, r) => {
            res.redirect('/');
        })
    });
});


app.listen(3000, () => {
    console.log('Runing on http://127.0.0.1:3000');
});