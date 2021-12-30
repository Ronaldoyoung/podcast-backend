import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';
import { Episode } from '../entities/episode.entity';

@ObjectType()
export class EpisodesOutputType extends CoreOutput {
  @Field(() => [Episode])
  episodes?: Episode[];
}
