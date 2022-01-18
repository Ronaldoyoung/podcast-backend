import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';

describe('User Module', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moudle = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moudle.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
  });

  describe('Podcasts Resolver', () => {
    it.todo('getAllPodcasts');
    it.todo('getPodcast');
    it.todo('getEpisodes');
    it.todo('createPodcast');
    it.todo('deletePodcast');
    it.todo('updatePodcast');
    it.todo('createEpisode');
    it.todo('updateEpisode');
    it.todo('deleteEpisode');
  });
  describe('Users Resolver', () => {
    it.todo('createAccount');
    it.todo('userProfile');
    it.todo('login');
    it.todo('me');
    it.todo('editProfile');
  });
});
