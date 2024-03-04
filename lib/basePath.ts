import nextConfig from '@/next.config.mjs'

export default function basePath(path: string): string {
  return (
    '/' +
    `${nextConfig.basePath ?? ''}/${path}`.split('/').filter(Boolean).join('/')
  )
}
