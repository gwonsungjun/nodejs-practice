module.exports = function (app, Book)
{
    app.get('/api/books', function (req, res) {
        Book.find(function (err, books) {
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(books);
        })
    });

    app.get('/api/books/:book_id', function (req, res) {
        Book.findOne({_id: req.params.book_id}, function (err, book) {
            if(err) return res.status(500).json({error:err});
            if(!book) return res.status(404).json({error: 'book not found'});
            res.json(book);
        })
    });

    app.get('/api/books/author/:author', function (req, res) {
        Book.find({author: req.params.author}, {_id:0, title:1, published_date:1}, function (err, books) {
            if(err) return res.status(500).json({error: err});
            if(books.length === 0) return res.status(400).json({error: 'book not found'});
            res.json(books);
        })
    });

    app.post('/api/books', function (req, res) {
        let book = new Book();
        book.title = req.body.title;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save(function (err) {
            if(err){
                console.error(err);
                res.json({result: 0});
                return;
            }

            res.json({result: 1});;

        });
    });

    app.put('/api/books/:book_id', function (req, res) {
        Book.findById(req.params.book_id, function (err, book) {
            if(err) return res.status(500).json({ error: 'database failure'});
            if(!book) return res.status(400).json({ error: 'book not found'});

            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save(function (err) {
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated'});

            });

        });
    });

    app.delete('/api/books/:book_id', function (req, res) {
        Book.remove({ _id: req.params.book_id }, function (err, output) {
            if(err) return res.status(500).json({ error: "database failure"});

            if(!output.result.n) return res.status(400).json({ error: "book not found"});
            res.json({ message: "book deleted" });

            res.status(204).end();

        })
    });
}