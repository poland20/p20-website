import * as keystone from 'keystone';
import * as mongoose from 'mongoose';
const Types = keystone.Field.Types;

export interface User {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

export type UserDocument = keystone.Document<User>;

const User = new keystone.List('User');

User.add({
  name: { type: Types.Name, required: true, index: true },
  email: { type: Types.Email, initial: true, required: true, index: true },
  password: { type: Types.Password, initial: true, required: true },
}, 'Permissions', {
  isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
  return this.isAdmin;
});

 // TODO: send an email with password on create?
User.defaultColumns = 'name, email, isAdmin';
User.register();

export default User;