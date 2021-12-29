import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class EpisodesInputType {
  @Field(() => Int)
  podcastId: number;
}
