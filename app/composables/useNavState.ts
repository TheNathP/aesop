const navHidden = ref(false)

export function useNavState() {
  function setHidden(value: boolean) {
    navHidden.value = value
  }

  return {
    isNavHidden: readonly(navHidden),
    setHidden,
  }
}
