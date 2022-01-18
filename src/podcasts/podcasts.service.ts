import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnFalseWithErrorMessage } from 'src/common/functions/return-false.function';
import { Repository } from 'typeorm';
import {
  CreateEpisodeInput,
  CreateEpisodeOutput,
} from './dtos/create-episode.dto';
import {
  CreatePodcastInput,
  CreatePodcastOutput,
} from './dtos/create-podcast.dto';
import {
  DeleteEpisodeInput,
  DeleteEpisodeOutput,
} from './dtos/delete-episode.dto';
import {
  DeletePodcastInput,
  DeletePodcastOutput,
} from './dtos/delete-podcast.dto';
import { EditEpisodeInput, EditEpisodeOutput } from './dtos/edit-episode.dto';
import { EditPodcastInput } from './dtos/edit-podcast.dto';
import { EpisodesOutput } from './dtos/episodes.dto';
import { PodcastInput, PodcastOutput } from './dtos/podcast.dto';
import { PodcastsOutput } from './dtos/podcasts.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
  ) {}

  async allPodcasts(): Promise<PodcastsOutput> {
    try {
      const podcasts = await this.podcasts.find();

      return {
        ok: true,
        result: podcasts,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not find podcasts');
    }
  }

  async createPodcast(
    createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    try {
      await this.podcasts.save(this.podcasts.create(createPodcastInput));
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not create podcast');
    }
  }

  async findPodcastById({ id }: PodcastInput): Promise<PodcastOutput> {
    try {
      const podcast = await this.podcasts.findOne(id);
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }
      return {
        ok: true,
        result: podcast,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not find podcast');
    }
  }

  async editPodcast(editPodcastInput: EditPodcastInput) {
    try {
      const podcast = await this.podcasts.findOne(editPodcastInput.podcastId);

      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }
      await this.podcasts.save({
        id: editPodcastInput.podcastId,
        ...editPodcastInput,
      });
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not edit podcast');
    }
  }

  async deletePodcast({
    podcastId,
  }: DeletePodcastInput): Promise<DeletePodcastOutput> {
    try {
      const podcast = this.podcasts.findOne(podcastId);
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }
      await this.podcasts.delete(podcastId);
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not delete podcast');
    }
  }

  async allEpisodes(): Promise<EpisodesOutput> {
    try {
      const episodes = await this.episodes.find();
      if (!episodes) {
        returnFalseWithErrorMessage('episodes not found');
      }
      return {
        ok: true,
        episodes,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not find episodes');
    }
  }

  async createEpisode(
    createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    try {
      const podcast = await this.podcasts.findOne(createEpisodeInput.podcastId);
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }

      await this.episodes.save(
        this.episodes.create({
          ...createEpisodeInput,
          podcast,
        }),
      );

      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not create episode');
    }
  }

  async deleteEpisode({
    episodeId,
  }: DeleteEpisodeInput): Promise<DeleteEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne(episodeId);
      if (!episode) {
        return returnFalseWithErrorMessage('Episode not Found');
      }
      await this.episodes.delete(episodeId);
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not delete episode');
    }
  }

  async editEpisode(
    editEpisodeInput: EditEpisodeInput,
  ): Promise<EditEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne(editEpisodeInput.episodeId);

      if (!episode) {
        return returnFalseWithErrorMessage('Episode not found');
      }
      await this.episodes.save({
        id: editEpisodeInput.episodeId,
        ...editEpisodeInput,
      });
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not edit episode');
    }
  }
}
