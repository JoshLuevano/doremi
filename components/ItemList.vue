<template>
  <v-container>
    <h4 v-if="title !== ''">
      {{ title }}
    </h4>
    <hooper style="height: auto;" :items-to-show="1.1">
      <slide v-for="(e, i) in splitItems" :key="i">
        <song-list :items="e" />
      </slide>
    </hooper>
  </v-container>
</template>

<script>
import { Hooper, Slide } from 'hooper'
import SongList from '~/components/SongList.vue'
import 'hooper/dist/hooper.css'

export default {
  components: {
    Hooper,
    Slide,
    SongList
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    listSize: {
      type: Number,
      default: 3
    }
  },
  computed: {
    splitItems () {
      const result = this.items.reduce((resultArray, item, index) => {
        const chunkIndex = Math.floor(index / this.listSize)

        if (!resultArray[chunkIndex]) {
          resultArray[chunkIndex] = []
        }

        resultArray[chunkIndex].push(item)

        return resultArray
      }, [])
      return result
    }
  }
}
</script>

<style>
.hooper-track {
  padding-left: 0 !important;
}
</style>
