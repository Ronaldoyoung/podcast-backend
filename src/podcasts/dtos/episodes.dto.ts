import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class EpisodesOutput extends CoreOutput {
  @Field(() => [Episode])
  episodes?: Episode[];
}
