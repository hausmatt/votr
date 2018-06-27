<template>
    <div>
        <md-card v-for="item in votingItems" :key="item.id">
            <md-card-media>
            </md-card-media>

            <md-card-header>
                <div class="md-title">{{item.name}}</div>
                <div class="md-subhead">{{item.description}}</div>
            </md-card-header>

            <RatingInput @add-rating="addRating(item.id, $event)" :ratings="item.ratings"/>

            <md-card-content>
                <md-list class="md-double-line">
                    <md-list-item v-for="comment in item.comments" :key="comment.id">
                        <div class="md-list-item-text">
                            <span>{{comment.text}}</span>
                            <span>{{new Date(comment.timestamp).toLocaleString()}}</span>
                        </div>
                    </md-list-item>
                </md-list>
            </md-card-content>
        </md-card>
    </div>
</template>

<script>
    import RatingInput from './rating/RatingInput';
    import {ADD_RATING} from "../store/actions";

    export default {
        name: 'Voting',
        data: function () {
            return {};
        },
        props: {
            votingItems: Array,
            votingId: String,
        },
        components: {
            RatingInput
        },
        methods: {
            addRating(itemId, rating) {
                this.$store.dispatch(ADD_RATING, {
                    votingId: this.votingId,
                    itemId,
                    rating
                });
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
