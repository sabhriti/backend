<template>
  <ComponentHeader text="Translations"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "TranslationComponent",
  components: {
    ComponentHeader
  }
}
</script>
