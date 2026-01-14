<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <section class="background">
        <v-container>
          <section class="sentence">
            <h1>ＴＯＰ</h1>
            <nav id="breadcrumbs"></nav>
            <section>
              <h2>
                地酒検索は
                <RouterLink v-bind:to="{ name: 'MemberList' }"> こちら </RouterLink>
              </h2>
            </section>
          </section>

          <v-carousel height="420" cycle :interval="4000" pause-on-hover hide-delimiter-background>
            <v-carousel-item src="/1240691.jpg" contain></v-carousel-item>

            <v-carousel-item src="/1698710.jpg" contain></v-carousel-item>

            <v-carousel-item src="/1071775.jpg" contain></v-carousel-item>
          </v-carousel>
        </v-container>
      </section>
    </v-main>
  </v-app>
</template>

<style>
img {
  width: 200px;
  height: auto;
}

header h1 {
  font-family: 'Noto Serif JP';
  font-size: 40px;
  font-weight: 700;
  color: #1a237e;
  text-align: right;
  margin-bottom: 3px;
}

.background {
  background-image: url('/535039.png');
  background-size: cover;
}

.sentence {
  background-color: #f8f9fa;
  margin-bottom: 20px;
  opacity: 0.8;
}
</style>
