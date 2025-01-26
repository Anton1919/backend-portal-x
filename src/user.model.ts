import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Criterion {
  @Field(() => String)
  title: string;

  @Field(() => String)
  id: string;

  @Field(() => Boolean)
  access: boolean;
}

@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  middle_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String, { nullable: true })
  location?: string;

  @Field(() => String, { nullable: true })
  avatar?: string | null;

  @Field(() => String, { nullable: true })
  post?: string;

  @Field(() => String, { nullable: true })
  profile_link?: string;

  @Field(() => [Criterion])
  criteria: Criterion[];

  @Field(() => Int)
  publications_count: number;

  @Field(() => Int)
  subscriber_counts: number;
}
