<template>
    <div @click="$emit('star-clicked')">
        <div v-if="starValue === 1">
            <md-icon class="md-size-2x" :class="{'md-icon-orange': isInput}">star</md-icon>
        </div>
        <div v-else-if="starValue === 0.5">
            <md-icon class="md-size-2x" :class="{'md-icon-orange': isInput}">star_half</md-icon>
        </div>
        <div v-else>
            <md-icon class="md-size-2x" :class="{'md-icon-orange': isInput}">star_border</md-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RatingStar",
        props: {
            starValue: Number,
            isInput: Boolean
        }
    }
</script>

<style scoped>
    .md-icon.md-theme-default.md-icon-font.md-icon-orange {
        color: orangered;
    }
</style>