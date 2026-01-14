<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import PrefectureList from '@/components/icons/prefectureList.vue'
import type { SakeItem } from '@/interfaces.ts'
import axios from 'axios'

//くるくる＆ポップアップ
const loading = ref(false)
const showPopup = ref(false)

const router = useRouter()
const member: SakeItem = reactive({
  prefecture: '',
  name: '',
  city: '',
  brewery: '',
  url: '',
  introduction: '',
  alcohol: '',
  taste_scale: 0, //v-ratingが数値を返すがdbは文字列なのであとで変換する
  taste_label: '',
  price: '',
})

//アルコール度数スライダの最大・最小値設定
const min = ref(0)
const max = ref(22)

watch(
  () => member.taste_scale,
  (newVal) => {
    if (!newVal) {
      member.taste_label = ''
      return
    }
    if (newVal === 1) member.taste_label = '甘口'
    else if (newVal === 2) member.taste_label = 'やや甘口'
    else if (newVal === 3) member.taste_label = 'やや辛口'
    else if (newVal === 4) member.taste_label = '辛口'
    else if (newVal === 5) member.taste_label = '超辛口'
  },
)

const onAdd = async () => {
  if (member.prefecture == '') {
    alert('必須項目（県名）を入力して下さい')
    return
  }
  if (member.name == '') {
    alert('必須項目（銘柄名）を入力して下さい')
    return
  }

  loading.value = true

  //入力したアルコール度数に「%」を持たせる
  member.alcohol = member.alcohol + '%'

  //入力した金額に「円」を持たせる
  member.price = member.price + '円'

  const param = {
    prefecture: member.prefecture,
    name: member.name,
    city: member.city,
    brewery: member.brewery,
    url: member.url,
    introduction: member.introduction,
    alcohol: member.alcohol,
    taste_scale: String(member.taste_scale),
    taste_label: member.taste_label,
    price: member.price,
  }
  console.log('paramはこれ', param)

  const response = await axios.post(
    'https://m3h-dainobu-sake-containerapp.mangosand-2a3c2987.japaneast.azurecontainerapps.io/api/INSERT',
    param,
  )
  console.log(response.data)
  loading.value = false
  showPopup.value = true

  // 5秒後にポップアップ非表示
  setTimeout(() => {
    showPopup.value = false
    router.push({ name: 'MemberList' })
  }, 5000)
}
</script>

<template>
  <v-app>
    <v-main>
      <section class="background">
        <v-container>
          <section class="sentence">
            <nav id="breadcrumbs">
              <ul>
                <li>
                  <RouterLink v-bind:to="{ name: 'AppTop' }"> ＴＯＰ </RouterLink>
                </li>
                <li>
                  <RouterLink v-bind:to="{ name: 'MemberList' }"> 検索メニュー </RouterLink>
                </li>
                <li>地酒情報追加</li>
              </ul>
            </nav>
          </section>

          <section>
            <section class="sentence">
              <h2>地酒情報追加</h2>
              <p>情報を入力し、登録ボタンをクリックしてください。</p>

              <form v-on:submit.prevent="onAdd">
                <dl>
                  <dt><label for="addPrefecture">●県名（必須）&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <PrefectureList
                        v-model="member.prefecture"
                        id="addPrefecture"
                        name="prefecture"
                      />
                    </dd>
                  </v-col>

                  <dt><label for="addName">●銘柄名（必須）&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-text-field variant="outlined" v-model="member.name"> </v-text-field>
                    </dd>
                  </v-col>

                  <dt><label for="addCity">●市区町村（例.札幌市、港区）&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-text-field variant="outlined" v-model="member.city"> </v-text-field>
                    </dd>
                  </v-col>

                  <dt><label for="addBrewery">●酒造&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-text-field variant="outlined" v-model="member.brewery"> </v-text-field>
                    </dd>
                  </v-col>

                  <dt><label for="addUrl">●ＵＲＬ&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-text-field variant="outlined" v-model="member.url"> </v-text-field>
                    </dd>
                  </v-col>

                  <dt><label for="addIntroduction">●紹介&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-textarea variant="outlined" v-model="member.introduction"> </v-textarea>
                    </dd>
                  </v-col>

                  <dt><label for="addAlcohol">●アルコール度数&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-slider
                        color="blue"
                        thumb-label
                        :max="max"
                        :min="min"
                        step="0.1"
                        v-model="member.alcohol"
                      >
                      </v-slider>
                    </dd>
                  </v-col>

                  <dt>
                    <label for="tasteScale">●辛口度：{{ member.taste_label }}&nbsp;</label>
                  </dt>
                  <v-col cols="5" class="text-left">
                    <dd>
                      <v-rating
                        hover
                        :length="5"
                        :size="54"
                        v-model.number="member.taste_scale"
                        active-color="primary"
                      />
                    </dd>
                  </v-col>

                  <dt><label for="addPrice">●価格（円/720ml）&nbsp;</label></dt>
                  <v-col cols="5" class="text-right">
                    <dd>
                      <v-text-field variant="outlined" v-model="member.price"> </v-text-field>
                    </dd>
                  </v-col>
                </dl>

                <v-col cols="5" class="text-center">
                  <v-btn color="info" :loading="loading" :disabled="loading" @click="onAdd">
                    登録
                  </v-btn>
                </v-col>
              </form>

              <!-- 購入完了メッセージ -->
              <v-alert
                v-if="showPopup"
                type="success"
                class="mt-6 text-center"
                border="start"
                colored-border
                elevation="2"
              >
                地酒情報の追加が完了しました！
              </v-alert>
            </section>
          </section>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>
