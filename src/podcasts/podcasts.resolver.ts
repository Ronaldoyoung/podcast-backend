import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CreateEpisodeInputType } from './dto/create-episode.dto';
import { CreatePodcastInputType } from './dto/create-podcast.dto';
import { DeleteEpisodeInputType } from './dto/delete-episode.dto';
import { DeletePodcastInputType } from './dto/delete-podcast.dto';
import { EditEpisodeInputType } from './dto/edit-episode.dto';
import { EditPodcastInputType } from './dto/edit-podcast.dto';
import { EpisodesInputType } from './dto/episodes.dto';
import { PodcastInputType } from './dto/podcast.dto';
import { PodcastsOutputType } from './dto/podcasts.dto';
import { Episode } from './entities/episode.entity';
import { Podcast } from './entities/podcast.entity';
import { PodcastsService } from './podcasts.service';

@Resolver(() => Podcast)
export class PodcastsResolver {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Query(() => PodcastsOutputType)
  async allPodcasts(): Promise<PodcastsOutputType> {
    return this.podcastsService.allPodcasts();
  }

  // @Mutation(() => Boolean)
  // createPodcasts(
  //   @Args('input') createPodcastInputType: CreatePodcastInputType,
  // ): boolean {
  //   return this.podcastsService.createPodcasts(createPodcastInputType);
  // }

  // @Query(() => Podcast)
  // getOnePodcast(@Args('input') podcastId: PodcastInputType) {
  //   return this.podcastsService.getOnePodcast(podcastId);
  // }

  // @Mutation(() => Boolean)
  // editPodcast(@Args('input') editPodcastInputType: EditPodcastInputType) {
  //   return this.podcastsService.editPodcast(editPodcastInputType);
  // }

  // @Mutation(() => Boolean)
  // deletePodcast(@Args('input') deletePodcastInputType: DeletePodcastInputType) {
  //   return this.podcastsService.deletePodcast(deletePodcastInputType);
  // }

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
