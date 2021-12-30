import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { returnFalseWithErrorMessage } from 'src/common/functions/return-false.function';
import { Repository } from 'typeorm';
import { CreateEpisodeInputType } from './dto/create-episode.dto';
import {
  CreatePodcastInputType,
  CreatePodcastOutputType,
} from './dto/create-podcast.dto';
import { DeleteEpisodeInputType } from './dto/delete-episode.dto';
import {
  DeletePodcastInputType,
  DeletePodcastOutputType,
} from './dto/delete-podcast.dto';
import { EditEpisodeInputType } from './dto/edit-episode.dto';
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

  // createEpisode(createEpisodeInputType: CreateEpisodeInputType) {
  //   const podcast = this.getOnePodcast({
  //     podcastId: createEpisodeInputType.podcastId,
  //   });

  //   if (!podcast.episodes) {
  //     podcast['episodes'] = [];
  //   }
  //   podcast.episodes.push({
  //     id: podcast.episodes.length + 1,
  //     ...createEpisodeInputType,
  //   });
  //   return true;
  // }

  // deleteEpisode(deleteEpisodeInputType: DeleteEpisodeInputType) {
  //   const podcast = this.getOnePodcast({
  //     podcastId: deleteEpisodeInputType.podcastId,
  //   });
  //   podcast.episodes = podcast.episodes.filter(
  //     (episode) => episode.id !== deleteEpisodeInputType.id,
  //   );
  // }

  // editEpisode(editEpisodeInputType: EditEpisodeInputType) {
  //   const podcast = this.getOnePodcast({
  //     podcastId: editEpisodeInputType.podcastId,
  //   });
  //   this.deleteEpisode({
  //     id: editEpisodeInputType.id,
  //     podcastId: editEpisodeInputType.podcastId,
  //   });

  //   const obj = {
  //     id: editEpisodeInputType.id,
  //     title: editEpisodeInputType.title,
  //     category: editEpisodeInputType.category,
  //     rating: editEpisodeInputType.rating,
  //   };

  //   podcast.episodes.push(obj);
  //   return true;
  // }
}
