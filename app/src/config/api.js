var config = {
  scheme: 'release',
  env: {
    alpha: {
      url_prefix: 'http://cxf.yinyuetai.com:3000',
    },
    beta: {
      url_prefix: 'https://api-base-dev.leappmusic.cc',
      url_prefix2: 'http://api-ha.leappmusic.cc',
    },
    release: {
      url_prefix: 'https://api-base.leappmusic.cc',
      url_prefix2: 'http://api-ha.leappmusic.cc',
    }
  },
  prefix: '',
  domains: {
    urlStatic: 'http://s.yytcdn.com',
  }
};


if (process.env.NODE_ENV !== 'product') {
  config.scheme = 'beta';
  // config.prefix = '/www';
}else{
  config.scheme = 'release';
}
module.exports = config;
