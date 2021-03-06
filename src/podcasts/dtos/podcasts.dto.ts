import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class PodcastsOutput extends CoreOutput {
  @Field(() => [Podcast], { nullable: true })
  result?: Podcast[];
}
