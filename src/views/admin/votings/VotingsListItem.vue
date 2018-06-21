<template>
    <div>
        <md-list-item @click="$emit('voting-selected', voting)">
            <div class="md-list-item-text">
                <span>{{voting.name}}</span>
                <span>Type: {{voting.type}}</span>
            </div>

            <div>
                <md-button @click="share" class="md-icon-button md-list-action">
                    <md-icon class="md-primary">share</md-icon>
                </md-button>
                <md-button @click="deleteClick" class="md-icon-button md-list-action">
                    <md-icon class="md-primary">delete</md-icon>
                </md-button>
            </div>
        </md-list-item>

        <md-divider/>

        <div>
            <md-dialog :md-active.sync="showShareUrlDialog">
                <md-dialog-title>Voting teilen</md-dialog-title>
                {{votingUrl}}
            </md-dialog>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'VotingsListItem',
        components: {},
        props: {
            voting: Object
        },
        data: function () {
            return {
                showShareUrlDialog: false
            };
        },
        methods: {
            share: function (event) {
                event.stopPropagation();
                this.showShareUrlDialog = true;
            },
            deleteClick: function(event){
                event.stopPropagation();
                this.$emit('remove-voting', this.voting);
            }
        },
        computed: {
            votingUrl() {
                return `/${this.$store.state.login.auth.user.uid}/${this.voting.id}`;
            }
        }
    };
</script>

<style lang="scss" scoped>
    .md-table-cell {
        text-align: left;
        .md-button {
            float: right;
        }
    }
</style>
