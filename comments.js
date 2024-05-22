// Create web server
// Create a web server that listens on port 3000 and serves the comments.html file. Use the fs module to read the file and send it to the client.

// The comments.html file should contain a form with a text field and a submit button. When the form is submitted, the server should append the submitted comment to a comments.txt file on the server.

// The server should also serve the comments.txt file when the client requests it. The comments.txt file should contain all the comments that have been submitted.

// When the client requests the comments.txt file, the server should read the file and send it to the client.

// Note: The comments.txt file should be created if it doesn't already exist.

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    const urlObj = url.parse(req.url, true);
    const pathname = urlObj.pathname;
    const method = req.method;
    const commentsPath = path.join(__dirname, 'comments.txt');

    if (pathname === '/' && method === 'GET') {
        const htmlPath = path.join(__dirname, 'comments.html');
        const htmlStream = fs.createReadStream(htmlPath);
        htmlStream.pipe(res);
    } else if (pathname === '/' && method === 'POST') {
        let body = [];
        req.on('data', (chunk) => {
            body.push(chunk);
        });
        req.on('end', () => {
            body = Buffer.concat(body).toString();
            const comment = body.split('=')[1];
            fs.appendFile(commentsPath, comment + '\n', (err) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Internal Server Error');
                } else {
                    res.writeHead(302, { 'Location': '/' });
                    res.end();
                }
            });
        });
    } else if (pathname === '/comments.txt' && method === 'GET') {
        const commentsStream = fs.createReadStream(commentsPath);
        commentsStream.pipe(res);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});