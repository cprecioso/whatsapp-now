import { GetStaticPaths, GetStaticProps } from "next"
import { Props } from "."

type Params = { country?: string }

export { default } from "."

export const getStaticPaths: GetStaticPaths<Params> = async () => ({
  paths: [],
  fallback: true,
})

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => ({
  props: {
    defaultCountry: params?.country?.slice(0, 2).toLowerCase() || undefined,
  },
})
