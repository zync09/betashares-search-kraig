<template>
  <div class="flex items-center gap-2">
    <input
      type="checkbox"
      :id="id"
      :value="value"
      :checked="checked"
      @change="handleChange"
      class="w-4 h-4 text-primary accent-primary border-gray-300 rounded focus:ring-primary"
    />
    <label
      :for="id"
      class="text-sm text-gray-700 cursor-pointer"
    >{{ label }}</label>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['update:modelValue'])

interface CheckboxProps {
  id: string
  value: string
  checked: boolean
  label: string
  modelValue: string[]
}

const props = defineProps<CheckboxProps>()
const model = defineModel<string[]>({ required: true, default: () => [] })

const handleChange = () => {
  if (model.value.includes(props.value)) {
    model.value = model.value.filter((item) => item !== props.value)
  } else {
    model.value.push(props.value)
  }
}
</script>

<style scoped></style>