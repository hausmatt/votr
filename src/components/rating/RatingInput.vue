<template>
    <div>
        <div class="md-layout">
            <RatingStar class="md-layout-item" :star-value="starsVmArray[0]" :is-input="true"
                        @star-clicked="starClicked(0)"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[1]" :is-input="true"
                        @star-clicked="starClicked(1)"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[2]" :is-input="true"
                        @star-clicked="starClicked(2)"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[3]" :is-input="true"
                        @star-clicked="starClicked(3)"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[4]" :is-input="true"
                        @star-clicked="starClicked(4)"/>
        </div>
    </div>
</template>

<script>
    import RatingStar from './RatingStar';

    export default {
        name: "Rating",
        components: {
            RatingStar
        },
        data: function () {
            return {
                userRating: 0
            };
        },
        props: {},
        computed: {
            starsVmArray() {
                let rating = this.userRating;
                let result = [
                    rating < 0 ? 0 : Math.min(1, rating),
                    rating - 1 < 0 ? 0 : Math.min(1, rating - 1),
                    rating - 2 < 0 ? 0 : Math.min(1, rating - 2),
                    rating - 3 < 0 ? 0 : Math.min(1, rating - 3),
                    rating - 4 < 0 ? 0 : Math.min(1, rating - 4)
                ]
                console.log('starsVmArrayCalc Input');
                return result;
            }
        },
        methods: {
            starClicked(index) {
                this.userRating = index + 1;
                this.$emit('add-rating', this.userRating);
            }
        }
    }
</script>

<style scoped>
    .rating-number {
        font-size: large;
        font-weight: bold;
    }
</style>