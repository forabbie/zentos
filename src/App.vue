<template>
  <div class="app">
    <AppSidebar />
    <main id="app-main " class="flex grow flex-col bg-slate-50">
      <AppHeader />
      <section class="grow p-4">
        <RouterView />
      </section>
      <AppFooter />
    </main>
  </div>
</template>

<script setup>
import AppSidebar from '@/components/layout/AppSidebar.vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
