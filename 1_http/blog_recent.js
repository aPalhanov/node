/*
const http = require('http');
const fs = require('fs');
http.createServer((req, res) => {
	if (req.url == '/') {
		fs.readFile('./json/titles.json', (err, data) => {
			if (err) {
				console.error(err);
				res.end('Server Error');
			} else {
				const titles = JSON.parse(data.toString());
				fs.readFile('./html/index.html', (err, data) => {
					if (err) {
						console.error(err);
						res.end('Server Error');
					} else {
						const tmpl = data.toString();
						const html = tmpl.replace('%', titles.join('</li><li>'));
						res.writeHead(200, { 'Content-Type': 'text/html' });
						res.end(html);
					}
				});
			}
		});
	}
}).listen(8000, '127.0.0.1');
*/


const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
	getTitles(res);
}).listen(8000, '127.0.0.1');

function getTitles(res) {
	fs.readFile('./json/titles.json', (err, data) => {
		if (err) return hadError(err, res);
		getTemplate(JSON.parse(data.toString()), res);
	});
}

function getTemplate(titles, res) {
	fs.readFile('./html/index.html', (err, data) => {
		if (err) return hadError(err, res);
		formatHtml(titles, data.toString(), res);
	});
}

function formatHtml(titles, tmpl, res) {
	const html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.end(html);
}

function hadError(err, res) {
	console.error(err);
	res.end('Server Error');
}
