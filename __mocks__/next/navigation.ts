// Mock for next/navigation to prevent import errors during testing

export const usePathname = () => '/'

export const useRouter = () => ({
  push: () => {},
  replace: () => {},
  back: () => {},
  forward: () => {},
})

export const notFound = () => {
  throw new Error('NEXT_NOT_FOUND')
}
