import { Field, ObjectType } from '@nestjs/graphql';
import { Podcast } from '../entities/podcast.entity';

@ObjectType()
export class PodcastsOutputType {
  @Field(() => [Podcast], { nullable: true })
  result?: Podcast[];
}
