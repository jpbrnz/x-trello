<template>
<div>

  <div v-if="$store.state.loggedIn">

    <div class="board-header">

      <div class="row">
        <div class="col-sm-4 col-12">
          <div class="board-selector">
            <p>
              <select class="form-control" v-model="selected" v-on:change="loadLists(selected.value)">
                    <option :selected="true">-- Select a board --</option>
                    <option v-for="option in $store.state.boards" :value="option" :key="option.id">
                        {{ option.text }}
                    </option>
                    </select>
            </p>
          </div>
        </div>
        <div class="col-sm-8 col-12">
          <div class="board-toggler mt-2">
            <p>
              <toggle-button v-model="showLabels" /> Labels
              <toggle-button v-model="showComments" /> Comments
              <toggle-button v-model="showDue" /> Due dates
              <toggle-button v-model="showDescription" /> Description</p>
          </div>
        </div>
      </div>

    </div>

    <div>
      <hr>
    </div>

    <div id="boardContainer" class="board">
      <b-alert variant="success" dismissible fade :show="showDismissibleAlert" @dismissed="showDismissibleAlert=false">
        Card added to list
      </b-alert>
      <div v-for="list in $store.state.lists" :key="list.name" class="list">
        <b-button-toolbar justify aria-label="Toolbar with button groups">
          <b-btn v-b-toggle="list.id" variant="light" role="button" aria-expanded="false" :aria-controls="list.id">
            <strong>{{ list.name }}</strong> <em>List</em>&nbsp;&mdash;&nbsp;<span class="badge badge-pill badge-dark">Cards {{list['cards'].length}}</span></b-btn>
          <b-button-group class="mx-1">
            <b-button-group class="mx-1">
              <modaladdcard class="col-xs-10" :listId="list.id" v-on:card-created="createdCard(selected.value)"></modaladdcard>
            </b-button-group>
          </b-button-group>
        </b-button-toolbar>
        <b-collapse :id="list.id" class="mt-2">
          <div class="nobo">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12" v-for="card in list['cards']" :key="card.name">
                  <div class="card nobo shadow-box mt-4">
                    <div class="card-body">
                      <div v-if="showLabels" v-for="label in card['labels']" :key="label.name" class="card-labels">
                        <div v-bind:style="{ 'background-color': $store.state.labelColor[label.color], 'color':'#fff' } " class="card-label-object badge badge-pill">
                          {{ label.name }}
                        </div>
                      </div>
                      <h5>{{ card.name }}</h5>
                      <div v-if="showDue">
                        <b-badge v-if="card.due" variant="success">Card Due: {{card.due | formatDueDate}}</b-badge>
                      </div>
                      <hr>
                      <vue-markdown v-if="showDescription">{{ card.desc }}</vue-markdown>
                      <div v-if="showComments">
                        <div v-if="card.comments[0]" class="card-comment-box">
                          <div v-for="comment in card['comments']" :key="comment.data.text" class="card-comment">
                            <b-container fluid>
                              <b-row no-gutters>
                                <b-col class="col-lg-1 col-12">
                                  <div class="pt-3">
                                    <strong>{{ comment.memberCreator.fullName }}</strong> <span aria-hidden="true" class="ei-comment_alt"></span>
                                  </div>
                                </b-col>
                                <b-col class="col-lg-10 col-12">
                                  <div class="card mt-2 bg-light" style="border:none;">
                                    <div class="card-body">
                                      <p>
                                        <vue-markdown>{{ comment.data.text }}</vue-markdown>
                                      </p>
                                      <hr>
                                      <p class="small"><strong><em> Commented on <span aria-hidden="true" class="ei ei-icon_clock_alt"></span> {{ comment.date | formatDate }}</em></strong></p>
                                    </div>
                                  </div>
                                </b-col>
                              </b-row>
                            </b-container>
                          </div>
                        </div>
                      </div>
                      <hr>
                      <small class="float-right mt-2"><a class="card-link" :title="card.shortUrl" v-bind:href="card.shortUrl" target="_blank"><span class="ei-link_alt"></span> View Card on Trello</a></small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </b-collapse>
        <hr>
      </div>
    </div>

  </div>

</div>
</template>

<script>
import Vue from 'vue'
import VueMarkdown from 'vue-markdown'
import moment from 'moment'
import modaladdcard from './ModalAddCard.vue'

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm a')
  }
});

Vue.filter('formatDueDate', function(value) {
  if (value) {
    return moment(String(value)).format('MMM Do, YYYY hh:mm a')
  }
});


import ToggleButton from 'vue-js-toggle-button'
Vue.use(ToggleButton)

export default {
  name: 'Boards',

  components: {
    VueMarkdown,
    modaladdcard
  },

  data: function() {
    return {
      selected: '-- Select a board --',
      anchor: '#',
      showLabels: true,
      showComments: true,
      showDescription: true,
      showDue: true,
      showDismissibleAlert: false
    }

  },

  methods: {
    createdCard: function(boardId) {
      console.log('Dispatching loadLists with id: ' + boardId)
      this.$store.dispatch('loadLists', boardId)
      this.showDismissibleAlert = true
    },

    loadLists: function(boardId) {
      console.log('Dispatching loadLists with id: ' + boardId)
      this.$store.dispatch('loadLists', boardId)
    }

  }
}
</script>
<style lang="scss">
.card.nobo {
    text-align: left;
    border: none;
}
.card-comment {
    .card {
        &:before {
            position: absolute;
            top: 11px;
            left: -16px;
            right: 100%;
            width: 0;
            height: 0;
            display: block;
            content: " ";
            border-color: transparent;
            border-style: solid solid outset;
            pointer-events: none;
            border-right-color: #f8f9fa;
            border-width: 8px;
        }
        &:after {
            border-width: 7px;
            border-right-color: #f7f7f7;
            margin-top: 1px;
            margin-left: 2px;
        }
        @media only screen and (max-width: 991px) {
            &:before {
                position: absolute;
                top: -16px;
                left: 16px;
                right: 100%;
                width: 0;
                height: 0;
                display: block;
                content: " ";
                border-color: transparent;
                border-style: solid solid outset;
                pointer-events: none;
                border-right-color: #f8f9fa;
                border-width: 8px;
                transform: rotate(90deg);
            }
            &:after {
                border-width: 7px;
                border-right-color: #ffffff;
                margin-top: 1px;
                margin-left: 2px;
            }
        }
    }
}
.shadow {
    box-shadow: 0 1px 9px 1px rgba(0,0,0,.15);
    &:hover {
        box-shadow: 0 2px 9px 2px rgba(0,0,0,.15);
    }
}

.shadow-box {
    transition: box-shadow 0.3s ease;
    box-shadow: 0 0 1px rgba(0, 0, 0, .1), 0 2px 6px rgba(0, 0, 0, .03);
    &:hover {
        box-shadow: 0 1px 9px 1px rgba(0,0,0,.15);
    }
}

.shadow-hover {
    transition: box-shadow 0.3s ease;
    box-shadow: 0 2px 9px 2px rgba(0,0,0,.15);
}
</style>
