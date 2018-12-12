<template>
  <article class="page-container">
    <amp-img :alt="post.title" :src="post.cover"  height="200" layout="fixed-height"></amp-img>
    <h1>{{ post.title }}</h1>
    <div v-html="$options.filters.amp_it(post.text)"></div>

    <p v-if="post.innerPost">{{post.innerPost.description}} في 
        <nuxt-link :to="'/post/'+post.innerPost.slug+'/'">{{post.innerPost.title}}</nuxt-link>
    </p>
    <div>
        <h3>صور {{post.title}}</h3>
        <template class="outer-image" v-for="(photo, index) in post.photos" >
            <figure class="outer-image" :key='index' v-if="photo.type == 'footer'">
                <div class="fixed-container">
                    <amp-img layout="fill" class="contain" :src="photo.path"></amp-img>
                </div>
                <figcaption>{{photo.title}} </figcaption>
            </figure>
        </template>
    </div>
    <br/>
    <div v-if="post.video">
        <amp-video controls width="640" height="360" layout="responsive">
            <source :src="post.video" type="video/mp4" />
            <div fallback>
                <p>This browser does not support the video element.</p>
            </div>
        </amp-video>
    </div>
    <br/>
    <div>
        <b> تم النشر في {{post.dateCreated.toDate() | arab_date}} </b>
    </div>
  </article>
</template>

<script>
import { appConfigs } from '~/configs'

export default {
    data () {
        return {}
    },
    head () { // Make it a function to access asyncData
        const structuredData = {
            "@context": "http://schema.org",
            "@type": "BlogPosting",
            "headline": this.post.title,
            "image": {
                "@type": "ImageObject",
                "url": this.post.cover, // Todo Dynamic get width and height
                "width": 600,
                "height": 300
            },
            "datePublished": this.post.dateCreated.toDate(), // Todo Dynamic
            "dateModified": this.post.dateCreated.toDate(),
            // Todo from config
            "author": {
                "@type": "Person",
                "name": "Abdelmomen Bauomy"
            },
            "publisher": {
                "@type": "Organization",
                "name": "wholesaleplaces.online",
                "logo": {
                "@type": "ImageObject",
                "url": appConfigs.site_url+"logo.png",
                "width": 105,
                "height": 59
                }
            }
        }
        // To Test structured-data https://search.google.com/structured-data/testing-tool
        return {
            title: appConfigs.title+ ' - '+ this.post.title,
            meta: [
              { name: 'description', content: this.post.description },
              { name: 'og:title', content: this.post.title },
              { name: 'og:type', content: 'article' },
              { name: 'og:url', content: 'https://wholesaleplaces.online/post/' + this.post.slug +'/'},
              { name: 'og:image', content: this.post.cover },
            ],
            link: [
              { rel: 'canonical', href: appConfigs.site_url +'post' + '/' + this.post.slug +'/'}
            ],
            script: [
              { innerHTML: JSON.stringify(structuredData), type: 'application/ld+json' }
            ],
            __dangerouslyDisableSanitizers: ['script']
        }
    },
    async asyncData (context) {
    const db = context.app.db
    var docRef = db.collection('blogposts').where('slug','==',context.params.id)
    return new Promise((resolve, reject) => {
        docRef.get().then(function(snapShot) {
          if(snapShot.docs[0])
            resolve({post: snapShot.docs[0].data()})
        }).catch(function(error) {
            console.log("Error getting document:", error);
            reject({})
        });

    })
    /*
    var docRef = db.collection('blogposts').doc(context.params.id) // context.params.id
    return new Promise((resolve, reject) => {
        docRef.get().then(function(doc) {
            if (doc.exists) {
                resolve({post: doc.data()})
            } else {
                console.log("No such document!");
                resolve({city: {}})
            }
        }).catch(function(error) {
            console.log("Error getting document:", error);
            reject({})
        });
    })
    */
  },
}
</script>
