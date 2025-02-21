require('@testing-library/jest-dom')

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  usePathname: () => '/',
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ src, alt, ...props }) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} {...props} />
  },
}))

jest.mock('react-markdown', () => ({
  __esModule: true,
  default: ({ children }) => <div>{children}</div>
}))

jest.mock('rehype-raw', () => ({
  __esModule: true,
  default: () => {}
}))
