import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

const mockRespository = () => ({
  find: jest.fn(),
  save: jest.fn(),
  create: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
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

  describe('allPodcasts', () => {
    it('should find allPodcasts', async () => {
      const Podcast = {
        id: 1,
        title: 'testPodcast',
      };
      podcastsRepository.find.mockResolvedValue([Podcast]);
      const result = await service.allPodcasts();
      expect(result).toEqual({
        ok: true,
        result: [Podcast],
      });
    });
    // it('should error on exception', async () => {
    //   podcastsRepository.find.mockResolvedValue(new Error());
    //   const result = await service.allPodcasts();
    //   expect(result).toEqual({
    //     ok: false,
    //     error: 'Could not find podcasts',
    //   });
    // });
  });
  describe('createPodcast', () => {
    it('should create podcast', async () => {
      const creaatePodcastArgs = {
        title: 'testTitle',
        rating: 10,
        category: 'testCategory',
      };
      podcastsRepository.create.mockReturnValue(creaatePodcastArgs);
      const result = await service.createPodcast(creaatePodcastArgs);

      expect(podcastsRepository.create).toHaveBeenCalledTimes(1);
      expect(podcastsRepository.create).toHaveBeenCalledWith(
        creaatePodcastArgs,
      );

      expect(podcastsRepository.save).toHaveBeenCalledWith(creaatePodcastArgs);
      expect(result).toEqual({ ok: true });
    });
  });
  describe('findPodcastById', () => {
    it('should fail if no podcast if found ', async () => {
      podcastsRepository.findOne.mockResolvedValue(null);
      const result = await service.findPodcastById({ id: 1 });
      expect(result).toEqual({ ok: false, error: 'Podcast not found' });
    });
    it('should find podcast by id', async () => {
      const findByIdArgs = {
        id: 1,
      };
      podcastsRepository.findOne.mockResolvedValue(findByIdArgs);
      const result = await service.findPodcastById(findByIdArgs);
      expect(result).toEqual({ ok: true, podcast: findByIdArgs });
    });
  });
  describe('editPodcast', () => {
    const editPodcastArgs = {
      podcastId: 1,
      title: 'newtitle',
      rating: 10,
      category: 'newCategory',
    };
    it('should fail if no podcast if found', async () => {
      podcastsRepository.findOne.mockResolvedValue(undefined);
      const result = await service.editPodcast(editPodcastArgs);
      expect(result).toEqual({
        ok: false,
        error: 'Podcast not found',
      });
    });
    it('should edit podcast', async () => {
      const oldPodcast = {
        title: 'oldTitle',
        rating: 9,
      };
      podcastsRepository.findOne.mockResolvedValue(oldPodcast);
      await service.editPodcast(editPodcastArgs);
      expect(podcastsRepository.findOne).toHaveBeenCalledWith(
        expect.any(Number),
      );
      expect(podcastsRepository.save).toHaveBeenCalledWith({
        id: editPodcastArgs.podcastId,
        ...editPodcastArgs,
      });
    });
  });
  describe('deletePodcast', () => {
    it('should fail if no podcast if found ', async () => {
      podcastsRepository.findOne.mockResolvedValue(null);
      const result = await service.findPodcastById({ id: 1 });
      expect(result).toEqual({ ok: false, error: 'Podcast not found' });
    });
    it('should delete podcast', async () => {
      podcastsRepository.findOne.mockResolvedValue({ id: 1 });
      const result = await service.deletePodcast({ podcastId: 1 });
      expect(podcastsRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ ok: true });
    });
  });
  it.todo('allEpisodes');
  it.todo('createEpisode');
  it.todo('deleteEpisode');
  it.todo('editEpisode');
});
