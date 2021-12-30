import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import {
  EditPodcastInputType,
  EditPodcastOutputType,
} from './dto/edit-podcast.dto';
import { EpisodesInputType } from './dto/episodes.dto';
import { PodcastInputType, PodcastOutputType } from './dto/podcast.dto';
import { PodcastsOutputType } from './dto/podcasts.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => PodcastsOutputType)
  allPodcasts(): Promise<PodcastsOutputType> {
    return this.podcastsService.allPodcasts();
  }

  @Mutation(() => CreatePodcastOutputType)
  createPodcast(
    @Args('input') createPodcastInputType: CreatePodcastInputType,
  ): Promise<CreatePodcastOutputType> {
    return this.podcastsService.createPodcast(createPodcastInputType);
  }

  @Query(() => PodcastOutputType)
  podcast(
    @Args('input') podcastInputType: PodcastInputType,
  ): Promise<PodcastOutputType> {
    return this.podcastsService.findPodcastById(podcastInputType);
  }

  @Mutation(() => EditPodcastOutputType)
  editPodcast(
    @Args('input') editPodcastInputType: EditPodcastInputType,
  ): Promise<EditPodcastOutputType> {
    return this.podcastsService.editPodcast(editPodcastInputType);
  }

  @Mutation(() => DeletePodcastOutputType)
  deletePodcast(
    @Args('input') deletePodcastInputType: DeletePodcastInputType,
  ): Promise<DeletePodcastOutputType> {
    return this.podcastsService.deletePodcast(deletePodcastInputType);
  }

  // @Query(() => [Episode])
  // getAllEpisodes(
  //   @Args('input') episodesInputType: EpisodesInputType,
  // ): Episode[] {
  //   return this.podcastsService.getAllEpisodes(episodesInputType);
  // }

  // @Mutation(() => Boolean)
  // createEpisode(@Args('input') createEpisodeInputType: CreateEpisodeInputType) {
  //   return this.podcastsService.createEpisode(createEpisodeInputType);
  // }

  // @Mutation(() => Boolean)
  // editEpisode(@Args('input') editEpisodeInputType: EditEpisodeInputType) {
  //   return this.podcastsService.editEpisode(editEpisodeInputType);
  // }

  // @Mutation(() => Boolean)
  // deleteEpisode(@Args('input') deleteEpisodeInputType: DeleteEpisodeInputType) {
  //   return this.podcastsService.deleteEpisode(deleteEpisodeInputType);
  // }
}
