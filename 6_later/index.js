//$ curl http://localhost:3000/articles/0
//$ curl http://localhost:3000/articles
//curl -X DELETE  http://localhost:3000/articles/0
//curl --data "title=Example 2" http://localhost:3000/articles
//curl --data "url=https://www.manning.com/liveproject/asynchronous-event-handling-using-microservices-and-kafka" http://localhost:3000/articles

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Article = require('./db').Article;
const read = require('node-readability');
const ejsLint = require('ejs-lint');

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
	'/css/bootstrap.css',
	express.static('node_modules/bootstrap/dist/css/bootstrap.css')
);

app.get('/articles', (req, res, next) => {
	Article.all((err, articles) => {
		if (err) return next(err);

		res.format({
			html: () => {
				res.render('articles.ejs', { articles });
			},
			json: () => {
				res.send(articles);
			}
		});
	});
});

app.get('/articles/:id', (req, res, next) => {
	const id = req.params.id;
	Article.find(id, (err, article) => {
		if (err) return next(err);
		//res.send(article);

		res.format({
			html: () => {
				res.render('article.ejs', { article });
			},
			json: () => {
				res.send(article);
			}
		});

	});
});

app.delete('/articles/:id', (req, res, next) => {
	const id = req.params.id;
	Article.delete(id, (err) => {
		if (err) return next(err);
		res.send({ message: 'Deleted' });
	});
});

app.post('/articles', (req, res, next) => {
	const url = req.body.url;

	read(url, (err, result) => {
		if (err || !result) res.status(500).send('Error downloading article');
		Article.create(
			{ title: result.title, content: result.content },
			(err, article) => {
				if (err) return next(err);
				console.log(article);
				res.send('OK');
			}
		);
	});
});

app.listen(app.get('port'), () => {
	console.log('App started on port', app.get('port'));
});

module.exports = app;