<template>
  <div class="relative flex min-h-screen flex-col items-center bg-gray-100 p-8">
    <h1 class="mb-4 text-2xl font-bold">Wheel of Names</h1>
    <textarea
      v-model="nameInput"
      placeholder="Enter names separated by commas"
      class="h-24 w-72 rounded border border-gray-300 p-2"
    ></textarea>
    <button
      @click="handleSpin"
      class="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
    >
      Spin the Wheel
    </button>
    <div class="relative mt-6">
      <canvas ref="canvas" width="500" height="500"></canvas>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[245px]">
        <div
          class="h-0 w-0 border-t-[30px] border-r-[15px] border-l-[15px] border-t-red-600 border-r-transparent border-l-transparent"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const nameInput = ref('')
const canvas = ref(null)
const names = ref([])
let angle = 0
let spinning = false
let ctx

const drawWheel = () => {
  const numSlices = names.value.length
  const sliceAngle = (2 * Math.PI) / numSlices

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (let i = 0; i < numSlices; i++) {
    ctx.beginPath()
    ctx.moveTo(250, 250)
    ctx.fillStyle = `hsl(${(i * 360) / numSlices}, 70%, 60%)`
    ctx.arc(250, 250, 240, i * sliceAngle + angle, (i + 1) * sliceAngle + angle)
    ctx.lineTo(250, 250)
    ctx.fill()

    ctx.save()
    ctx.translate(250, 250)
    ctx.rotate(i * sliceAngle + angle + sliceAngle / 2)
    ctx.fillStyle = '#000'
    ctx.font = '16px sans-serif'
    ctx.fillText(names.value[i], 100, 0)
    ctx.restore()
  }
}

const spinWheel = () => {
  if (spinning || names.value.length === 0) return
  spinning = true

  let rotation = Math.random() * 5 + 5
  let currentAngle = angle
  const targetAngle = currentAngle + rotation * 2 * Math.PI
  const duration = 4000
  const startTime = performance.now()

  const animate = (time) => {
    let elapsed = time - startTime
    let t = Math.min(elapsed / duration, 1)
    angle = currentAngle + (targetAngle - currentAngle) * (1 - Math.pow(1 - t, 3))
    drawWheel()

    if (t < 1) {
      requestAnimationFrame(animate)
    } else {
      spinning = false
      showWinner()
    }
  }

  requestAnimationFrame(animate)
}

const showWinner = () => {
  const numSlices = names.value.length
  const sliceAngle = (2 * Math.PI) / numSlices
  let index = Math.floor(((2 * Math.PI - (angle % (2 * Math.PI))) / sliceAngle) % numSlices)
  alert('Winner: ' + names.value[index])
}

const handleSpin = () => {
  names.value = nameInput.value
    .split(',')
    .map((n) => n.trim())
    .filter((n) => n !== '')
  if (names.value.length) drawWheel()
  spinWheel()
}

onMounted(() => {
  ctx = canvas.value.getContext('2d')
})
</script>

<style scoped>
canvas {
  background: #fff;
  border-radius: 50%;
  display: block;
}
</style>
