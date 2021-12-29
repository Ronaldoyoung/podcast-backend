import { Module } from '@nestjs/common';
import { PodcastsResolver } from './podcasts.resolver';
// import { PodcastsController } from './podcasts.controller';
import { PodcastsService } from './podcasts.service';

@Module({
  // controllers: [PodcastsController],
  providers: [PodcastsService, PodcastsResolver],
})
export class PodcastsModule {}
