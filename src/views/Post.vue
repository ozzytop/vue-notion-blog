<template>
    <div class="single-post">
        <h1>{{ title }}</h1>
        
        <div class="single-post-content">
            <span class="post" v-for="(item, key) in content" v-html="item" :key="key">
                
            </span>
        </div>

    </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { getSingleDatabase } from '../services/DatabaseService'
import { useRouter } from "vue-router";
import { parseRichContent } from '../helpers/index'
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'


export default {
    setup() {
        const post = ref()
        const title = ref()
        const content = ref()
        
        
        onMounted(() => {
           
            getSingleDatabase(useRouter().currentRoute.value.params.post).then(response => {
                title.value = response.properties.Name.title[0].plain_text;
                post.value = response
                content.value = parseRichContent(response.properties.Content.rich_text)
            })
            
        })
        
        return {
            post,
            title,
            content
        }
    }
}
</script>


