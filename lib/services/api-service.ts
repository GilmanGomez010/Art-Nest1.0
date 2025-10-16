import type { Publication, User, Comment, SearchFilters } from "@/lib/models/publication"

class ApiService {
  private static instance: ApiService
  private publications: Publication[] = []
  private users: User[] = []
  private comments: Comment[] = []

  private constructor() {
    this.initializeMockData()
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService()
    }
    return ApiService.instance
  }

  private initializeMockData() {
    // Mock users
    this.users = [
      {
        id: "1",
        name: "Jose",
        email: "jose@artnest.com",
        avatar: "/artist-profile.png",
        bio: "Artista digital especializado en paisajes",
        specialty: "Diseño pixel",
        followers: 1234,
        following: 567,
        publications: 89,
        createdAt: new Date().toISOString(),
      },
      {
        id: "2",
        name: "María García",
        email: "maria@artnest.com",
        avatar: "/female-artist-avatar.jpg",
        bio: "Ilustradora y diseñadora gráfica",
        specialty: "Ilustración",
        followers: 2341,
        following: 432,
        publications: 156,
        createdAt: new Date().toISOString(),
      },
    ]

    // Mock publications
    this.publications = [
      {
        id: "1",
        title: "Pájaro Colorido",
        description: "Ilustración digital de un pájaro en estilo minimalista",
        imageUrl: "/colorful-bird-illustration.jpg",
        category: "Naranja",
        tags: ["ilustración", "minimalista", "aves"],
        userId: "1",
        userName: "Jose",
        userAvatar: "/artist-profile.png",
        likes: 234,
        views: 1523,
        comments: 45,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date(Date.now() - 86400000).toISOString(),
        isPublic: true,
      },
      {
        id: "2",
        title: "Rostro Expresivo",
        description: "Arte digital con expresiones intensas",
        imageUrl: "/expressive-face-art-red.jpg",
        category: "Animal",
        tags: ["digital", "expresivo", "retrato"],
        userId: "2",
        userName: "María García",
        userAvatar: "/female-artist-avatar.jpg",
        likes: 567,
        views: 3421,
        comments: 89,
        createdAt: new Date(Date.now() - 172800000).toISOString(),
        updatedAt: new Date(Date.now() - 172800000).toISOString(),
        isPublic: true,
      },
      {
        id: "3",
        title: "Llama Dorada",
        description: "Representación artística del fuego",
        imageUrl: "/golden-flame-fire-art.jpg",
        category: "Naranja",
        tags: ["fuego", "abstracto", "cálido"],
        userId: "1",
        userName: "Jose",
        userAvatar: "/artist-profile.png",
        likes: 432,
        views: 2156,
        comments: 67,
        createdAt: new Date(Date.now() - 259200000).toISOString(),
        updatedAt: new Date(Date.now() - 259200000).toISOString(),
        isPublic: true,
      },
    ]
  }

  // CRUD Operations for Publications
  async getAllPublications(): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => resolve([...this.publications]), 300)
    })
  }

  async getPublicationById(id: string): Promise<Publication | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const publication = this.publications.find((p) => p.id === id)
        resolve(publication || null)
      }, 200)
    })
  }

  async searchPublications(filters: SearchFilters): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        let results = [...this.publications]

        if (filters.query) {
          const query = filters.query.toLowerCase()
          results = results.filter(
            (p) =>
              p.title.toLowerCase().includes(query) ||
              p.description.toLowerCase().includes(query) ||
              p.tags.some((tag) => tag.toLowerCase().includes(query)),
          )
        }

        if (filters.category) {
          results = results.filter((p) => p.category === filters.category)
        }

        if (filters.tags && filters.tags.length > 0) {
          results = results.filter((p) => filters.tags!.some((tag) => p.tags.includes(tag)))
        }

        if (filters.userId) {
          results = results.filter((p) => p.userId === filters.userId)
        }

        if (filters.sortBy === "popular") {
          results.sort((a, b) => b.likes - a.likes)
        } else if (filters.sortBy === "trending") {
          results.sort((a, b) => b.views - a.views)
        } else {
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        }

        resolve(results)
      }, 400)
    })
  }

  async createPublication(publication: Omit<Publication, "id" | "createdAt" | "updatedAt">): Promise<Publication> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newPublication: Publication = {
          ...publication,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        this.publications.unshift(newPublication)
        resolve(newPublication)
      }, 500)
    })
  }

  async updatePublication(id: string, updates: Partial<Publication>): Promise<Publication | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.publications.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.publications[index] = {
            ...this.publications[index],
            ...updates,
            updatedAt: new Date().toISOString(),
          }
          resolve(this.publications[index])
        } else {
          resolve(null)
        }
      }, 400)
    })
  }

  async deletePublication(id: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.publications.findIndex((p) => p.id === id)
        if (index !== -1) {
          this.publications.splice(index, 1)
          resolve(true)
        } else {
          resolve(false)
        }
      }, 300)
    })
  }

  async likePublication(id: string): Promise<Publication | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const publication = this.publications.find((p) => p.id === id)
        if (publication) {
          publication.likes += 1
          resolve(publication)
        } else {
          resolve(null)
        }
      }, 200)
    })
  }

  // User operations
  async getUserById(id: string): Promise<User | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = this.users.find((u) => u.id === id)
        resolve(user || null)
      }, 200)
    })
  }

  async getUserPublications(userId: string): Promise<Publication[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const userPubs = this.publications.filter((p) => p.userId === userId)
        resolve(userPubs)
      }, 300)
    })
  }

  // Comments operations
  async getPublicationComments(publicationId: string): Promise<Comment[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const pubComments = this.comments.filter((c) => c.publicationId === publicationId)
        resolve(pubComments)
      }, 200)
    })
  }

  async addComment(comment: Omit<Comment, "id" | "createdAt">): Promise<Comment> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newComment: Comment = {
          ...comment,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        this.comments.push(newComment)

        // Increment comment count
        const publication = this.publications.find((p) => p.id === comment.publicationId)
        if (publication) {
          publication.comments += 1
        }

        resolve(newComment)
      }, 300)
    })
  }
}

export default ApiService
