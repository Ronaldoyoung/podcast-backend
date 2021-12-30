import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class DeleteEpisodeInputType {
  @Field(() => Int)
  episodeId: number;
}

@ObjectType()
export class DeleteEpisodeOutputType extends CoreOutput {}
