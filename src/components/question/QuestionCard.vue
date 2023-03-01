<template>
  <div class="card p-0">
    <div class="card-body card-body-container align-items-start">
      <div v-for="(questionField, index) in addQuestionField" :key="index" class="row m-0">
        <div class="col-3">
          <p class="text-dark">{{ cardTitle }}: </p>
        </div>
        <div class="col-4">
          <input v-model="questionField.question" :name="`addQuestionFiled[${index}][question]`"
                 class="form-control form-control-sm" placeholder="Type a question" type="text">
        </div>

        <div class="col-3">
          <select v-model="questionField.language" :name="`addQuestionFiled[${index}][language]`"
                  aria-label="Language" class="form-select form-select-sm">
            <option v-for="(language, index) in languages " :key="index" :value="language.value">
              {{ language.text }}
            </option>
          </select>
        </div>
        <div class="col-2">
          <a href="javascript:void(0);" @click="addQuestion" class="link-success">
            <span class="material-icons-outlined">add_circle_outline</span>
          </a>
          &nbsp;&nbsp;
          <a href="javascript:void(0);" @click="deleteQuestion(index)" class="link-danger">
            <span class="material-icons-outlined">delete</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "QuestionCard",
  props: {
    cardTitle: {
      type: String,
      default: "Question title"
    }
  },
  data() {
    return {
      addQuestionField: [
        {
          question: '',
          language: '',

        }
      ],
      languages: [
        {
          text: 'Language',
          value: ''
        },
        {
          text: 'English',
          value: 'en'
        },
        {
          text: 'Vietnamese',
          value: 'vi'
        }
      ],

    }
  },

  methods: {
    addQuestion() {
      this.addQuestionField.push({
        question: '',
        language: '',

      })
    },
    deleteQuestion(index) {
      this.addQuestionField.splice(index, 1);
    }
  }

}
</script>

<style scoped>
.card-body {
  padding: 5px 0 5px 0;
}

.row {
  text-align: start;
}
</style>

