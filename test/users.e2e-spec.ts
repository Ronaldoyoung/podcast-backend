import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection } from 'typeorm';

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  eamil: 'ronaldoyoung@gmail.com',
  password: 'dbsendud12',
};

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

  describe('createAccount', () => {
    it('should create Account', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
          createAccount(input:{
            email:"${testUser.eamil}"
            password: "${testUser.password}"    
            role: Host
          }){
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(true);
          expect(res.body.data.createAccount.error).toBe(null);
        });
    });
    it('should fail if account exists', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `mutation{
          createAccount(input:{
            email:"${testUser.eamil}"
            password: "${testUser.password}"    
            role: Host
          }){
            ok
            error
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createAccount.ok).toBe(false);
          expect(res.body.data.createAccount.error).toEqual(expect.any(String));
        });
    });
  });
  describe('Users Resolver', () => {
    it.todo('userProfile');
    it.todo('login');
    it.todo('me');
    it.todo('editProfile');
  });
});
