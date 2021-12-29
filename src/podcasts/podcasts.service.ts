import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEpisodeInputType } from './dto/create-episode.dto';
import { CreatePodcastInputType } from './dto/create-podcast.dto';
import { DeleteEpisodeInputType } from './dto/delete-episode.dto';
import { EditEpisodeInputType } from './dto/edit-episode.dto';
import { EditPodcastInputType } from './dto/edit-podcast.dto';
import { PodcastInputType } from './dto/podcast.dto';
import { PodcastsOutputType } from './dto/podcasts.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = [];
  private episodes: Episode[] = [];
  getAllPodcasts(): PodcastsOutputType {
    return { result: this.podcasts };
  }

  createPodcasts(createPodcastInputType: CreatePodcastInputType): boolean {
    this.podcasts.push({
      id: this.podcasts.length + 1,
      ...createPodcastInputType,
    });

    if (this.podcasts.length === 0) {
      return false;
    }
    return true;
  }

  getOnePodcast({ podcastId }: PodcastInputType) {
    const podcast = this.podcasts.find((podcast) => podcast.id === podcastId);

    if (!podcast) {
      throw new NotFoundException(`Podcast with ID ${podcastId} not found.`);
    }
    return podcast;
  }

  editPodcast(editPodcastInputType: EditPodcastInputType) {
    const podcast = this.getOnePodcast({
      podcastId: editPodcastInputType.podcastId,
    });
    this.deletePodcast({ podcastId: editPodcastInputType.podcastId });
    this.podcasts.push({
      ...podcast,
      ...editPodcastInputType,
    });
    return true;
  }

  deletePodcast({ podcastId }: PodcastInputType) {
    this.getOnePodcast({ podcastId });
    this.podcasts = this.podcasts.filter((podcast) => podcast.id !== podcastId);
    return true;
  }

  getAllEpisodes(id: PodcastInputType): Episode[] {
    const { episodes } = this.getOnePodcast(id);
    if (!episodes) {
      return [];
    }
    return episodes;
  }

  createEpisode(createEpisodeInputType: CreateEpisodeInputType) {
    const podcast = this.getOnePodcast({
      podcastId: createEpisodeInputType.podcastId,
    });

    if (!podcast.episodes) {
      podcast['episodes'] = [];
    }
    podcast.episodes.push({
      id: podcast.episodes.length + 1,
      ...createEpisodeInputType,
    });
    return true;
  }

  deleteEpisode(deleteEpisodeInputType: DeleteEpisodeInputType) {
    const podcast = this.getOnePodcast({
      podcastId: deleteEpisodeInputType.podcastId,
    });
    podcast.episodes = podcast.episodes.filter(
      (episode) => episode.id !== deleteEpisodeInputType.id,
    );
  }

  editEpisode(editEpisodeInputType: EditEpisodeInputType) {
    const podcast = this.getOnePodcast({
      podcastId: editEpisodeInputType.podcastId,
    });
    this.deleteEpisode({
      id: editEpisodeInputType.id,
      podcastId: editEpisodeInputType.podcastId,
    });

    const obj = {
      id: editEpisodeInputType.id,
      title: editEpisodeInputType.title,
      category: editEpisodeInputType.category,
      rating: editEpisodeInputType.rating,
    };

    podcast.episodes.push(obj);
    return true;
  }
}
