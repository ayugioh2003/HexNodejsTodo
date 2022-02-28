import fs from 'fs';

// utils
import responseHandler from './utils/responseHandler.js';
import errorHandler from './utils/errorHandler.js';
import headers from './utils/headers.js';

// routes
import todosRoute from './components/todos/index.js';
import todoRoute from './components/todo/index.js';

// model
import todosModel from './components/todos/model.js';

export default (req, res) => {
  req.body = '';
  req.on('data', (chunk) => {
    req.body += chunk;
  });

  req.on('end', () => {
    if (req.method == 'OPTIONS') {
      return responseHandler({ res, data: todosModel.getAll() });
    }
    if (req.url === '/' && req.method === 'GET') {
      fs.readFile(
        './pages/index/index.html',
        { encoding: 'utf8', flag: 'r' },
        function (error, data) {
          if (error) {
            console.log('error', error);
            errorHandler({ res, errorMessage: error.message });
          } else {
            res.writeHead(200, { ...headers, 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
          }
        }
      );
      return;
      // return responseHandler({ res, data: todosModel.getAll() })
    }

    if (req.url === '/todos') {
      todosRoute(req, res);
      return;
    }

    if (req.url.includes('/todos/')) {
      todoRoute(req, res);
      return;
    }

    // ------------ else ------------
    return errorHandler({
      res,
      code: 404,
    });
  });
};
