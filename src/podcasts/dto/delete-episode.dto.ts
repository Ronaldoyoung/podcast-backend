import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class DeleteEpisodeInputType extends PickType(Episode, ['id']) {
  @Field(() => Int)
  podcastId: number;
}
