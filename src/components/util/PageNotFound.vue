<template>
  <div class="container-fluid">
    <div class="card bg-transparent m-5">
      <div class="card-body text-light mb-5">
        <p class="oops-icon">(^-^*)</p>
        <h1 class="hoppla mb-5">Hoppla !!! </h1>
        <p class="mb-3 h4">This page does not exists.</p>
        <a class="h5 btn btn-sm btn-outline-info" href="javascript: history.back();">
          <span class="material-icons-outlined me-2">arrow_back</span><span class="h5">take me back</span></a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "PageNotFound"
}
</script>

<style scoped>
.oops-icon {
  padding: 1em;
  font-size: 5rem;
  font-weight: bolder;
}

.material-icons-outlined {
  position: relative;
  top: 0.3rem;
}

</style>