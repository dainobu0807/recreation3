<script setup lang="ts">
import { inject, computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { SakeItem } from '@/interfaces'

interface Props {
  id: string
}
const props = defineProps<Props>()

const objectList = inject('objectList', ref<SakeItem[]>([]))

const item = computed(() => {
  return objectList.value.find((x) => x.id === props.id) ?? null
})
</script>

<template>
  <section class="background">
    <div class="container">
      <section class="sentence">
        <h1>地酒詳細情報</h1>
        <nav id="breadcrumbs">
          <ul>
            <li>
              <RouterLink v-bind:to="{ name: 'AppTop' }"> ＴＯＰ </RouterLink>
            </li>
            <li>
              <RouterLink v-bind:to="{ name: 'MemberList' }"> 検索メニュー </RouterLink>
            </li>
            <li>地酒詳細情報</li>
          </ul>
        </nav>
      </section>

      <section>
        <section class="sentence">
          <dl v-if="item">
            <dt>●酒造</dt>
            <dd>{{ item.brewery }}</dd>

            <dt>●ＵＲＬ</dt>
            <dd>{{ item.url }}</dd>

            <dt>●紹介</dt>
            <dd>{{ item.introduction }}</dd>

            <dt>●アルコール度数</dt>
            <dd>{{ item.alcohol }}</dd>

            <dt>●辛口度(1~5)</dt>
            <dd>{{ item.tasteScale }}（{{ item.tasteLabel }}）</dd>

            <dt>●価格（円/720ml）</dt>
            <dd>{{ item.price }}</dd>
          </dl>
        </section>
      </section>
      <img src="\tokkuri_transparent.png" />
    </div>
  </section>
</template>

<style>
.background {
  background-image: url('/535039.png');
  background-size: cover;
}
</style>
