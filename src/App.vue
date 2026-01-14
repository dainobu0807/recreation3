<script setup lang = "ts">
import {provide, ref} from "vue";
import {RouterView} from "vue-router";
import type {SakeItem} from "@/interfaces";

const objectList = ref<SakeItem[]>([]);
provide('objectList', objectList);
</script>

<template>
  <header>
    <h1>地酒検索JAPAN</h1>
  </header>
  <main>
    <RouterView/>
  </main>
</template>

<style>

header {
  display: inline-block;
  background-color: white;
}

#breadcrumbs ul li {
display: inline;
list-style-type: none;
}
#breadcrumbs {
  margin-left: 0px;
}
#breadcrumbs ul {
  padding-left: 0px;
}
#breadcrumbs ul .current {
  color: red;
}
#breadcrumbs ul li:before {
  content: " ＞ ";
}
#breadcrumbs ul li:first-child:before {
  content: none;
}
</style>