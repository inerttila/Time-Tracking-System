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

const sendThumbsUpdate = async (review, type) => {
  const res = await fetch(
    `http://192.168.40.14:8000/api/reviews/${review.id}/update_thumbs_timestamp/`,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        [type]: true // Sends either "thumbsUp": true or "thumbsDown": true
      })
    }
  )

  if (!res.ok) {
    toast.error('Something went wrong!')
    return
  }

  toast.success('Thanks for your feedback!', {
    style: {
      fontSize: '12px',
      maxWidth: '200px',
      borderRadius: '8px'
    },
    position: 'top-right'
  })
}

const onThumbUp = async (review) => {
  const toastId = toast.info(
    h('div', [
      h('p', 'Are you sure you got this product?'),
      h('div', { class: 'flex gap-2 mt-2' }, [
        h(
          'button',
          {
            class: 'px-4 py-2 bg-blue-500 text-white rounded-md',
            onClick: () => handleThumb(review, 'thumbsUp', toastId)
          },
          'Yes'
        ),
        h(
          'button',
          {
            class: 'px-4 py-2 bg-gray-300 text-black rounded-md',
            onClick: () => handleCancel(toastId)
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

const onThumbDown = async (review) => {
  const toastId = toast.info(
    h('div', [
      h('p', 'Are you sure you sold this product?'),
      h('div', { class: 'flex gap-2 mt-2' }, [
        h(
          'button',
          {
            class: 'px-4 py-2 bg-blue-500 text-white rounded-md',
            onClick: () => handleThumb(review, 'thumbsDown', toastId)
          },
          'Yes'
        ),
        h(
          'button',
          {
            class: 'px-4 py-2 bg-gray-300 text-black rounded-md',
            onClick: () => handleCancel(toastId)
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

const handleThumb = async (review, type, toastId) => {
  votedThumb.value = type === 'thumbsUp' ? 'up' : 'down'
  await sendThumbsUpdate(review, type)
  toast.remove(toastId)
}

const handleCancel = (toastId) => {
  toast.remove(toastId)
}
</script>

<template>
  <div class="flex flex-col gap-4 p-4 w-full h-full rounded-md">
    <div class="flex justify justify-between">
      <div class="flex gap-2">
        <div
          class="w-7 h-7 text-center rounded-full"
          :class="{
            'bg-red-500': review.shop === 'skaitech',
            'bg-blue-500': review.shop === '3dskai'
          }"
        >
          {{ review.userName.charAt(0) }}
        </div>
        <span>{{ review.userName }}</span>
      </div>
      <div class="flex p-1 gap-1"></div>
    </div>

    <div>{{ review.review }}</div>
    <div class="text-gray-950 text-sm">{{ review.shop }}</div>

    <div class="flex justify-between">
      <div class="flex gap-2">
        <div
          class="flex cursor-pointer px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          @click="() => onThumbUp(review)"
        >
          Enter
        </div>

        <div
          class="flex cursor-pointer px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          @click="() => onThumbDown(review)"
        >
          Leave
        </div>
      </div>
    </div>
  </div>
</template>
