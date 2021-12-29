import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreOutput } from 'src/common/dto/output.dto';

@InputType()
export class CreatePodcastInputType {
  @Field(() => String)
  @IsString()
  title: string;

  @Field(() => String)
  @IsString()
  category: string;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  rating?: number;
}

@ObjectType()
export class CreatePodcastOutputType extends CoreOutput {}
