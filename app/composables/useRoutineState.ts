export const useRoutineState = () => {
  const isRoutineValidated = useState('routine-validated', () => false)
  const routineSelectedProducts = useState<string[]>('routine-products', () => [])
  const hasSecondRoutine = useState('has-second-routine', () => false)

  function saveRoutine(products: string[]) {
    routineSelectedProducts.value = products
    isRoutineValidated.value = true
  }

  function addRoutineProducts(products: string[]) {
    for (const p of products) {
      if (!routineSelectedProducts.value.includes(p)) {
        routineSelectedProducts.value.push(p)
      }
    }
  }

  function completeSecondRoutine() {
    hasSecondRoutine.value = true
  }

  return {
    isRoutineValidated,
    routineSelectedProducts,
    hasSecondRoutine,
    saveRoutine,
    addRoutineProducts,
    completeSecondRoutine,
  }
}
