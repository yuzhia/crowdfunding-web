<script setup lang="ts"></script>

<template>
  <div class="flex flex-col w-full h-full px-4 sm:px-8 md:px-20 xl:px-36 my-20">
    <div class="flex flex-col md:flex-row-reverse w-full">
      <div class="md:w-1/4 px-2">
        <div class="flex flex-col">
          <div class="text-center">
            <n-icon size="60">
              <i-mdi-email-arrow-left
                class="text-[#18a058]"
              ></i-mdi-email-arrow-left>
            </n-icon>
          </div>
          <p class="text-center">通过邮件接收活动进展</p>
          <n-input placeholder="你的邮件地址" class="mt-4"></n-input>
          <div class="flex mt-3 space-x-3">
            <n-checkbox></n-checkbox>
            <p>我同意使用条款，并已阅读并理解隐私政策</p>
          </div>
          <n-button type="success" class="w-full mt-2 bg-[#18a058]">
            发送给我
          </n-button>
        </div>
      </div>
      <div class="md:flex grow">
        <div class="flex flex-col grow p-3">
          <div class="mb-3 font-semibold">关于</div>
          <div><a href="">We Do</a></div>
          <div><a href="">联系我们</a></div>
          <div><a href="">品牌历程</a></div>
        </div>
        <div class="flex flex-col grow p-3">
          <div class="mb-3 font-semibold">帮助</div>
          <div><a href="">常见问题</a></div>
          <div><a href="">活动规范</a></div>
          <div><a href="">支持指南</a></div>
          <div><a href="">活动开展指南</a></div>
          <div><a href="">活动开展资质要求</a></div>
        </div>
        <div class="flex flex-col grow p-3">
          <div class="mb-3 font-semibold">条款</div>
          <div><a href="">用户注册协议</a></div>
          <div><a href="">发起者协议</a></div>
          <div><a href="">支持者协议</a></div>
          <div><a href="">隐私政策</a></div>
          <div><a href="">结算及退款流程</a></div>
        </div>
      </div>
    </div>
  </div>
  <div class="text-center py-5 border-t-2">
    Copyright © 2022 WeiChou All Rights Reserved
  </div>
</template>

<style></style>
