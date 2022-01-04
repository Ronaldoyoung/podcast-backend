import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import { EditPodcastInput, EditPodcastOutput } from './dtos/edit-podcast.dto';
import { EpisodesOutput } from './dtos/episodes.dto';
import { PodcastInput, PodcastOutput } from './dtos/podcast.dto';
import { PodcastsOutput } from './dtos/podcasts.dto';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => PodcastsOutput)
  allPodcasts(): Promise<PodcastsOutput> {
    return this.podcastsService.allPodcasts();
  }

  @Mutation(() => CreatePodcastOutput)
  createPodcast(
    @Args('input') createPodcastInput: CreatePodcastInput,
  ): Promise<CreatePodcastOutput> {
    return this.podcastsService.createPodcast(createPodcastInput);
  }

  @Query(() => PodcastOutput)
  podcast(@Args('input') podcastInput: PodcastInput): Promise<PodcastOutput> {
    return this.podcastsService.findPodcastById(podcastInput);
  }

  @Mutation(() => EditPodcastOutput)
  editPodcast(
    @Args('input') editPodcastInput: EditPodcastInput,
  ): Promise<EditPodcastOutput> {
    return this.podcastsService.editPodcast(editPodcastInput);
  }

  @Mutation(() => DeletePodcastOutput)
  deletePodcast(
    @Args('input') deletePodcastInput: DeletePodcastInput,
  ): Promise<DeletePodcastOutput> {
    return this.podcastsService.deletePodcast(deletePodcastInput);
  }

  @Query(() => EpisodesOutput)
  allEpisodes(): Promise<EpisodesOutput> {
    return this.podcastsService.allEpisodes();
  }

  @Mutation(() => CreateEpisodeOutput)
  createEpisode(
    @Args('input') createEpisodeInput: CreateEpisodeInput,
  ): Promise<CreateEpisodeOutput> {
    return this.podcastsService.createEpisode(createEpisodeInput);
  }

  @Mutation(() => EditEpisodeOutput)
  editEpisode(
    @Args('input') editEpisodeInput: EditEpisodeInput,
  ): Promise<EditEpisodeOutput> {
    return this.podcastsService.editEpisode(editEpisodeInput);
  }

  @Mutation(() => DeleteEpisodeOutput)
  deleteEpisode(
    @Args('input') deleteEpisodeInput: DeleteEpisodeInput,
  ): Promise<DeleteEpisodeOutput> {
    return this.podcastsService.deleteEpisode(deleteEpisodeInput);
  }
}
