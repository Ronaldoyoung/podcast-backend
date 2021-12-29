import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class PodcastInputType {
  @Field(() => Int)
  podcastId: number;
}
