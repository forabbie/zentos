<template>
  <div class="app">
    <aside class="left-sidebar">
      <div class="logo-wrapper w-full;">
        <div class="logo-container">
          <img src="/logo.svg" alt="Company Logo" class="logo" height="40" width="40" />
        </div>
        <hr class="text-slate-300" />
      </div>
      <nav class="nav basis-full p-2.5">
        <ul class="nav-menu w-full">
          <li class="nav-item">
            <RouterLink to="/#" class="link group">
              <div
                class="flex-justify-items-center group-hover:bg-avocado/25 w-full rounded-xl px-2.5 py-4"
              >
                <i
                  class="pi pi-chart-bar group-hover:scale-[1.16]"
                  style="font-size: 1.25rem"
                  aria-hidden="true"
                ></i>
              </div>
              <span class="small font-semibold">Dashboard</span>
            </RouterLink>
          </li>
        </ul>
      </nav>
    </aside>
    <main class="app-main flex grow flex-col bg-slate-50">
      <header class="h-fit w-full">
        <div class="px-4 py-2.5">
          <div
            class="flex h-[40px] items-center justify-between gap-2 rounded-lg bg-[url(/images/header-bg.svg)] bg-cover bg-left-top bg-no-repeat px-4 py-2"
          >
            <div class="page-title flex items-center gap-2">
              <i class="pi pi-chart-bar text-white" style="font-size: 1rem" aria-hidden="true"></i>
              <h1 class="text-base font-bold text-white">Dashboard</h1>
            </div>
          </div>
        </div>
        <hr class="text-slate-300" />
      </header>
      <section class="grow"></section>
    </main>
  </div>
  <!-- <RouterView /> -->
</template>

<script setup></script>

<style scoped></style>
