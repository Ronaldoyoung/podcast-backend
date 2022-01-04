import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class PodcastInput extends PickType(Podcast, ['id']) {}

@ObjectType()
export class PodcastOutput extends CoreOutput {
  @Field(() => Podcast)
  podcast?: Podcast;
}
