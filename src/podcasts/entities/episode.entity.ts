import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('CreateEpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column()
  category?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  rating?: number;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
  podcast: Podcast;
}
