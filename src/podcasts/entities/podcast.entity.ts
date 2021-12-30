import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Episode } from './episode.entity';

@InputType('CreatePodcastInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String)
  @Column()
  @IsString()
  category: string;

  @Field(() => Int)
  @Column()
  @IsNumber()
  rating: number;

  @Field(() => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast, {
    onDelete: 'CASCADE',
  })
  episodes: Episode[];
}
