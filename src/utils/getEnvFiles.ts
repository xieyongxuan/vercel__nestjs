import { join } from 'path';

export function getEnvFiles() {
  const BASE_DIR = process.cwd();

  if (process.env.NODE_ENV === 'production') {
    return [join(BASE_DIR, '.env.local'), join(BASE_DIR, '.env.production')];
  }

  return [join(BASE_DIR, '.env.local'), join(BASE_DIR, '.env.development')];
}
