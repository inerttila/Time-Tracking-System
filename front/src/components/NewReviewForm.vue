<script setup>
import { ref } from 'vue'
import { toast } from 'vue3-toastify'

import { useNewReviewStore } from '../stores/new-review'
import { storeToRefs } from 'pinia'
import { useGeneralsStore } from '../stores/generals'

const newReviewStore = useNewReviewStore()
const generalsStore = useGeneralsStore()
const { showNewReviewForm } = storeToRefs(generalsStore)

const { userNameInput, optionsInput, timein, timeout } = storeToRefs(newReviewStore)
const { updateUserNameInput, updateReviewInput, updateOptionsInput } = newReviewStore

const noOptionsSelectedMsg = ref('')

defineProps({
  review: {
    type: Object,
    required: true
  },
  refetchReviews: {
    type: Function,
    required: true
  }
})

const handleSubmit = async (e, refetch) => {
  e.preventDefault()

  // if no options selected, return
  if (optionsInput.value === 'default') {
    noOptionsSelectedMsg.value = 'Please select an option'
    return
  }

  try {
    const dataObj = {
      userName: userNameInput.value || 'Anonymous',
      timein: new Date(timein.value).toISOString(),
      timeout: new Date(timeout.value).toISOString(),
      company: optionsInput.value
    }

    const res = await fetch('http://localhost:8000/api/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataObj)
    })

    if (!res.ok) {
      const errorData = await res.json()
      if (res.status === 400 && errorData.userName) {
        // Backend returned a validation error for userName
        toast.error(`Error: ${errorData.userName[0]}`, {
          style: {
            fontSize: '12px',
            maxWidth: '200px',
            borderRadius: '8px'
          },
          position: 'top-right'
        })
        return
      }
      throw new Error('There was an error adding this review')
    }

    // clear inputs
    updateUserNameInput('')
    updateReviewInput('')
    updateOptionsInput('default')

    // show toast
    toast.success('Review added successfully', {
      style: {
        fontSize: '12px',
        maxWidth: '200px',
        borderRadius: '8px'
      },
      position: 'top-right'
    })

    // refetch reviews
    refetch()

    // hide form
    showNewReviewForm.value = false
  } catch (error) {
    console.log('error', error)
    toast.error('An unexpected error occurred', {
      style: {
        fontSize: '12px',
        maxWidth: '200px',
        borderRadius: '8px'
      },
      position: 'top-right'
    })
  }
}
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 lg:px-8">
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit="handleSubmit($event, refetchReviews)">
        <div>
          <label for="username" class="block text-sm font-medium leading-6">Staff Name</label>
          <div class="mt-2">
            <input
              id="username"
              name="username"
              type="text"
              autocomplete="username"
              placeholder="Staff Name"
              class="block text-black w-full ps-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="userNameInput"
            />
          </div>
        </div>

        <div>
          <label for="options" class="block text-sm font-medium leading-6">Company</label>
          <div class="mt-2">
            <select
              id="options"
              name="options"
              autocomplete="options"
              required
              class="block text-black w-full ps-2 rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="optionsInput"
            >
              <option value="default" disabled>Select the Company</option>
              <option value="company 1">Company 1</option>
              <option value="company 2">Company 2</option>
            </select>
            {{ noOptionsSelectedMsg }}
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
