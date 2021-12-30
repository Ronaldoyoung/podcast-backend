import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
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

@ObjectType()
export class CreateEpisodeOutputType extends CoreOutput {}
