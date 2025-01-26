import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  middle_name: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  post?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
