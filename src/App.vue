<template>
  <div class="app">
    <aside class="left-sidebar">
      <div class="logo-wrapper">
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
      <!-- <div class="logout-and-profile flex-col-items-center gap-2 p-4">
        <RouterLink to="/#" class="link">
          <i
            class="pi pi-sign-out"
            style="font-size: 1.5rem; font-weight: bold"
            aria-hidden="true"
          ></i>
        </RouterLink>
        <Avatar
          label="V"
          class="avatar mr-2"
          size="large"
          style="background-color: #ece9fc; color: #2a1261"
        />
      </div> -->
    </aside>
    <main class="main grow bg-slate-50">
      <header></header>
    </main>
  </div>
  <!-- <RouterView /> -->
</template>

<script setup>
// import Avatar from 'primevue/avatar'
</script>

<style scoped></style>
