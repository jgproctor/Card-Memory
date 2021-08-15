import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';
//import path from 'path';

const app = express();
//const { join } = path;

app.use(express.static('dist'));
//app.use(express.static(join(__dirname, '../../public/')));
app.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Card Memory</title>
      </head>
      <body style="background-color:lightblue">
        <div id="mountNode">${initialMarkup}</div>
      </body>
    </html>
  `)
});

app.listen(process.env.PORT || 3000);