import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import { CreateEpisodeInputType } from './create-episode.dto';

@InputType()
export class EditEpisodeInputType extends PartialType(CreateEpisodeInputType) {
  @Field(() => Int)
  id: number;
}
