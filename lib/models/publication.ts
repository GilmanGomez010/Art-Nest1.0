export interface Publication {
  id: string
  title: string
  description: string
  imageUrl: string
  imageFile?: File
  category: string
  tags: string[]
  userId: string
  userName: string
  userAvatar: string
  likes: number
  views: number
  comments: number
  createdAt: string
  updatedAt: string
  isPublic: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar: string
  bio: string
  specialty: string
  followers: number
  following: number
  publications: number
  createdAt: string
}

export interface Comment {
  id: string
  publicationId: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  createdAt: string
}

export interface SearchFilters {
  query?: string
  category?: string
  tags?: string[]
  userId?: string
  sortBy?: "recent" | "popular" | "trending"
}
