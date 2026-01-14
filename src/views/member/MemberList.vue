<script setup lang="ts">
import { inject, ref } from 'vue'
import { RouterLink } from 'vue-router'
import type { SakeItem } from '@/interfaces'
import PrefectureList from '@/components/icons/prefectureList.vue'
import axios from 'axios'

const selectedPrefectures = ref('')
const objectList = inject('objectList', ref<SakeItem[]>([]))

// ローディング状態と完了メッセージ用のフラグ
const loading = ref(false)

const select = async () => {
  if (selectedPrefectures.value == '') {
    alert('都道府県を選択して下さい')
    return
  }
  loading.value = true
  console.log(`選択した都道府県は${selectedPrefectures.value}です`)
  const response = await axios.get(
    'https://m3h-dainobu-sake-containerapp.mangosand-2a3c2987.japaneast.azurecontainerapps.io/api/SELECT',
    { params: { prefecture: selectedPrefectures.value } },
  )
  objectList.value = response.data.List
  console.log(objectList.value)
  loading.value = false
}
</script>

<template>
  <v-app>
    <v-main>
      <section class="background">
        <v-container>
          <section class="sentence">
            <h1>検索メニュー</h1>
            <nav id="breadcrumbs">
              <ul>
                <li>
                  <RouterLink v-bind:to="{ name: 'AppTop' }"> ＴＯＰ </RouterLink>
                </li>
                <li>検索メニュー</li>
              </ul>
            </nav>
          </section>

          <section>
            <section class="sentence">
              <p>【検索条件】</p>

              <v-row class="align-center">
                <v-col cols="6">
                  <PrefectureList v-model="selectedPrefectures" />
                </v-col>

                <v-col cols="1" class="text-right">
                  <v-btn color="info" :loading="loading" :disabled="loading" @click="select">
                    検索
                  </v-btn>
                </v-col>
              </v-row>
            </section>
          </section>

          <section v-if="objectList.length">
            <section class="sentence">
              <h2>検索結果（{{ objectList.length }}件）</h2>
              <ol>
                <li v-for="item in objectList" v-bind:key="item.id">
                  <RouterLink v-bind:to="{ name: 'MemberDetail', params: { id: item.id } }">
                    {{ item.name }}（{{ item.city }}）の詳細
                  </RouterLink>
                </li>
              </ol>
            </section>
          </section>
          <section class="sentence">
            <p>新規登録は<RouterLink v-bind:to="{ name: 'MemberAdd' }">こちら</RouterLink>から</p>
          </section>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<style>
ol {
  padding-left: 30px;
}
</style>
