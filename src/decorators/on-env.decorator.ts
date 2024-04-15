import { SetMetadata } from '@nestjs/common';
import * as process from 'process';

export function OnEnv(env: string): MethodDecorator {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    // Marquer la méthode avec une métadonnée spécifique pour indiquer qu'elle est en mode développement
    SetMetadata('isDev', true)(target, key, descriptor);

    const originalMethod = descriptor.value;

    descriptor.value = function (...args: any[]) {
      if (process.env.NODE_ENV !== 'dev') {
        console.log(
          `Skipping execution of ${key} because it's not in development mode.`,
        );
        return;
      }

      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
