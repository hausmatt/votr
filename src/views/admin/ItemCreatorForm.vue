<template>
    <form novalidate class="md-layout" @submit.prevent="validateUser">
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
                <md-field :class="getValidationClass('description')">
                    <label for="description">Description</label>
                    <md-input name="description" id="description"
                              v-model="form.description" :disabled="sending"/>
                    <span class="md-error"
                          v-if="!$v.form.description.required">The description is required</span>
                    <span class="md-error" v-else-if="!$v.form.description.minlength">Invalid descriptione</span>
                </md-field>
            </div>
        </div>

        <div class="md-layout md-gutter">
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
            <md-button type="submit" class="md-primary" :disabled="sending">Create user</md-button>
        </md-dialog-actions>

        <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
    </form>
</template>

<script>
import {validationMixin} from 'vuelidate';
import {minLength, required} from 'vuelidate/lib/validators';

export default {
  name: 'FormValidation',
  mixins: [validationMixin],
  data: () => ({
    form: {
      name: null,
      description: null,
      votingType: 'stars'
    },
    userSaved: false,
    sending: false,
    lastUser: null
  }),
  validations: {
    form: {
      name: {
        required,
        minLength: minLength(3)
      },
      description: {
        required,
        minLength: minLength(3)
      },
      votingType: {
        required
      }
    }
  },
  methods: {
    getValidationClass (fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          'md-invalid': field.$invalid && field.$dirty
        };
      }
    },
    saveUser () {
      this.sending = true;
      // TODO
    },
    validateUser () {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.saveUser();
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
