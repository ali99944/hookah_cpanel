import { useQueryClient } from '@tanstack/react-query'
import { useGetQuery, useMutationAction } from '../../../core/hooks/queries-actions'
import type { SeoPage } from '../types'


// --- GET ALL SEO PAGES ---
export const useSeoPages = () => {
  return useGetQuery<SeoPage[]>({
    key: ['seo_pages'],
    url: '/seos',
  })
}

// --- GET SINGLE PAGE ---
export const useSeoPage = (key: string | undefined) => {
  return useGetQuery<SeoPage>({
    key: ['seo_pages', key],
    url: `/seos/${key}`,
    options: { enabled: !!key }
  })
}

// --- UPDATE SEO ---
export const useUpdateSeo = (key: string, onSuccess?: () => void) => {
  const queryClient = useQueryClient()

  return useMutationAction({
    method: 'put',
    url: `/seos/${key}`,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({ queryKey: ['seo_pages'] })
      if (onSuccess) onSuccess()
    }
  })
}