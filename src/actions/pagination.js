export const PAGE_NEXT = 'PAGE_NEXT'
export const PAGE_PREV = 'PAGE_PREV'
export const PAGE_CHANGE = 'PAGE_CHANGE'
export const PAGE_RESET = 'PAGE_RESET'

export const PAGINATION_STATE_KEY = 'pagination'

export const PER_PAGE = 30;


// user actions

export const resetPagination = (itemCount) => ({
  type: PAGE_RESET,
  itemCount
})

export const goNextPage = () => ({
  type: PAGE_NEXT
})

export const goPrevPage = () => ({
  type: PAGE_PREV
})
