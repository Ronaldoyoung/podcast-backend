import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnFalseWithErrorMessage } from 'src/common/functions/return-false.function';
import { Repository } from 'typeorm';
import {
  CreateEpisodeInputType,
  CreateEpisodeOutputType,
} from './dto/create-episode.dto';
import {
  CreatePodcastInputType,
  CreatePodcastOutputType,
} from './dto/create-podcast.dto';
import {
  DeleteEpisodeInputType,
  DeleteEpisodeOutputType,
} from './dto/delete-episode.dto';
import {
  DeletePodcastInputType,
  DeletePodcastOutputType,
} from './dto/delete-podcast.dto';
import {
  EditEpisodeInputType,
  EditEpisodeOutput,
} from './dto/edit-episode.dto';
import { EditPodcastInputType } from './dto/edit-podcast.dto';
import { EpisodesOutputType } from './dto/episodes.dto';
import { PodcastInputType, PodcastOutputType } from './dto/podcast.dto';
import { PodcastsOutputType } from './dto/podcasts.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  constructor(
    @InjectRepository(Podcast)
    private readonly podcasts: Repository<Podcast>,
    @InjectRepository(Episode) private readonly episodes: Repository<Episode>,
  ) {}

  async allPodcasts(): Promise<PodcastsOutputType> {
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
    createPodcastInputType: CreatePodcastInputType,
  ): Promise<CreatePodcastOutputType> {
    try {
      await this.podcasts.save(this.podcasts.create(createPodcastInputType));
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not create podcast');
    }
  }

  async findPodcastById({ id }: PodcastInputType): Promise<PodcastOutputType> {
    try {
      const podcast = await this.podcasts.findOne(id);
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }
      return {
        ok: true,
        podcast,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not find podcast');
    }
  }

  async editPodcast(editPodcastInputType: EditPodcastInputType) {
    try {
      const podcast = this.podcasts.findOne(editPodcastInputType.podcastId);
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }
      await this.podcasts.save({
        id: editPodcastInputType.podcastId,
        ...editPodcastInputType,
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
  }: DeletePodcastInputType): Promise<DeletePodcastOutputType> {
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

  async allEpisodes(): Promise<EpisodesOutputType> {
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
    createEpisodeInputType: CreateEpisodeInputType,
  ): Promise<CreateEpisodeOutputType> {
    try {
      const podcast = await this.podcasts.findOne(
        createEpisodeInputType.podcastId,
      );
      if (!podcast) {
        return returnFalseWithErrorMessage('Podcast not found');
      }

      await this.episodes.save(
        this.episodes.create({
          ...createEpisodeInputType,
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
  }: DeleteEpisodeInputType): Promise<DeleteEpisodeOutputType> {
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
    editEpisodeInputType: EditEpisodeInputType,
  ): Promise<EditEpisodeOutput> {
    try {
      const episode = await this.episodes.findOne(
        editEpisodeInputType.episodeId,
      );

      if (!episode) {
        return returnFalseWithErrorMessage('Episode not found');
      }
      await this.episodes.save({
        id: editEpisodeInputType.episodeId,
        ...editEpisodeInputType,
      });
      return {
        ok: true,
      };
    } catch {
      return returnFalseWithErrorMessage('Could not edit episode');
    }
  }
}
