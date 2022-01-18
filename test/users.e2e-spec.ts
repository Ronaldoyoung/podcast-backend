import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  eamil: 'ronaldoyoung@gmail.com',
  password: 'dbsendud12',
};

describe('User Module', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let jwtToken: string;

  beforeAll(async () => {
    const moudle = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moudle.createNestApplication();
    userRepository = moudle.get<Repository<User>>(getRepositoryToken(User));
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

  describe('login', () => {
    it('should login with correct credentials', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
        mutation{
          login(input:{
            email:"${testUser.eamil}"
            password: "${testUser.password}"    
          }){
            ok
            error
            token
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(true);
          expect(login.error).toBe(null);
          expect(login.token).toEqual(expect.any(String));
          jwtToken = login.token;
        });
    });
    it('should not be able to login with wrong credentials', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `
        mutation{
          login(input:{
            email:"${testUser.eamil}"
            password: "11212121"    
          }){
            ok
            error
            token
          }
        }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: { login },
            },
          } = res;
          expect(login.ok).toBe(false);
          expect(login.error).toBe('Wrong Password');
          expect(login.token).toBe(null);
        });
    });
  });

  describe('userProfile', () => {
    let userId: number;
    beforeAll(async () => {
      const [user] = await userRepository.find();
      userId = user.id;
    });
    it("should see a user's profile", () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', jwtToken)
        .send({
          query: `{
            userProfile(input:{
              userId:${userId}
            }){
              ok
              error
              user{
                id
              }
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          console.log('res', res);
          const {
            body: {
              data: {
                userProfile: {
                  ok,
                  error,
                  user: { id },
                },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
          expect(id).toBe(userId);
        });
    });

    it('should not find a profile', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('X-JWT', jwtToken)
        .send({
          query: `{
            userProfile(input:{
              userId: 666
            }){
              ok
              error
              user{
                id
              }
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          console.log('res', res);
          const {
            body: {
              data: {
                userProfile: { ok, error, user },
              },
            },
          } = res;
          expect(ok).toBe(false);
          expect(error).toBe('Could not find user');
          expect(user).toBe(null);
        });
    });
  });

  describe('Users Resolver', () => {
    it.todo('me');
    it.todo('editProfile');
  });
});
