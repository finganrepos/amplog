<template>
  <div class="page-container">
    <byline author="Meow Meow Fuzzyface" />
    <amp-img src="/dog.jpg" width="470" height="350" layout="responsive" alt="Woof" />
    <p class="caption">Woooooooooooof</p>
    <p>Go to <a href="/">الرئيسية</a>.</p>
    <p>{{$store.state.todo}} <span class="fas fa-arrow-alt-circle-down fa-2x"></span> </p>
    <!-- 
    <div v-html="$options.filters.amp_it(post.text)"></div>
    -->
    <div v-for='(post) in posts' :key='post.id'>
      <nuxt-link :to="'/post/'+post.id">{{ post.title }}</nuxt-link>
    </div>
  </div>
</template>

<script>
import Byline from '../components/Byline'
import Vue from 'vue'
const firedb = Vue.prototype.$firestore

const axios = require('axios')

export default {
  data() {
    return {
      name: 'بالعربي'
    }
  },
  head: {
    title: 'بالعربي',
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
    let { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/3')
    store.commit('setTodo', data)
  },
  async asyncData (context) {
    const db = context.app.db
    var docRef = db.collection('blogposts') // context.params.id
    return new Promise((resolve, reject) => {
        docRef.get().then(function(snapShot) {
          var all_posts = []
          snapShot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
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
    /*
    var docRef = db.collection('blogposts').doc('TJX0UAGVumWzNZii2UO2') // context.params.id
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
  components: {
    Byline
  }
}
</script>