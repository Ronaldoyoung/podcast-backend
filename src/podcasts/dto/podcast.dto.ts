import { Field, InputType, Int, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class PodcastInputType extends PickType(Podcast, ['id']) {}

@ObjectType()
export class PodcastOutputType extends CoreOutput {
  @Field(() => Podcast)
  podcast?: Podcast;
}
