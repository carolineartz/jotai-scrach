import axios from 'axios'
import { uniqBy, words } from 'lodash'
import { Account, ProductReview, Product, Person } from './data'
import { AsyncReturnType } from 'type-fest'

/* -------------------------------------------------------------------------- */
/*                                   Account                                  */
/* -------------------------------------------------------------------------- */

export type GetAccountsResponse = AsyncReturnType<typeof getAccounts>
export type GetAccountsResponseAccounts = GetAccountsResponse['accounts']
export type GetAccountsResponsePeopleIds = GetAccountsResponse['meta']['people_ids']

export const getAccounts = async () => {
  const { data } = await axios.get<Account[]>(`https://example-data.draftbit.com/orgs?_embed=people`)

  const accounts = data.map(mapAccount)
  const peopleIds = uniqBy(
    accounts.flatMap(account => account.people),
    'id'
  ).map(person => person.id)

  return {
    accounts,
    meta: {
      people_ids: peopleIds
    }
  }
}

export const getAccount = async (id: number | string) => {
  const { data } = await axios.get<Account>(`https://example-data.draftbit.com/orgs/${id}`)
  return mapAccount(data)
}

const mapAccount = (account: Account & { employees?: any }): Account => {
  const { employees, ...accountData } = account
  return {
    ...accountData,
    slug: words(account.name).join('-').toLowerCase()
  }
}

/* -------------------------------------------------------------------------- */
/*                                   People                                   */
/* -------------------------------------------------------------------------- */

export const getPeople = async (orgId: number) => {
  const { data } = await axios.get<Person[]>(`https://example-data.draftbit.com/orgs/${orgId}/people`)
  return data
}

export const getPerson = async (id: number) => {
  const { data } = await axios.get<Person>(`https://example-data.draftbit.com/people/${id}`)
  return data
}

/* -------------------------------------------------------------------------- */
/*                                  Products                                  */
/* -------------------------------------------------------------------------- */

export const getProducts = async () => {
  const { data } = await axios.get<Product[]>(`https://example-data.draftbit.com/products?_expand=product_reviews`)
  return data
}

export const getProduct = async (id: number) => {
  const { data } = await axios.get<Product>(`https://example-data.draftbit.com/products/${id}?_expand=product_reviews`)
  return mapProduct(data)
}

const mapProduct = (product: Product): Product => {
  return {
    ...product,
    num_reviews: product.product_reviews.length
  }
}

/* -------------------------------------------------------------------------- */
/*                               Product Reviews                              */
/* -------------------------------------------------------------------------- */

export const getProductReviews = async (productId: number) => {
  const { data } = await axios.get<ProductReview[]>(
    `https://example-data.draftbit.com/products/${productId}/product_reviews`
  )
  return data
}

export const getProductReview = async (id: number) => {
  const { data } = await axios.get<ProductReview>(`https://example-data.draftbit.com/product_reviews/${id}`)
  return data
}
