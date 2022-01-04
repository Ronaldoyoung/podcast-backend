import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Podcast } from '../entities/podcast.entity';

@InputType()
export class CreatePodcastInput extends PickType(Podcast, [
  'title',
  'rating',
  'category',
]) {}

@ObjectType()
export class CreatePodcastOutput extends CoreOutput {}
