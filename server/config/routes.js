'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},

  {method: 'post', path: '/login', config: require('../routes/business/login')},
  {method: 'post', path: '/register', config: require('../routes/business/register')},
  {method: 'delete', path: '/auth/logout', config: require('../routes/business/logout')},

  {method: 'get', path: '/auth/twitter', config: require('../routes/users/twitter')},
  {method: 'post', path: '/auth/github', config: require('../routes/users/github')},
  {method: 'post', path: '/auth/facebook', config: require('../routes/users/facebook')},
  {method: 'post', path: '/auth/instagram', config: require('../routes/users/instagram')},
  {method: 'post', path: '/auth/google', config: require('../routes/users/google')},

  {method: 'get', path: '/yelp', config: require('../routes/yelp/getreviews')},
  {method: 'post', path: '/business/{businessId}/message', config: require('../routes/business/updatePIN_text')}

];
