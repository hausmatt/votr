<template>
    <div class="action-bar">
        <slot></slot>
    </div>
</template>

<style scoped lang="scss">
    .action-bar {
        display: inline-block;
        width: 100%;
    }

    .action-bar .right {
        float: right;
    }

    .action-bar .left {
        float: left;
    }
</style>
