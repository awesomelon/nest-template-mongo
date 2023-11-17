import { User, UserSchema } from 'src/user/schema';

// lib
import * as bcrypt from 'bcrypt';

export const databaseProvider = [
  {
    name: User.name,
    useFactory: () => {
      const schema = UserSchema;
      schema.pre<User>('save', function (next) {
        const user = this;
        user.created = new Date();

        if (user.password) {
          bcrypt.genSalt(10, (err, salt) => {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, (err, hash) => {
              if (err) return next(err);
              user.password = hash;
              next();
            });
          });
        }

        schema.pre('updateOne', function (next: Function) {
          const self = this;
          self.set({
            updated: new Date(),
          });
          next();
        });
      });
      return schema;
    },
  },
];
