<template>
  <component-header text="Surveys"/>
  <router-view></router-view>
</template>

<script>
import ComponentHeader from "@/components/ComponentHeader";

export default {
  name: "SurveysComponent",
  components: {
    ComponentHeader,

  }
}
</script>
