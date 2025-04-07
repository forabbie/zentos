<template>
  <Toast position="bottom-center" group="bc" @close="onClose">
    <template #message="slotProps">
      <div class="flex flex-auto flex-col items-start">
        <div class="flex items-center gap-2">
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <span class="font-bold">Amy Elsner</span>
        </div>
        <div class="my-4 text-lg font-medium">{{ slotProps.message.summary }}</div>
        <Button size="small" label="Reply" severity="success" @click="onReply()"></Button>
      </div>
    </template>
  </Toast>
</template>

<script setup>
import Toast from 'primevue/toast'

defineProps({
  msg: {
    type: String,
    default: '',
  },
  variant: {
    type: String,
    default: '',
  },
  showAlert: {
    type: Boolean,
    default: false,
  },
})
</script>
