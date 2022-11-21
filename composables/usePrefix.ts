import { computed } from 'vue'
import { useMainStore } from '~~/store'
export default function () {
  const store = useMainStore()

  const urlPrefix = computed(() => store.currentUrlPrefix)

  return {
    urlPrefix,
  }
}
