<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom ">
        <h1 class="h2">
            <span class="material-icons-outlined">{{ icon }}</span>
            {{ text }}
        </h1>
    </div>
</template>

<script>
export default {
    name: "ComponentHeader",
    props: {
        text: String,
        icon: String
    }
}
</script>

<style scoped>
.material-icons-outlined {
    top: 3px;
    position: relative;
}
</style>
