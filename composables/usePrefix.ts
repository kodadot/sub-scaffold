import { computed } from 'vue'
import { useMainStore } from '~~/store'
export default function () {
  const store = useMainStore()

  const urlPrefix = computed(() => store.currentUrlPrefix)

  const client = computed(() =>
    urlPrefix.value === 'rmrk' ? 'subsquid' : urlPrefix.value
  )

  const isMoonriver = computed(() => urlPrefix.value === 'movr')

  return {
    urlPrefix,
    client,
    isMoonriver,
  }
}
