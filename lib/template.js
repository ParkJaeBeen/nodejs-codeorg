module.exports = {
    HTML : function (body, list, confirm) {
      let html = `
      <!doctype html>
      <html>
      <head>
      <title>WEB1 - ${body.title}</title>
      <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <a href="/create">create</a>`;
      if (confirm) {
        html += `<a href="./update?id=${body.title}"> update</a>`;
        html += `<form action="delete_process" method="POST"><input type="hidden" name="id" value="${body.title}"><input type="submit" value="delete"></form>`;
      }
      if (body.form) {
        html += `${body.form}`;
      }
      html += `<h2>${body.title}</h2>
      <p>${body.description}</p>
      </body>
      </html>
      `;
      return html;
    },
    List : function(files) {
      let list = '<ul>'
      files.forEach(file => {
        list += `<li><a href="/?id=${file}">${file}</a></li>`;
      });
      list = list + '</ul>';
      return list;
    } ,
    Form : function() {
      let form = `<form action="/create_process" method="POST">
        <p><input type="text" name="title" placeholder="title of file"></p>
        <p><textarea name="description" placeholder="content of file"></textarea></p>
        <p><input type="submit"></p>
      </form>`
      return form;
    },
    Update : function(body, description) {
      let form = `
      <!doctype html>
      <html>
      <head>
      <title>WEB1 - ${body.title}</title>
      <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}`;
      form += `<form action="/update_process" method="POST">
        <input type="hidden" name="id" value="${body.title}">
        <p><input type="text" name="title" placeholder="title of file" value=${body.title}></p>
        <p><textarea name="description" placeholder="content of file">${body.description}</textarea></p>
        <p><input type="submit"></p>
      </form>`;
      return form;
    }
  };