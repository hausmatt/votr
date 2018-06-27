<template>
    <div>
        <md-card v-for="item in sortedItems" :key="item.id">
            <md-card-header>
                <div class="md-title">{{item.name}}</div>
                <div class="md-subhead">{{item.description}}</div>
            </md-card-header>

            <Rating :ratings="item.ratings"/>

            <md-card-content>
                <span>number of Votes: {{getVotingsCount(item)}}</span>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import Rating from '../../components/rating/Rating';
    import VotingUtil from '../../service/votingUtil';

    export default {
        name: 'Voting',
        data: function () {
            return {};
        },
        props: {
            votingItems: Array
        },
        components: {
            Rating
        },
        computed: {
            sortedItems() {
                let result = [...this.votingItems];
                result.sort((a, b) => {
                    if (!a.ratings || !a.ratings.length) {
                        return 1;
                    }
                    if (!b.ratings || !b.ratings.length) {
                        return -1;
                    }
                    return VotingUtil.averageRating(b.ratings) - VotingUtil.averageRating(a.ratings);
                });
                return result;
            }
        },
        methods: {
            getVotingsCount(item) {
                return (item.ratings) ? item.ratings.length : 0;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
    .md-card {
        width: 320px;
        margin: 4px;
        display: inline-block;
        vertical-align: top;
    }

    .md-card-example {
        .md-subhead {
            .md-icon {
                $size: 16px;

                width: $size;
                min-width: $size;
                height: $size;
                font-size: $size !important;
            }

            span {
                vertical-align: middle;
            }
        }

        .card-reservation {
            margin-top: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            .md-icon {
                margin: 8px;
            }
        }

        .md-button-group {
            display: flex;

            .md-button {
                min-width: 60px;
                border-radius: 2px;
            }
        }
    }
</style>
