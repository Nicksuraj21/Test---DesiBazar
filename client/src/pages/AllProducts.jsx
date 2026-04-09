




import React, { useMemo, useState } from 'react'
import { useAppContext } from '../context/AppContext'
import { categories } from '../assets/assets'
import ProductCard from '../components/ProductCard'

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
]

function compareInSection(a, b, sortBy, orderIndex) {
    switch (sortBy) {
        case 'price-asc':
            return (a.offerPrice ?? 0) - (b.offerPrice ?? 0)
        case 'price-desc':
            return (b.offerPrice ?? 0) - (a.offerPrice ?? 0)
        default:
            return (orderIndex.get(a._id) ?? 0) - (orderIndex.get(b._id) ?? 0)
    }
}

const AllProducts = () => {

    const { products, searchQuery } = useAppContext()
    const [sortBy, setSortBy] = useState('default')

    const query = typeof searchQuery === 'string' ? searchQuery.trim() : ''

    const defaultOrderIndex = useMemo(() => {
        const m = new Map()
        products.forEach((p, i) => m.set(p._id, i))
        return m
    }, [products])

    const sections = useMemo(() => {
        const filtered = !query
            ? [...products]
            : products.filter((product) =>
                product.name.toLowerCase().includes(query.toLowerCase())
            )

        const map = new Map()
        for (const p of filtered) {
            const raw = (p.category || 'Other').toString().trim() || 'Other'
            const norm = raw.toLowerCase()
            if (!map.has(norm)) {
                map.set(norm, { label: raw, products: [] })
            }
            map.get(norm).products.push(p)
        }

        for (const { products: list } of map.values()) {
            list.sort((a, b) => compareInSection(a, b, sortBy, defaultOrderIndex))
        }

        const categoryPathOrder = categories.map((c) => c.path.toLowerCase())
        const used = new Set()
        const ordered = []

        for (const pathLower of categoryPathOrder) {
            if (!map.has(pathLower)) continue
            const { label, products: list } = map.get(pathLower)
            const meta = categories.find((c) => c.path.toLowerCase() === pathLower)
            ordered.push({
                key: pathLower,
                title: meta ? meta.text : label,
                products: list,
            })
            used.add(pathLower)
        }

        for (const [pathLower, { label, products: list }] of map) {
            if (used.has(pathLower)) continue
            ordered.push({
                key: pathLower,
                title: label,
                products: list,
            })
        }

        return ordered
    }, [products, query, sortBy, defaultOrderIndex])

    const totalFiltered = useMemo(
        () => sections.reduce((sum, s) => sum + s.products.length, 0),
        [sections]
    )

  return (
    <div className='mt-16 flex flex-col'>
      <div className='flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full'>
        <div className='flex flex-col items-end w-max'>
          <p className='text-2xl font-medium uppercase'>All products</p>
          <div className='w-16 h-0.5 bg-primary rounded-full'></div>
        </div>

        <div className='flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto'>
          <p className='text-sm text-gray-600 order-2 sm:order-1'>
            {totalFiltered} {totalFiltered === 1 ? 'product' : 'products'}
            {query ? ` for "${query}"` : ''}
          </p>
          <label className='flex items-center gap-2 order-1 sm:order-2'>
            <span className='text-[11px] text-gray-400 uppercase tracking-wider font-medium whitespace-nowrap'>
              Sort
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='h-8 min-w-[148px] text-sm text-gray-700 border border-gray-200 rounded-md px-2.5 py-0 bg-white outline-none transition hover:border-gray-300 focus:border-gray-300 focus:ring-1 focus:ring-gray-200'
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

        {totalFiltered === 0 ? (
          <div className='flex items-center justify-center min-h-[40vh] mt-8'>
            <p className='text-lg text-center text-gray-600'>
              {query
                ? 'No products match your search.'
                : 'No products yet.'}
            </p>
          </div>
        ) : (
            <div className='flex flex-col gap-10 mt-8'>
              {sections.map((sec) => (
                <section
                  key={sec.key}
                  className='scroll-mt-24'
                  aria-labelledby={`section-${sec.key}`}
                >
                  <div className='border-b border-gray-200 pb-3'>
                    <h2
                      id={`section-${sec.key}`}
                      className='text-xl sm:text-2xl font-semibold text-gray-900 tracking-tight'
                    >
                      {sec.title}
                    </h2>
                    <p className='text-sm text-gray-500 mt-1'>
                      {sec.products.length}{' '}
                      {sec.products.length === 1 ? 'product' : 'products'} in this section
                    </p>
                  </div>

                  <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-5'>
                    {sec.products.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
        )}
    </div>
  )
}

export default AllProducts
