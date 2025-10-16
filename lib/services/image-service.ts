export interface ImageUploadResult {
  success: boolean
  url?: string
  error?: string
}

class ImageService {
  private static instance: ImageService

  private constructor() {}

  public static getInstance(): ImageService {
    if (!ImageService.instance) {
      ImageService.instance = new ImageService()
    }
    return ImageService.instance
  }

  async uploadImage(file: File): Promise<ImageUploadResult> {
    return new Promise((resolve) => {
      // Validate file
      if (!file.type.startsWith("image/")) {
        resolve({ success: false, error: "El archivo debe ser una imagen" })
        return
      }

      // Validate size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        resolve({ success: false, error: "La imagen no debe superar 5MB" })
        return
      }

      // Convert to base64 for local storage
      const reader = new FileReader()
      reader.onload = (e) => {
        const url = e.target?.result as string
        resolve({ success: true, url })
      }
      reader.onerror = () => {
        resolve({ success: false, error: "Error al leer la imagen" })
      }
      reader.readAsDataURL(file)
    })
  }

  async compressImage(file: File, maxWidth = 1200): Promise<File> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          const canvas = document.createElement("canvas")
          let width = img.width
          let height = img.height

          if (width > maxWidth) {
            height = (height * maxWidth) / width
            width = maxWidth
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext("2d")
          ctx?.drawImage(img, 0, 0, width, height)

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                })
                resolve(compressedFile)
              } else {
                reject(new Error("Error al comprimir la imagen"))
              }
            },
            file.type,
            0.85,
          )
        }
        img.src = e.target?.result as string
      }
      reader.readAsDataURL(file)
    })
  }

  validateImage(file: File): { valid: boolean; error?: string } {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"]

    if (!validTypes.includes(file.type)) {
      return { valid: false, error: "Formato no válido. Use JPG, PNG, GIF o WebP" }
    }

    if (file.size > 5 * 1024 * 1024) {
      return { valid: false, error: "La imagen no debe superar 5MB" }
    }

    return { valid: true }
  }
}

export default ImageService
