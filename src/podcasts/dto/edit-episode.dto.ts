import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreateEpisodeInputType } from './create-episode.dto';

@InputType()
export class EditEpisodeInputType extends PartialType(CreateEpisodeInputType) {
  @Field(() => Int)
  episodeId: number;
}

@ObjectType()
export class EditEpisodeOutput extends CoreOutput {}
