<script setup lang="ts"></script>

<template>
  <div class="flex flex-col items-center gap-4">
    <div class="text-2xl mt-10">首先，找到您感兴趣的项目</div>
    <div>
      微筹是很年轻的平台，让你发现更多生动、有趣、富有想象力技术、产品，让你们所支持的产品能够走进你的生活。
    </div>
    <div>
      <button
        class="border py-2 px-4 rounded hover:text-green-500 hover:border-green-500 transition"
      >
        了解更多
      </button>
    </div>
    <div class="flex flex-wrap sm:flex-row w-full text-center justify-center">
      <router-link
        :to="{ name: 'discover' }"
        class="p-3 w-1/2 sm:w-0 grow hover:bg-gray-100"
      >
        <i-fa-home
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">HOME</div>
      </router-link>
      <router-link
        to=""
        class="p-3 w-1/2 sm:w-0 grow transition duration-300 hover:bg-gray-100"
      >
        <i-bi-phone
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">Phones & Accessories</div>
      </router-link>
      <router-link to="" class="p-3 w-1/2 sm:w-0 grow hover:bg-gray-100">
        <i-fluent-backpack-16-filled
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">Travel & Outdoors</div>
      </router-link>
      <router-link to="" class="p-3 w-1/2 sm:w-0 grow hover:bg-gray-100">
        <i-ic-baseline-sports-cricket
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">Health & Fitness</div>
      </router-link>
      <router-link to="" class="p-3 w-1/2 sm:w-0 grow hover:bg-gray-100">
        <i-mdi-cast-audio
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">AUDIO</div>
      </router-link>
      <router-link to="" class="p-3 w-1/2 sm:w-0 grow hover:bg-gray-100">
        <i-emojione-monotone-film-projector
          class="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block text-[#18a058]"
        />
        <div class="mt-3">FILM</div>
      </router-link>
    </div>
  </div>
</template>

<style></style>
