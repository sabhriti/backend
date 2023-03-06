<template>
  <ComponentHeader text="Users"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "UserComponent",
  components: {
    ComponentHeader
  }
}
</script>
