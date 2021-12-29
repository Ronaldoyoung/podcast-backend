// import {
//   Body,
//   Controller,
//   Delete,
//   Get,
//   Param,
//   Patch,
//   Post,
// } from '@nestjs/common';
// import { Episode } from './entities/episode.entity';
// import { Podcast } from './entities/podcast.entity';
// import { PodcastsService } from './podcasts.service';

// @Controller('podcasts')
// export class PodcastsController {
//   constructor(private readonly podcastsService: PodcastsService) {}

//   @Get()
//   getAllPodcasts() {
//     return this.podcastsService.getAllPodcasts();
//   }

//   @Post()
//   createPodcasts(@Body() podcastData: Podcast) {
//     return this.podcastsService.createPodcasts(podcastData);
//   }

//   @Get(':id')
//   getOnePodcast(@Param('id') podcastId: number) {
//     return this.podcastsService.getOnePodcast(podcastId);
//   }

//   @Patch(':id')
//   editPodcast(@Param('id') podcastId: number, @Body() updateData: Podcast) {
//     return this.podcastsService.editPodcast(podcastId, updateData);
//   }

//   @Delete(':id')
//   deletePodcast(@Param('id') podcastId: number) {
//     return this.podcastsService.deletePodcast(podcastId);
//   }

//   @Get(':id/episodes')
//   getAllEpisodes(@Param('id') podcastId: number): Episode[] {
//     return this.podcastsService.getAllEpisodes(podcastId);
//   }

//   @Post(':id/episodes')
//   createEpisode(@Param('id') podcastId: number, @Body() episodeData: Episode) {
//     return this.podcastsService.createEpisode(podcastId, episodeData);
//   }

//   @Patch(':id/episodes/:episodeId')
//   editEpisode(
//     @Param('id') podcastId: number,
//     @Param('episodeId') episodeId: number,
//     @Body() updateData: Episode,
//   ) {
//     return this.podcastsService.editEpisode(podcastId, episodeId, updateData);
//   }

//   @Delete(':id/episodes/:episodeId')
//   deleteEpisode(
//     @Param('id') podcastId: number,
//     @Param('episodeId') episodeId: number,
//   ) {
//     return this.podcastsService.deleteEpisode(podcastId, episodeId);
//   }
// }
