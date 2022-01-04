import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreatePodcastInput } from './create-podcast.dto';

@InputType()
export class EditPodcastInput extends PartialType(CreatePodcastInput) {
  @Field(() => Int)
  podcastId: number;
}

@ObjectType()
export class EditPodcastOutput extends CoreOutput {}
