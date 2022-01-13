import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository, Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

const mockRespository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
});

type MockRepository<T = any> = Partial<
  Record<keyof Repository<Podcast>, jest.Mock>
>;

describe('PodcastsService', () => {
  let service: PodcastsService;
  let podcastsRepository: MockRepository<Podcast>;
  let episodesRepository: MockRepository<Episode>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        PodcastsService,
        {
          provide: getRepositoryToken(Podcast),
          useValue: mockRespository(),
        },
        {
          provide: getRepositoryToken(Episode),
          useValue: mockRespository(),
        },
      ],
    }).compile();
    service = module.get<PodcastsService>(PodcastsService);
    podcastsRepository = module.get(getRepositoryToken(Podcast));
    episodesRepository = module.get(getRepositoryToken(Episode));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
