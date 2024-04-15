import { applyDecorators } from '@nestjs/common';
import { OnEnv } from './on-env.decorator';

export function OnDev() {
  return applyDecorators(OnEnv('dev'));
}
