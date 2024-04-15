import { applyDecorators } from '@nestjs/common';
import { OnEnv } from './on-env.decorator';

export function OnProd() {
  return applyDecorators(OnEnv('production'));
}
