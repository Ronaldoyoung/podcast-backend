import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class DeleteEpisodeInput {
  @Field(() => Int)
  episodeId: number;
}

@ObjectType()
export class DeleteEpisodeOutput extends CoreOutput {}
