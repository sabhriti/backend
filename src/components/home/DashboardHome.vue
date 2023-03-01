<template>
  <HeaderMenu />
  <div class="container-fluid">
    <div class="row">
      <SidebarMenu />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <WelcomeComponent/>
        <div class="row">
          <div class="col-sm-6">
            <router-view></router-view>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>

import SidebarMenu from "@/components/home/SidebarMenu";
import WelcomeComponent from "@/components/home/WelcomeComponent";
import HeaderMenu from "@/components/home/HeaderMenu";

export default {
  name: "DashboardHome",
  components: { WelcomeComponent, SidebarMenu, HeaderMenu},
}
</script>

<style scoped>
</style>

