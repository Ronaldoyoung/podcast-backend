import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';

@InputType('CreateEpisodeInputType', { isAbstract: true })
@ObjectType()
export class Episode {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  title: string;

  @Field(() => String, { nullable: true })
  category?: string;

  @Field(() => Int, { nullable: true })
  rating?: number;
}
