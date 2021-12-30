import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Podcast } from './podcast.entity';

@InputType('CreateEpisodeInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Episode extends CoreEntity {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  @IsNumber()
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  title: string;

  @Field(() => String, { nullable: true })
  @Column()
  @IsString()
  category?: string;

  @Field(() => Int, { nullable: true })
  @Column()
  @IsNumber()
  rating?: number;

  @Field(() => Podcast)
  @ManyToOne(() => Podcast, (podcast) => podcast.episodes)
  podcast: Podcast;
}
