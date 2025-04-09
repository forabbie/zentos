<template>
  <div class="flex h-screen">
    <AppSidebar />
    <main class="flex flex-grow flex-col overflow-auto bg-slate-50">
      <AppHeader />
      <section class="flex flex-grow flex-col overflow-auto p-4">
        <div class="flex-grow">
          <RouterView />
        </div>
        <AppFooter />
      </section>
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
