import { Field, InputType, Int, PickType } from '@nestjs/graphql';
import { Episode } from '../entities/episode.entity';

@InputType()
export class CreateEpisodeInputType extends PickType(Episode, [
  'title',
  'category',
  'rating',
]) {
  @Field(() => Int)
  podcastId: number;
}
