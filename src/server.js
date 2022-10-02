import * as dotenv from 'dotenv';
dotenv.config();

import Hapi from '@hapi/hapi';
import notesPlugin from './api/notes/index.js';
import NotesService from './services/inMemory/NotesService.js';
import NotesValidator from './validator/notes/index.js';

const init = async () => {
  const notesService = new NotesService();
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: notesPlugin,
    options: {
      service: notesService,
      validator: NotesValidator,
    },
  });

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
