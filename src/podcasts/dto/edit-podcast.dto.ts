import {
  Field,
  InputType,
  Int,
  ObjectType,
  PartialType,
} from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { CreatePodcastInputType } from './create-podcast.dto';

@InputType()
export class EditPodcastInputType extends PartialType(CreatePodcastInputType) {
  @Field(() => Int)
  podcastId: number;
}

@ObjectType()
export class EditPodcastOutputType extends CoreOutput {}
