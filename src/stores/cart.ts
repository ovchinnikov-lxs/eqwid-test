import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export type ID = string | number

export interface CartItem {
  id: ID
  quantity: number
}

const STORAGE_KEY = 'cart.items'

function readLS(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}
function writeLS(items: CartItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  } catch {}
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(readLS())
  const count = computed(() => items.value.reduce((s, i) => s + i.quantity, 0))

  watch(items, (val) => writeLS(val), { deep: true })

  function hydrate() {
    items.value = readLS()
  }

  function init() {
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) hydrate()
    })
  }

  function add(id: CartItem['id'], qty = 1) {
    const idx = items.value.findIndex((i) => i.id === id)
    if (idx >= 0) items.value[idx].quantity += qty
    else items.value.push({ id, quantity: qty })
  }

  function remove(id: ID) {
    items.value = items.value.filter((i) => String(i.id) !== String(id))
  }

  function setQty(id: ID, qty: number) {
    const it = items.value.find((i) => String(i.id) === String(id))
    if (!it) return
    it.quantity = Math.max(1, Math.floor(qty || 1))
  }

  function dec(id: ID, step = 1) {
    const it = items.value.find((i) => String(i.id) === String(id))
    if (!it) return
    it.quantity = Math.max(0, it.quantity - step)
    if (it.quantity === 0) remove(id)
  }

  function clear() {
    items.value = []
  }

  function countById(id: ID) {
    const it = items.value.find((i) => String(i.id) === String(id))
    return it?.quantity ?? 0
  }

  return { items, count, init, hydrate, add, remove, setQty, dec, clear, countById }
})
