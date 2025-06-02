import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNewReviewStore = defineStore('newReview', () => {
  const userNameInput = ref('')
  const reviewInput = ref('')
  const optionsInput = ref('default')
  const timein = ref(0)
  const timeout = ref(0)

  function incrementtimein() {
    timein.value++
  }

  function incrementtimeout() {
    timeout.value++
  }

  function updateUserNameInput(newUserName) {
    userNameInput.value = newUserName
  }

  function updateReviewInput(newReview) {
    reviewInput.value = newReview
  }

  function updateOptionsInput(newOptions) {
    optionsInput.value = newOptions
  }

  return {
    userNameInput,
    reviewInput,
    optionsInput,
    timein,
    timeout,
    incrementtimein,
    incrementtimeout,
    updateUserNameInput,
    updateReviewInput,
    updateOptionsInput
  }
})
