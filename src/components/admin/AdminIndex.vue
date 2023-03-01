<template>
  <HeaderMenu />
  <div class="container-fluid">
    <div class="row">
      <SidebarMenu />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <router-view></router-view>
      </main>
    </div>
  </div>
</template>

<script>
import SidebarMenu from "@/components/home/SidebarMenu";
import HeaderMenu from "@/components/home/HeaderMenu";

export default {
  name: "AdminIndex",
  components: {SidebarMenu, HeaderMenu}
}
</script>

<style scoped>

</style>