// import * as Keystone from 'keystone';
import { Router } from 'express';
import * as CORS from 'cors';
import Middleware from './middleware';
import * as Views from './views';
import * as API from './api';
import * as Next from 'next';
import { IncomingMessage, ServerResponse } from 'http';

export default (next: Next.Server) => {
  const nextHandler = next.getRequestHandler();
  const router = Router();

  router.all(/api*/, CORS());
  router.use('/api/agenda', API.agenda);
  router.use('/api/events', API.events);
  router.use('/api/login', API.login);
  router.use('/api/questions', API.questions);
  router.use('/api/speakers', API.speakers);
  router.use('/middleware', Middleware);

  router.use('/views/home', Views.home);

  router.get('*', (request: IncomingMessage, response: ServerResponse) =>
    nextHandler(request, response)
  );

  return router;
};

// HTML views
// router.get('/', views.home);
// router.get('/about', views.about);
// router.get('/past-editions', views.pastEditions);
// router.get('/empowerPL', views.empowerPL);
// router.all('/contact', views.contact);
// REST API
