import { Field, Int, ObjectType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Episode } from './episode.entity';

@ObjectType()
@Entity()
export class Podcast extends CoreEntity {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  category: string;

  @Field(() => Int, { nullable: true })
  @Column()
  rating?: number;

  @Field(() => [Episode])
  @OneToMany(() => Episode, (episode) => episode.podcast, {
    onDelete: 'CASCADE',
  })
  episodes: Episode[];
}
