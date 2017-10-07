'use strict';

// Development specific configuration
// ==================================
//module.exports = {
//  PARSE_APPID: 'h4fBz9LKOYSpyMkjDtSF6Pkf21QYiPUaWFbSg84l',
//  PARSE_JSKEY: 'EXe1NsztkCdTdc9jn8GhRiFRBp4SkHOysFHVMDcm'
//};

module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://fluffyfurface:fluffyfurface@ds157278.mlab.com:57278/fluffyfurface'
  },

  seedDB: true
};
