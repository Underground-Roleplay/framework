const path = require('path')

module.exports = {
    webpack:{
        configure: (webpackConfig, { env, paths }) => { 
            paths.appBuild = webpackConfig.output.path = path.resolve('../client/html');
            return webpackConfig; 
        }
    }
}