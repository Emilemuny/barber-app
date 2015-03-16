'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},


  {method: 'get', path: '/auth/twitter', config: require('../routes/users/twitter')},
  {method: 'post', path: '/auth/github', config: require('../routes/users/github')},
  
  {method: 'delete', path: '/logout', config: require('../routes/users/logout')}
];
