<template>
  <div>
    <md-card v-for="item in voting.items" :key="item.id">
      <md-card-media>
      </md-card-media>

      <md-card-header>
        <div class="md-title">{{item.title}}</div>
        <div class="md-subhead">{{item.description}}</div>
      </md-card-header>

      <md-card-actions>
        <md-button>Action</md-button>
        <md-button>Action</md-button>
      </md-card-actions>

      <md-card-content>
        <ul v-for="comment in item.comments" :key="comment.id">
          <li>
            {{comment.text}}
          </li>
          <li>
            {{comment.timestamp}}
          </li>
        </ul>
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'Voting',
  props: {
    voting: Object
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
