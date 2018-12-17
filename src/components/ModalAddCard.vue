<template>
<div>
  <b-button class="btn btn-sm btn-outline-success" @click="showModal"><span aria-hidden="true" class="ei-plus_alt"></span> <span class="d-none d-sm-inline-block">Card</span></b-button>
  <b-modal ref="myModalRef" :id="'myModal'+listId" hide-footer title="Add new card to list">
    <form>
      <p class="notValid" v-if="errors.length">
        <b class="text-center">Oops!! You might want to fix:</b>
        <ul>
          <li v-for="error in errors"><span class="ei ei-error-oct_alt"></span>{{ error }}</li>
        </ul>
      </p>
      <div class="form-group">
        <label>Title</label>
        <input v-model="cardtitled" class="form-control" placeholder="Include a title" />
      </div>
      <div class="form-group">
        <label>Content</label>
        <textarea v-model="cardcontent" class="form-control" placeholder="Add your card content here !" />
      </div>
      <!-- <div class="form-group">
                <b-form-file v-model="file" :state="Boolean(file)" placeholder="Choose a file..."></b-form-file>
                <div class="mt-3">Selected file: {{file && file.name}}</div>
              </div> -->
      <div class="form-group">
        <label>Ref URL</label>
        <input v-model="cardURL" class="form-control" placeholder="Inlcude a reference url" />
      </div>
    </form>
    <div class="modal-footer">
      <button type="button" class="btn btn-light" @click="hideModal" data-dismiss="modal">Close</button>
      <button type="button" class="btn btn-success" data-dismiss="modal" @click="onCreate">Create</button>
    </div>
  </b-modal>
</div>
</template>
<script>
export default {
  name: 'modaladdcard',
  props: ['listId'],
  data() {
    return {
      errors: [],
      cardtitled: "",
      cardcontent: "",
      cardURL: ""
    };
  },

  methods: {
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      this.$refs.myModalRef.hide()
    },
    checkForm: function() {
      this.errors = [];

      if (!this.cardtitled) {
        this.errors.push("\nTitle is missing");
      }
      if (!this.cardcontent) {
        this.errors.push('\nContent is missing');
      }

      if (!this.errors.length) {
        return true;
      }
    },
    /**
     * onCreate - proceed to new card creation
     */
    onCreate() {
      if (!this.checkForm()) {
        return false;
      }

      let newCard = {
        name: this.cardtitled,
        desc: '\n**Initiator:** ' + this.$store.state.member.fullName + '\n\n**Description:** ' + this.cardcontent + '\n\n**Ref URL:** ' + this.cardURL,
        pos: "top",
        due: new Date().setDate(new Date().getDate() + 7),
        idList: this.listId,
        idMembers: this.$store.state.member.id
      };

      Trello.post('/cards/', newCard, this.onSuccessAddCard, this.onErrorAddCard);

    },

    /**
     * onSuccessAddCard - adding card
     * @param  Object added card
     */
    onSuccessAddCard(response) {
      this.$emit('card-created', response)
      this.cardtitled = ""
      this.cardcontent = ""
      //alert('Card created')
    },

    /**
     * onErrorAddCard - an error occured during adding
     * @param  {[type]} error [description]
     * @return {[type]}       [description]
     */
    onErrorAddCard(error) {
      console.error(error)
    }
  }
}
</script>
<style lang="scss">
.notValid {
    padding: 4px;
    color: #dc3545;
    border: 1px solid #dc3545;
    background: #fbeaec;
}
</style>
