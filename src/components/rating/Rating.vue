<template>
    <div>
        <div class="md-layout">
            <RatingStar class="md-layout-item" :star-value="starsVmArray[0]" :is-input="false"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[1]" :is-input="false"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[2]" :is-input="false"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[3]" :is-input="false"/>
            <RatingStar class="md-layout-item" :star-value="starsVmArray[4]" :is-input="false"/>
        </div>
        <div class="rating-number">{{averageRating}}</div>
    </div>
</template>

<script>
    import RatingStar from './RatingStar';
    import VotingUtil from '../../service/votingUtil';

    export default {
        name: 'Rating',
        components: {
            RatingStar
        },
        data: function () {
            return {};
        },
        props: {
            ratings: Array,
            isInput: Boolean
        },
        computed: {
            starsVmArray() {
                let avg = this.roundedAverage;
                let result = [
                    avg < 0 ? 0 : Math.min(1, avg),
                    avg - 1 < 0 ? 0 : Math.min(1, avg - 1),
                    avg - 2 < 0 ? 0 : Math.min(1, avg - 2),
                    avg - 3 < 0 ? 0 : Math.min(1, avg - 3),
                    avg - 4 < 0 ? 0 : Math.min(1, avg - 4)
                ];
                console.log('starsVmArrayCalc');
                return result;
            },
            averageRating() {
                return VotingUtil.averageRating(this.ratings);
            },
            roundedAverage() {
                let avg = this.averageRating;
                return Math.round(avg * 2) / 2;
            }
        }
    };
</script>

<style scoped>
    .rating-number {
        font-size: large;
        font-weight: bold;
    }
</style>
