import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreatePodcastInputType } from './create-podcast.dto';

@InputType()
export class EditPodcastInputType extends PartialType(CreatePodcastInputType) {
  @Field(() => Int)
  podcastId: number;
}
