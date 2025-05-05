import { PaginationState, SortingState } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import {
  useNavigate,
  useSearch,
  ValidateFromPath,
} from '@tanstack/react-router'
import { z } from 'zod'
import {
  MRT_DensityState,
  MRT_RowData,
  useMaterialReactTable,
  type MRT_TableOptions,
} from 'material-react-table'

const defaultPageSize = 10
const defaultDensity = 'compact'

export const tableSearchSchema = z.object({
  page: z.number().optional(),
  pageSize: z.number().optional(),
  order: z.string().optional(),
  desc: z.boolean().optional(),
  density: z.enum(['compact', 'spacious', 'comfortable']).optional(),
})

export type TableSearch = z.infer<typeof tableSearchSchema>

export function useMaterialRouterTable<TData extends MRT_RowData>(
  path: ValidateFromPath,
  opts: MRT_TableOptions<TData>
) {
  const {
    initialState,
    onPaginationChange,
    onSortingChange,
    onDensityChange,
    state,
    ...rest
  } = opts
  const search = tableSearchSchema.parse(useSearch({ strict: false }))
  const navigate = useNavigate({ from: path })

  const initialPaginationState: PaginationState = {
    pageIndex: initialState?.pagination?.pageIndex ?? 0,
    pageSize: initialState?.pagination?.pageSize ?? defaultPageSize,
  }

  const initialSortingState: SortingState = initialState?.sorting ?? []

  const initialDensityState: MRT_DensityState =
    initialState?.density ?? defaultDensity

  const searchPaginationState: PaginationState = {
    pageIndex: search.page ? search.page - 1 : 0,
    pageSize: search.pageSize ?? defaultPageSize,
  }

  const searchDensityState: MRT_DensityState =
    search.density ?? initialDensityState

  const searchSortingState: SortingState = search.order
    ? [{ id: search.order, desc: search.desc ?? false }]
    : []

  const [pagination, setPagination] = useState<PaginationState>(
    searchPaginationState
  )
  const [sorting, setSorting] = useState<SortingState>(searchSortingState)
  const [density, setDensity] = useState<MRT_DensityState>(searchDensityState)

  useEffect(() => {
    const singleSorting = sorting[0]
    const order = singleSorting ? singleSorting.id : undefined
    const desc = singleSorting?.desc

    const nextSearch = {
      page:
        pagination.pageIndex === initialPaginationState.pageIndex
          ? undefined
          : pagination.pageIndex + 1,
      pageSize:
        pagination.pageSize === initialPaginationState.pageSize
          ? undefined
          : pagination.pageSize,
      order,
      desc: desc ? true : undefined,
      density: density === initialDensityState ? undefined : density,
    }

    if (
      search.page !== nextSearch.page ||
      search.pageSize !== nextSearch.pageSize ||
      search.order !== nextSearch.order ||
      search.desc !== nextSearch.desc ||
      search.density !== nextSearch.density
    ) {
      navigate({
        replace: true,
        // @ts-ignore
        search: nextSearch,
      })
    }
  }, [navigate, pagination, sorting, density])

  return useMaterialReactTable({
    onPaginationChange: state => {
      setPagination(state)
      onPaginationChange?.(state)
    },
    onSortingChange: state => {
      setSorting(state)
      onSortingChange?.(state)
    },
    onDensityChange: state => {
      setDensity(state)
      onDensityChange?.(state)
    },
    ...rest,
    initialState: {
      ...initialState,
      pagination: initialPaginationState,
      sorting: initialSortingState,
      density: initialDensityState,
    },
    state: {
      ...state,
      pagination,
      sorting,
      density,
    },
  })
}
