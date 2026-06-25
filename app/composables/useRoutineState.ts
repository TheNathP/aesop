export const useRoutineState = () => {
  const isRoutineValidated = useState('routine-validated', () => false)
  const routineSelectedProducts = useState<string[]>('routine-products', () => [])

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

  return {
    isRoutineValidated,
    routineSelectedProducts,
    saveRoutine,
    addRoutineProducts,
  }
}
