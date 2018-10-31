import firebase from './firebase'

const modifyHtml = (html) => {
  // Add amp-custom tag to added CSS
  html = html.replace(/<style data-vue-ssr/g, '<style amp-custom data-vue-ssr')
  // Remove every script tag from generated HTML // Except for json 
  html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, (str) => {
    if (/application\/json/.test(str)) {
      return str;
    }
    return '';
  })
  // Add AMP script before </head>
  const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script><script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"></script><script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>'
  html = html.replace('</head>', ampScript + '</head>')
  return html
}

export default {
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width,minimum-scale=1' }
    ],
    link: [
      // { rel: 'canonical', href: '/' }, // Set in pages Individually 
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto' }
    ]
  },
  css: ['~/assets/main.css'],
  loading: false, // Disable loading bar since AMP will not generate a dynamic page
  render: {
    // Disable resourceHints since we don't load any scripts for AMP
    resourceHints: false
  },
  hooks: {
    // This hook is called before generatic static html files for SPA mode
    'generate:page': (page) => {
      page.html = modifyHtml(page.html)
    },
    // This hook is called before rendering the html to the browser
    'render:route': (url, page, { req, res }) => {
      page.html = modifyHtml(page.html)
    }
  },
  plugins: [
    // ssr: false to only include it on client-side
    { src: '~/plugins/fireit.js' }
  ],
  generate: {
    routes: function () {
      return firebase.firestore().collection('blogposts').get()
      .then((snapShot) =>{
        var all_routes = []
          snapShot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // var post = doc.data()
            all_routes.push('/post/'+ doc.id);
          });
          return all_routes
      })
      /*
      return axios.get('https://my-api/users')
      .then((res) => {
        return res.data.map((user) => {
          return '/users/' + user.id
        })
      })
      */
    }
  },
  modules: ['@nuxtjs/sitemap'],
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'https://wholesaleplaces.firebaseapp.com',
    cacheTime: 1000 * 60 * 15,
    gzip: false,
    generate: true, // Enable me when using nuxt generate
    exclude: [
      '/secret',
      '/admin/**'
    ],
    routes: function () {
      return firebase.firestore().collection('blogposts').get()
      .then((snapShot) =>{
        var all_routes = []
          snapShot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            // var post = doc.data()
            all_routes.push('/post/'+ doc.id);
          });
          return all_routes
      })
	}
  }
}
