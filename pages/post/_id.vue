<template>
  <div class="page-container">
    <amp-img :alt="post.title" :src="post.cover"  height="200" layout="fixed-height"></amp-img>
    <h1>{{ post.title }}</h1>
    <div v-html="$options.filters.amp_it(post.text)"></div>
  </div>
</template>

<script>
export default {
    data () {
        return {}
    },
    head () { // Make it a function to access asyncData
        return {
            title: this.post.title,
            link: [
            { rel: 'canonical', href: '/post/'+this.post.slug }
            ]
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
