const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');
const path = require('path');
const template = require('./lib/template.js');
const sanitizeHtml = require('sanitize-html');

const app = http.createServer(function (request, response) {
  let _url = request.url;
  let queryData = url.parse(_url, true).query;
  let pathname = url.parse(_url, true).pathname;

  if (pathname === '/') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, files) => {
        let body = {
          title: 'welcome',
          description: 'hello this is homepage'
        };
        list = template.List(files);
        const html = template.HTML(body, list);
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir('./data', (err, files) => {
        let filteredId = path.parse(queryData.id).base;
        fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
          let body = {
            title: sanitizeHtml(queryData.id),
            description: sanitizeHtml(description)
          };
          list = template.List(files);
          let confirm = 'string';
          const html = template.HTML(body, list, confirm);
          response.writeHead(200);
          response.end(html);
        })
      });
    }
  }
  else if (pathname === '/create') {
    if (queryData.id === undefined) {
      fs.readdir('./data', (err, files) => {
        let body = {
          title: 'WEB - create',
          description : 'create something',
          form: template.Form()
        };
        list = template.List(files);
        const html = template.HTML(body, list);
        response.writeHead(200);
        response.end(html);
      });
    }
  }
  else if (pathname === '/create_process') {
    let body = '';
    request.on('data', (data) => {
      body = body + data;
    });
    request.on('end', () => {
      let post = qs.parse(body);
      let title = sanitizeHtml(post.title);
      let description = sanitizeHtml(post.description);
      fs.writeFile(`./data/${title}`, description, 'utf8', (err) => {
        response.writeHead(302, {
          location: `/?id=${title}`
        });
        response.end();
      })
    });
  }
  else if (pathname === '/update') {
    fs.readdir('./data', (err, files) => {
      let filteredId = path.parse(queryData.id).base;
      fs.readFile(`data/${filteredId}`, 'utf8', (err, description) => {
        let body = {
          title: queryData.id,
          description : description
        };
        list = template.List(files);
        const html = template.Update(body, list);
        response.writeHead(200);
        response.end(html);
      })
    });
  }
  else if (pathname === '/update_process') {
    let body = '';
    request.on('data', (data) => {
      body = body + data;
    });
    request.on('end', () => {
      let post = qs.parse(body);
      let id = post.id;
      let title = post.title;
      let description = post.description;
      fs.rename(`data/${id}`, `data/${title}`,(error) =>{
        fs.writeFile(`data/${title}`, description, 'utf8', (err)=>{
        response.writeHead(302, {
          location: `/?id=${title}`
        });
        response.end();
        })
      });
    });
  } else if (pathname === '/delete_process') {
    let body = '';
    request.on('data', (data) => {
      body = body + data;
    });
    request.on('end', () => {
      let post = qs.parse(body);
      let id = post.id;
      let filteredId = path.parse(id).base;
      fs.unlink(`data/${filteredId}`, (err) => {
        response.writeHead(302, {
          location: `/`
        });
        response.end();
      });
    });
  }
  else {
    response.writeHead(404);
    response.end('Not Found');
  }
});
app.listen(3000);