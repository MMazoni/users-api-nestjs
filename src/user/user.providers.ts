import { Connection } from 'mongoose';
import { UserSchema } from './user.schema';

// @todo: Both USER_MODEL and DATABASE_CONNECTION should be kept in the separated constants.ts file.
export const userProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('User', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
