import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthUser = createParamDecorator((data: unknown, context) => {
  const gqlContext = GqlExecutionContext.create(context).getContext();
  const user = gqlContext['user'];
  return user;
});
