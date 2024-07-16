export type Product = {
  id: number
  sku: string
  name: string
  description: string
  list_price: number
  sale_price: number
  category: string
  average_product_rating: number
  image_url: string
  brand: string
  num_reviews: number
  product_reviews: ProductReview[]
}

export type ProductReview = {
  id: number
  productId: number
  peopleId: number
  title: string
  full_review: string
  rating: number
  recommend: string
  date: string
}

export type Account = {
  id: number
  name: string
  location: string
  slug: string
  people: Person[]
}

export type Person = {
  id: number
  email: string
  first_name: string
  last_name: string
  full_name: string
  avatar: string
  bgimage: string
  bgimage_thumb: string
  prefix: string
  suffix: string
  city: string
  state: string
  country: string
  website: string
  bio: string
  birthdate: string
  gender: string
  university: string
  job_title: string
  username: string
  user_agent: string
  orgId: number
  teamId: number
}
