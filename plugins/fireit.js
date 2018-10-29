import firebase from '@@/firebase'
import Vue from 'vue'

var marked = require('marked')

Vue.filter('amp_it' , (content)=> {
    // First Convert md to htmls
    content = (content)? marked(content):content;
    // Fix Images
    var img_regex = /<img\s[^>]*?src\s*=\s*['\"]([^'\"]*?)['\"][^>]*?>/g
    content = content.replace(img_regex, function(m){ 
        // '<amp-img layout="fill" class="contain" '
        m = m.replace(/<img/g, '<amp-img layout="fill" class="contain" ')
        var title = m.match(/ title="([^"]*)"/)
        var figcaption = (title && title [1]) ? '<figcaption>'+ title[1] + '</figcaption>' : '';
        var container = '<figure class="outer-image"><div class="fixed-container">'+ m  + '</div>'+ figcaption + '</figure>'
        return container
    })
    return content
})


if (!Vue.prototype.$firestore) {
    Vue.prototype.$firestore = firebase.firestore()
}

export default ({ app }, inject) => {
    // Set the function directly on the context.app object
    app.onFire = (string) => {
        console.log('Okay, another function', string)
    },
    app.db = firebase.firestore()
}