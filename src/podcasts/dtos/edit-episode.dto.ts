import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateEpisodeInput } from './create-episode.dto';

@InputType()
export class EditEpisodeInput extends PartialType(CreateEpisodeInput) {
  @Field(() => Int)
  episodeId: number;
}

@ObjectType()
export class EditEpisodeOutput extends CoreOutput {}
