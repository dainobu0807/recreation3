<!--<template>
  <section>
    <select v-model="modelValue">
      <option disabled value="">都道府県を選択</option>
      <option
        v-for="prefecture in optionPrefectures"
        :key="prefecture.id"
        :value="prefecture.name"
      >
        {{ prefecture.name }}
      </option>
    </select>
  </section>
</template>-->

<template>
  <v-select
    v-model="modelValue"
    :items="optionPrefectures"
    item-title="name"
    item-value="name"
    label="都道府県を選択"
    variant="filled"
    density="comfortable"
    clearable
  />
</template>

<script setup lang="ts">
//親でselectedPrefecturesを使うため
const modelValue = defineModel<string>()

const optionPrefectures = [
  { id: 1, name: '北海道' },
  { id: 2, name: '青森' },
  { id: 3, name: '秋田' },
  { id: 4, name: '岩手' },
  { id: 5, name: '山形' },
  { id: 6, name: '宮城' },
  { id: 7, name: '福島' },

  { id: 8, name: '茨城' },
  { id: 9, name: '栃木' },
  { id: 10, name: '群馬' },
  { id: 11, name: '埼玉' },
  { id: 12, name: '千葉' },
  { id: 13, name: '東京' },
  { id: 14, name: '神奈川' },

  { id: 15, name: '新潟' },
  { id: 16, name: '富山' },
  { id: 17, name: '石川' },
  { id: 18, name: '福井' },
  { id: 19, name: '山梨' },
  { id: 20, name: '長野' },
  { id: 21, name: '岐阜' },
  { id: 22, name: '静岡' },
  { id: 23, name: '愛知' },

  { id: 24, name: '三重' },
  { id: 25, name: '滋賀' },
  { id: 26, name: '京都' },
  { id: 27, name: '大阪' },
  { id: 28, name: '兵庫' },
  { id: 29, name: '奈良' },
  { id: 30, name: '和歌山' },

  { id: 31, name: '鳥取' },
  { id: 32, name: '島根' },
  { id: 33, name: '岡山' },
  { id: 34, name: '広島' },
  { id: 35, name: '山口' },

  { id: 36, name: '徳島' },
  { id: 37, name: '香川' },
  { id: 38, name: '愛媛' },
  { id: 39, name: '高知' },

  { id: 40, name: '福岡' },
  { id: 41, name: '佐賀' },
  { id: 42, name: '長崎' },
  { id: 43, name: '熊本' },
  { id: 44, name: '大分' },
  { id: 45, name: '宮崎' },
  { id: 46, name: '鹿児島' },

  { id: 47, name: '沖縄' },
  { id: 99, name: 'テスト' },
]
</script>
