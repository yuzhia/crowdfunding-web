<script setup lang="ts">
import 'vue-cropper/dist/index.css'
import { VueCropper } from 'vue-cropper'

let option: any = ref({
  img: 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4', //裁剪图片的地址
  outputSize: 1, //裁剪生成图片的质量(可选0.1 - 1)
  outputType: 'jpeg', //裁剪生成图片的格式（jpeg || png || webp）
  info: true, //图片大小信息
  canScale: false, //图片是否允许滚轮缩放
  autoCrop: true, //是否默认生成截图框
  autoCropWidth: 230, //默认生成截图框宽度
  autoCropHeight: 150, //默认生成截图框高度
  fixed: true, //是否开启截图框宽高固定比例
  fixedNumber: [1.53, 1], //截图框的宽高比例
  full: false, //false按原比例裁切图片，不失真
  fixedBox: false, //固定截图框大小，不允许改变
  canMove: false, //上传图片是否可以移动
  canMoveBox: true, //截图框能否拖动
  original: false, //上传图片按照原始比例渲染
  centerBox: false, //截图框是否被限制在图片里面
  height: true, //是否按照设备的dpr 输出等比例图片
  infoTrue: false, //true为展示真实输出图片宽高，false展示看到的截图框宽高
  maxImgSize: 3000, //限制图片最大宽度和高度
  enlarge: 1, //图片根据截图框输出比例倍数
  mode: '100%' //图片默认渲染方式
})

const imgLoad = (msg: any) => {
  console.log('工具初始化函数=====' + msg)
}

const croppers: any = ref(null)
const previews: any = ref(null)
//图片缩放
const changeScale = (num: number) => {
  num = num || 1
  croppers.value.changeScale(num)
}
//向左旋转
const rotateLeft = () => {
  croppers.value.rotateLeft()
}
//向右旋转
const rotateRight = () => {
  croppers.value.rotateRight()
}
//实时预览函数
const realTime = (data: any) => {
  previews.value = data
}
// 修改裁剪框大小
const fixedNumberChange = (
  arr: any,
  obj: { autoCropHeight: ''; autoCropWidth: '' }
) => {
  //option.value.fixedNumber = arr
  option.autoCropWidth = obj.autoCropWidth
  option.autoCropHeight = obj.autoCropHeight
  croppers.value.goAutoCrop()
}
</script>

<template>
  <div class="w-[500px] h-[500px]">
    <VueCropper
      ref="croppers"
      :img="option.img"
      :output-size="option.outputSize"
      :output-type="option.outputType"
      :info="option.info"
      :can-scale="option.canScale"
      :auto-crop="option.autoCrop"
      :auto-crop-width="option.autoCropWidth"
      :auto-crop-height="option.autoCropHeight"
      :fixed="option.fixed"
      :fixed-number="option.fixedNumber"
      :full="option.full"
      :fixed-box="option.fixedBox"
      :can-move="option.canMove"
      :can-move-box="option.canMoveBox"
      :original="option.original"
      :center-box="option.centerBox"
      :height="option.height"
      :info-true="option.infoTrue"
      :max-img-size="option.maxImgSize"
      :enlarge="option.enlarge"
      :mode="option.mode"
      @real-time="realTime"
      @img-load="imgLoad"
    />
  </div>
</template>

<style></style>
