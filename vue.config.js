// vue.config.js
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/SmoothieWebInterface/dist/' : '/',
  pages: {
    index: {
      // entry for the page
      entry: 'src/index/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'index.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    connect: {
      // entry for the page
      entry: 'src/connect/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'connect.html',
      // when using title option,
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Connect Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'connect']
    },
    make: {
      // entry for the page
      entry: 'src/make/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'make.html',
      // when using title option
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Make Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'make']
    },
    monitor: {
      // entry for the page
      entry: 'src/monitor/main.js',
      // the source template
      template: 'public/index.html',
      // output as dist/index.html
      filename: 'monitor.html',
      // when using title option
      // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Monitor Page',
      // chunks to include on this page, by default includes
      // extracted common chunks and vendor chunks.
      chunks: ['chunk-vendors', 'chunk-common', 'monitor']
    }


    // when using the entry-only string format,
    // template is inferred to be `public/subpage.html`
    // and falls back to `public/index.html` if not found.
    // Output filename is inferred to be `subpage.html`.
    //subpage: 'src/subpage/main.js'
  }
}
