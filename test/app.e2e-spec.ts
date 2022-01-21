import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';
import { getConnection, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Podcast } from 'src/podcasts/entities/podcast.entity';

const GRAPHQL_ENDPOINT = '/graphql';
const testUser = {
  eamil: 'ronaldoyoung@gmail.com',
  password: 'dbsendud12',
};

const testPodcast = {
  title: 'testPodcast',
  category: 'sports',
  rating: 1,
};

describe('User Module', () => {
  let app: INestApplication;
  let userRepository: Repository<User>;
  let podcastsRepository: Repository<Podcast>;
  let jwtToken: string;

  const baseTest = () => request(app.getHttpServer()).post(GRAPHQL_ENDPOINT);
  const publicTest = (query: string) => baseTest().send({ query });
  const privateTest = (query: string) =>
    baseTest().set('x-jwt', jwtToken).send({ query });

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    podcastsRepository = module.get<Repository<Podcast>>(
      getRepositoryToken(Podcast),
    );
    await app.init();
  });

  afterAll(async () => {
    await getConnection().dropDatabase();
    app.close();
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
      return publicTest(`
        mutation{
          login(input:{
            email:"${testUser.eamil}"
            password: "${testUser.password}"    
          }){
            ok
            error
            token
          }
        }`)
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
  describe('me', () => {
    it('should find my profile', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('x-jwt', jwtToken)
        .send({
          query: `{
            me{
              id
              email
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                me: { email },
              },
            },
          } = res;
          expect(email).toBe(testUser.eamil);
        });
    });
    it('should not allow logged out user', () => {
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: `{
            me{
              id
              email
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: { errors },
          } = res;
          const [error] = errors;
          expect(error.message).toBe('Forbidden resource');
        });
    });
  });

  describe('editProfile', () => {
    it('should change email', () => {
      const NEW_EMAIL = 'test@new.com';
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .set('x-jwt', jwtToken)
        .send({
          query: `mutation{
            editProfile(input:{
              email:"${NEW_EMAIL}"
            }){
              ok
              error
            }
          }`,
        })
        .expect(200)
        .expect((res) => {
          const {
            body: {
              data: {
                editProfile: { ok, error },
              },
            },
          } = res;
          expect(ok).toBe(true);
          expect(error).toBe(null);
        })
        .then(() => {
          return request(app.getHttpServer())
            .post(GRAPHQL_ENDPOINT)
            .set('x-jwt', jwtToken)
            .send({
              query: `{
              me{
                id
                email
              }
            }`,
            })
            .expect(200)
            .expect((res) => {
              const {
                body: {
                  data: {
                    me: { email },
                  },
                },
              } = res;
              expect(email).toBe(NEW_EMAIL);
            });
        });
    });
  });

  describe('Podcasts Resolver', () => {
    describe('createPodcast', () => {
      it('should crate podcast', () => {
        return privateTest(`mutation{
          createPodcast(input:{
            title:"${testPodcast.title}"
            category:"${testPodcast.category}"
            rating:${testPodcast.rating}
          }) {
            ok
            error
          }
        }`)
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: {
                  createPodcast: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });
    describe('getPodcasts', () => {
      let podcastId: number;
      beforeAll(async () => {
        const [podcast] = await podcastsRepository.find();
        podcastId = podcast.id;
      });
      it('should find all podcast', () => {
        return privateTest(`{
          allPodcasts {
            ok
            error
            result {              
              title
            }
          }
        }`)
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: {
                  allPodcasts: {
                    ok,
                    error,
                    result: [podcast],
                  },
                },
              },
            } = res;

            expect(ok).toBe(true);
            expect(error).toBe(null);
            expect(podcast.title).toBe(testPodcast.title);
          });
      });
      it('should find a podcast', () => {
        return privateTest(`{
          podcast(input:{
            id: ${podcastId}
          }) {
            ok
            error
            result {
              id
            }
          }
        }`)
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: {
                  podcast: {
                    ok,
                    result: { id },
                  },
                },
              },
            } = res;

            expect(ok).toBe(true);
            expect(id).toBe(podcastId);
          });
      });
      it('should update a pocast', () => {
        const NEW_TITLE = 'newTitle';
        return privateTest(`mutation{
          editPodcast(input:{
            podcastId:${podcastId}
            title:"${NEW_TITLE}"
          }){
            ok
            error
          }
        }`)
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: {
                  editPodcast: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
      it('should delete a podcast', () => {
        return privateTest(`
        mutation{
          deletePodcast(input:{
            podcastId: ${podcastId}
          }){
            ok
            error
          }
        }`)
          .expect(200)
          .expect((res) => {
            const {
              body: {
                data: {
                  deletePodcast: { ok, error },
                },
              },
            } = res;
            expect(ok).toBe(true);
            expect(error).toBe(null);
          });
      });
    });

    it.todo('getEpisodes');
    it.todo('createEpisode');
    it.todo('updateEpisode');
    it.todo('deleteEpisode');
  });
});
