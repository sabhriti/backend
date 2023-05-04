<script setup>

</script>

<template>
    <div class="container-fluid text-start">
        <div class="row">
            <div class="col-3 card bg-transparent rounded-0 me-4 mb-4 framework-container">
                <div class="card-header">
                    <div class="framework-title">
                        <span class="material-icons header-icon">crop_din</span>
                        <span class="h5 ms-2">Framework One</span>
                    </div>
                    <div class="action-buttons">
                        <span class="material-icons-outlined text-success">edit</span>
                        <span class="material-icons-outlined text-danger">delete</span>
                    </div>
                </div>
                <div class="card-body">
                    <div class="mb-3">This is a awesome framework</div>
                    <button class="btn btn-sm btn-outline-success" type="button">
                        Categories <span class="badge text-bg-secondary">4</span>
                    </button>
                </div>
            </div>
            <div class="col-3 card bg-transparent rounded-0 me-4 framework-container">
                <div class="card-header">
                    <div class="framework-title">
                        <span class="material-icons-outlined header-icon">crop_din</span>
                        <span class="h5 ms-2">Framework Two</span>
                    </div>
                    <div class="action-buttons">
                        <span class="material-icons-outlined text-success">edit</span>
                        <span class="material-icons-outlined text-danger">delete</span>
                    </div>
                </div>
                <div class="card-body">
                    <span>This is a awesome framework</span>
                </div>
            </div>
            <div class="col-3 card bg-transparent rounded-0 me-4 framework-container">
                <div class="card-header">
                    <div class="framework-title">
                        <span class="material-icons-outlined header-icon">crop_din</span>
                        <span class="h5 ms-2">Shine Framework</span>
                    </div>
                    <div class="action-buttons">
                        <span class="material-icons-outlined text-success">edit</span>
                        <span class="material-icons-outlined text-danger">delete</span>
                    </div>
                </div>
                <div class="card-body">
                    <span>This is a awesome framework</span>
                </div>
            </div>
        </div>
        <div class="row mt-5">
            <div class="col-3 card bg-transparent rounded-0 me-4 framework-container">
                <div class="card-header">
                    <div class="framework-title">
                        <span class="material-icons-outlined header-icon">crop_din</span>
                        <span class="h5 ms-2">Shine Framework</span>
                    </div>
                    <div class="action-buttons">
                        <span class="material-icons-outlined text-success">edit</span>
                        <span class="material-icons-outlined text-danger">delete</span>
                    </div>
                </div>
                <div class="card-body">
                    <span>This is a awesome framework</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.framework-container {
    border: 1px solid #000306;
    min-height: 150px;
}

.header-icon {
    position: relative;
    top: 5px;
}

.card-header {
    color: #bde1d5;
}

.card-body {
    color: #bde1d5;
}

.framework-title {
    float: left;
}

.action-buttons {
    float: right;
}
</style>