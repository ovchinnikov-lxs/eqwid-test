export type ID = string | number

export interface EcwidCategory {
  id: number
  name: string
  imageUrl?: string
  parentId?: number
  enabled: boolean
}

export interface EcwidProduct {
  id: number
  name: string
  price?: number
  defaultDisplayedPrice?: number
  defaultDisplayedPriceFormatted: string
  imageUrl?: string
  url?: string
  description?: string
}

type ListResponse<T> = {
  total?: number
  count?: number
  offset?: number
  limit?: number
  items: T[]
}

function qs(params?: Record<string, unknown>) {
  const sp = new URLSearchParams()
  if (!params) return ''
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null) return
    sp.append(k, String(v))
  })
  const s = sp.toString()
  return s ? `?${s}` : ''
}

async function http<T>(url: string, signal?: AbortSignal): Promise<T> {
  const storeId = import.meta.env.VITE_ECWID_STORE_ID as string
  const token = import.meta.env.VITE_ECWID_PUBLIC_TOKEN as string
  const base = `https://app.ecwid.com/api/v3/${storeId}`

  const res = await fetch(base + url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    signal,
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`API ${res.status} ${res.statusText} :: ${text}`)
  }

  return (await res.json()) as Promise<T>
}

export function useApi() {
  function getCategories(opts?: { parent?: number; withSubcategories?: boolean }) {
    return http<ListResponse<EcwidCategory>>(`/categories${qs(opts)}`)
  }

  function getCategoryById(id: ID) {
    return http<EcwidCategory>(`/categories/${id}`)
  }

  function getProducts(opts?: { category?: number | string; productId?: string }) {
    return http<ListResponse<EcwidProduct>>(
      `/products${qs({
        category: opts?.category,
        productId: opts?.productId,
      })}`,
    )
  }

  function getProductById(id: ID) {
    return http<EcwidProduct>(`/products/${id}`)
  }

  return {
    getCategories,
    getCategoryById,
    getProducts,
    getProductById,
  }
}
