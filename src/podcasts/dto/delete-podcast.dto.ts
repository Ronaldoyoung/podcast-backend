import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class DeletePodcastInputType {
  @Field(() => Int)
  podcastId: number;
}

@ObjectType()
export class DeletePodcastOutputType extends CoreOutput {}
