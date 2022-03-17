import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../components/App';

const app = express();

app.use(express.static('dist'));

app.get('/', (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Card Memory</title>
      </head>
      <body style="background-color:lightblue">
      <h1 style="text-align: center">Test Your Memory</h1>
        <div id="mountNode">${initialMarkup}</div>
      </body>
    </html>
  `)
});

app.listen(process.env.PORT || 4243, '0.0.0.0', () => {
  console.log("Server is running.")
});