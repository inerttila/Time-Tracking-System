<script setup>
import { ref, h } from 'vue'
import { toast } from 'vue3-toastify'

defineProps({
  review: {
    type: Object,
    required: true
  }
})

const votedThumb = ref('')

// Reusable function for displaying confirmation toasts
const showConfirmationToast = (message, onConfirm, onCancel) => {
  const toastId = toast.info(
    h('div', [
      h('p', message),
      h('div', { class: 'flex gap-2 mt-2' }, [
        h(
          'button',
          {
            class: 'px-4 py-2 bg-blue-500 text-white rounded-md',
            onClick: () => {
              onConfirm()
              toast.remove(toastId)
            }
          },
          'Yes'
        ),
        h(
          'button',
          {
            class: 'px-4 py-2 bg-gray-300 text-black rounded-md',
            onClick: () => {
              onCancel()
              toast.remove(toastId)
            }
          },
          'No'
        )
      ])
    ]),
    {
      autoClose: false,
      position: 'top-right',
      closeButton: false,
      hideProgressBar: true,
      style: {
        fontSize: '12px',
        maxWidth: '200px',
        borderRadius: '8px'
      }
    }
  )
}

const updateLikeCount = async (review) => {
  const res = await fetch(`http://localhost:8000/api/reviews/${review.id}/update-time/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      type: 'timein'
    })
  })

  if (!res.ok) {
    toast.error('Something went wrong!')
    return
  }

  toast.success('Thanks for Checking!', {
    style: {
      fontSize: '12px',
      maxWidth: '200px',
      borderRadius: '8px'
    },
    position: 'top-right'
  })
}

const onThumbUp = async (review) => {
  showConfirmationToast(
    'Did you enter in the office?',
    async () => {
      votedThumb.value = 'up'
      review.timein += 1
      await updateLikeCount(review)
    },
    () => {}
  )
}

const onThumbDown = async (review) => {
  showConfirmationToast(
    'Are you living the office?',
    async () => {
      votedThumb.value = 'down'
      review.timeout += 1
      await updateLikeCount(review)
    },
    () => {}
  )
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full h-full rounded-md">
    <div class="flex justify justify-between">
      <div class="flex gap-2">
        <div
          class="w-7 h-7 text-center rounded-full"
          :class="{
            'bg-red-500': review.company === 'company 1',
            'bg-blue-500': review.company === 'company 2',
            'bg-gray-300': review.company !== 'company 1' && review.company !== 'company 2'
          }"
        >
          {{ review.userName.charAt(0) }}
        </div>
        <span>{{ review.userName }}</span>
      </div>
      <div class="flex p-1 gap-1"></div>
    </div>

    <div>{{ review.review }}</div>

    <div class="text-gray-950 text-sm text-center">{{ review.company }}</div>

    <div class="flex justify-between">
      <!-- Enter Icon -->
      <div class="flex cursor-pointer items-center gap-1" @click="() => onThumbUp(review)">
        <span :class="votedThumb === 'up' ? 'text-blue-500 font-bold' : 'text-gray-100'"
          >Enter</span
        >
        {{ review.timein }}
      </div>

      <!-- Exit Text -->
      <div class="flex cursor-pointer items-center gap-1" @click="() => onThumbDown(review)">
        <span :class="votedThumb === 'down' ? 'text-blue-500 font-bold' : 'text-gray-100'"
          >Exit</span
        >
        {{ review.timeout }}
      </div>
    </div>
  </div>
</template>
