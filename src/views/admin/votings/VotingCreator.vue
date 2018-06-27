<template>
    <div>
        <md-button class="md-raised md-primary" v-on:click="showDialog=true">Add</md-button>
        <md-dialog :md-active.sync=showDialog>
            <md-dialog-title>New Voting</md-dialog-title>
            <md-dialog-content>

                <form novalidate class="md-layout" @submit.prevent="validateVoting">
                    <div class="md-layout md-gutter">

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('name')">
                                <label for="name">Name</label>
                                <md-input name="name" id="name" v-model="form.name" :disabled="sending"/>
                                <span class="md-error"
                                      v-if="!$v.form.name.required">The name is required</span>
                                <span class="md-error"
                                      v-else-if="!$v.form.name.minlength">Invalid name</span>
                            </md-field>
                        </div>

                        <div class="md-layout-item md-small-size-100">
                            <md-field :class="getValidationClass('votingType')">
                                <label for="voting-type">Type</label>
                                <md-select name="votingType" id="voting-type" v-model="form.votingType" md-dense
                                           :disabled="sending">
                                    <md-option value="starts">Stars</md-option>
                                    <md-option value="oneToTen">One to ten</md-option>
                                </md-select>
                                <span class="md-error">The voting type is required</span>
                            </md-field>
                        </div>

                    </div>

                    <md-progress-bar md-mode="indeterminate" v-if="sending"/>

                    <md-dialog-actions>
                        <md-button type="submit" class="md-primary" :disabled="sending">Create voting</md-button>
                    </md-dialog-actions>
                </form>
            </md-dialog-content>

        </md-dialog>

        <md-snackbar :md-active.sync="votingSaved">The voting {{ form.name }} was saved with success!
        </md-snackbar>
    </div>
</template>

<script>
    import {validationMixin} from 'vuelidate';
    import {minLength, required} from 'vuelidate/lib/validators';
    import {ADD_VOTING} from '../../../store/actions';

    export default {
        name: 'VotingCreator',
        mixins: [validationMixin],
        data: () => ({
            showDialog: false,
            votingSaved: false,
            form: {
                name: null,
                votingType: 'stars'
            }
        }),
        computed: {
            sending: function () {
                return this.$store.state.voting.apiCalls.addVoting.loading;
            }
        },
        watch: {
            sending: function (newValue, oldValue) {
                if (!newValue && oldValue && this.$store.state.voting.apiCalls.addVoting.success) {
                    this.votingSaved = true;
                    this.showDialog = false;
                }
            }
        },
        validations: {
            form: {
                name: {
                    required,
                    minLength: minLength(3)
                },
                votingType: {
                    required
                }
            }
        },
        methods: {
            getValidationClass(fieldName) {
                const field = this.$v.form[fieldName];

                if (field) {
                    return {
                        'md-invalid': field.$invalid && field.$dirty
                    };
                }
            },
            saveVoting() {
                let newVoting = {
                    name: this.form.name,
                    type: this.form.votingType
                };
                this.$store.dispatch(ADD_VOTING, newVoting);
            },
            validateVoting() {
                this.$v.$touch();

                if (!this.$v.$invalid) {
                    this.saveVoting();
                }
            }
        }
    };
</script>

<style lang="scss" scoped>
    .md-progress-bar {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
    }
</style>
