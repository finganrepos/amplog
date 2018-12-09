<template>
  <div class="page-container">
    <article v-for='(post) in posts' :key='post.id' class="home-article">
      <nuxt-link :to="'/post/'+post.slug+'/'">
      <amp-img :alt="post.title" :src="post.cover" width="600" height="250" layout="responsive"></amp-img>
      <h2>{{ post.title }}</h2>
      </nuxt-link>
      <p> {{post.description}} </p>
    </article>
  </div>
</template>

<script>
import Byline from '../components/Byline'
import Vue from 'vue'
import { appConfigs } from '../configs'

const firedb = Vue.prototype.$firestore

const axios = require('axios')

export default {
  data() {
    return {
    }
  },
  head: {
    title: appConfigs.title,
    link: [
      { rel: 'canonical', href: '/arab' }
    ]
  },
  methods: {
    city_set: function () {
      this.$store.commit('setCity',{name: 'Cairo'})
    }
  },
  async fetch ({ store, params }) {
    /*
    let { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/3')
    store.commit('setTodo', data)
    */
  },
  async asyncData (context) {
    const db = context.app.db
    var docRef = db.collection('blogposts').orderBy('dateCreated', 'desc') // context.params.id
    return new Promise((resolve, reject) => {
        docRef.get().then(function(snapShot) {
          var all_posts = []
          snapShot.forEach(function(doc) {
            var post = doc.data()
            post.id = doc.id
            all_posts.push(post);
          });

          resolve({posts: all_posts})
        }).catch(function(error) {
            console.log("Error getting document:", error);
            reject({})
        });
    })
  },
  components: {
  }
}
</script>