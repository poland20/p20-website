const keystone = require('keystone');
const User = keystone.list('User');
const ContentControl = keystone.list('ContentControl');
 
 /*
  * Admin updates are executed by keystone so they are done in plain JS.
  */

exports = module.exports = function(done) {
    
    
    Promise.all(
        [
        new User.model({name: { first: 'Admin', last: 'User' },
            email: 'admin@poland20.com',
            password: 'admin', 
            canAccessKeystone: true
        }).save(),
        new ContentControl.model({}).save()
    ]).then(done);
};