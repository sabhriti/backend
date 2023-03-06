<template>
  <AlertBox/>
  <router-link class="btn btn-success mb-2" style="float: right;" to="/setting/preferences/form/id=">Edit Profile
  </router-link>
</template>

<script>
import AlertBox from "@/components/util/AlertBox.vue";

export default {
  name: "UserProfile",
  components: {AlertBox}
}
</script>
