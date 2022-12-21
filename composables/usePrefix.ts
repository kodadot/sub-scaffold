import { computed } from 'vue'
export default function () {
  const store = useMainStore()

  const urlPrefix = computed(() => store.currentUrlPrefix)

  return {
    urlPrefix,
  }
}
