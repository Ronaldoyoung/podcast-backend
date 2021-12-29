import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Episode } from './episode.entity';

@ObjectType()
export class Podcast {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String)
  category: string;

  @Field(() => Int, { nullable: true })
  rating?: number;

  @Field(() => [Episode], { nullable: true })
  episodes?: Episode[];
}
