<script setup lang="ts">
const feature = [
  {
    headerText: 'FEATURED',
    headline: "Coming Soon! The World's First Portable Ice Cream Maker",
    tagline:
      'Wireless & Portable | Cooling System | Handy Operation | 2-In-1 Freezer Bowl | Easy to Clean',
    ctaLink: 'SEE CAMPAIGN'
  },
  {
    headerText: 'FEATURED',
    headline: 'Coming Soon! GREAT JOY T2.9 35mm 1.8x Anamorphic Lens',
    tagline:
      'New Budget Anamorphic King, 1.8x Anamorphic Lens Set with Stunning Performance',
    ctaLink: 'SEE CAMPAIGN'
  },
  {
    headerText: 'FEATURED',
    headline: 'GRYPHON 6E',
    tagline: 'MetaSafe Blockchain & WiFi Router',
    ctaLink: 'SEE CAMPAIGN'
  }
]
</script>

<template>
  <n-carousel
    autoplay
    :show-dots="false"
    :show-arrow="true"
    class="h-64 sm:h-full"
  >
    <img class="carousel-img object-fill" src="@/assets/img/carousel_3.jpg" />
    <img class="carousel-img object-fill" src="@/assets/img/carousel_1.jpg" />
    <img class="carousel-img" src="@/assets/img/carousel_2.jpg" />
    <!-- <img class="carousel-img" src="@/assets/img/carousel_4.jpg" /> -->

    <template #arrow="{ total, currentIndex, prev, next }">
      <div
        class="w-full h-full absolute top-0 text-white bg-gray-900 bg-opacity-50 cursor-pointer"
      >
        <div
          class="absolute bottom-4 sm:bottom-20 left-3 sm:left-40 select-none"
        >
          <div class="mb-4 left-40">
            <div>{{ feature[currentIndex].headerText }}</div>
            <div class="mt-4 mb-1 font-bold text-base">
              {{ feature[currentIndex].headline }}
            </div>
            <div class="text-base mb-3 max-w-[400px]">
              {{ feature[currentIndex].tagline }}
            </div>
            <div class="text-base">{{ feature[currentIndex].ctaLink }}</div>
          </div>
          <div class="flex gap-4">
            <i-grommet-icons-form-previous
              class="w-8 h-8 rounded-full border hover:bg-white hover:text-black transition cursor-pointer"
              @click="prev"
            ></i-grommet-icons-form-previous>
            <i-grommet-icons-form-next
              class="w-8 h-8 rounded-full border hover:bg-white hover:text-black transition cursor-pointer"
              @click="next"
            ></i-grommet-icons-form-next>
            <div class="my-auto tracking-widest">
              {{ currentIndex + 1 }}/{{ total }}
            </div>
          </div>
        </div>
      </div>
      <!-- <div
        class="w-full mx-auto bg-[#F5F5F5] md:(absolute top-0 h-468px bg-gray-900 bg-opacity-50) cursor-pointer"
      >
        <n-space
          justify="end"
          vertical
          class="h-full text-dark-900 px-4 py-6 md:(w-screen-md px-0 text-light-50) w-screen-sm mx-auto"
        >
          <div class="underline underline-2 underline-offset-2">精选</div>
          <div class="text-xl">多功能陆地游泳器</div>
          <div class="font-thin">
            随时随地想游泳就游泳🏊‍|可乐、海盐各种口味随心添|可关闭舱门
          </div>
          <div class="hover:(underline underline-offset-2)">去看看</div>
          <n-space class="space-x-2 items-center">
            <div>
              <i-grommet-icons-form-previous
                class="w-8 h-8 align-middle rounded-full border space-x-2 hover:(bg-black text-cool-gray-50) md:hover:(bg-cool-gray-50 text-black)"
                @click="prev"
              />
            </div>
            <div>
              <i-grommet-icons-form-next
                class="w-8 h-8 rounded-full border align-middle hover:(bg-black text-cool-gray-50) md:hover:(bg-cool-gray-50 text-black)"
                @click="next"
              />
            </div>

            <div class="my-auto">{{ currentIndex + 1 }}/{{ total }}</div>
          </n-space>
        </n-space>
      </div> -->
    </template>
  </n-carousel>
</template>

<style>
.carousel-img {
  width: 100%;
  height: 468px;
  object-fit: cover;
}
</style>
