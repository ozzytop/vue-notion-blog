<template>
    <div class="home">
        <div >
            <div class="post-wrapper" v-for="post in posts" :key="post.id">
                <div class="post-date">
                    {{ post.created_time }} ago
                </div>
                <div class="post-title">
                    <router-link :to="{ name: 'Post', params: { post: post.id } }">{{ post.properties.Name.title[0].text.content }}</router-link>
                </div>
                {{ post.icon }}
                <div class="post-tag-wrapper">
                    <div class="post-tag" 
                        v-for="item in post.properties.Tags.multi_select" 
                        :key="item.id" 
                        :style="{ backgroundColor: item.color}"
                    >
                        <span>
                            {{ item.name }}
                        </span>
                    </div>
                </div>
                <div class="post-content">
                    {{ post.properties.Content.rich_text[0].plain_text }}
                </div>
                <br><br>
            </div>
        </div> 

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
//const { format } = require("date-fns");
import { formatDistanceToNow } from 'date-fns'
import { convertColor, parseRichContent } from '../helpers/index'
import { getDatabaseInformation } from '../services/DatabaseService'

// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'


export default {
    setup() {
        const posts = ref([])
        
        onMounted(() => {
           
            getDatabaseInformation().then(response => {
                console.log(response)
            posts.value = {...response};
                posts.value = response.map(post => {
                    let dateFormated2 = Date.parse(post.created_time)
                    let time = formatDistanceToNow(dateFormated2)
                    post.properties.Tags.multi_select.map(tag => {
                        tag.color = convertColor(tag.color)
                        
                    })
                    return { ...post, created_time: time }
                })
            })
            
        })
        
        return {
            posts
        }
    }
}
</script>


