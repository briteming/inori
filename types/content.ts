// from @nuxt/content
export interface ParsedContentInternalMeta {
  /**
     * Content id
     */
  _id: string
  /**
     * Content source
     */
  _source?: string
  /**
     * Content path, this path is source agnostic and it the content my live in any source
     */
  _path?: string
  /**
     * Content title
     */
  title?: string
  /**
     * Content draft status
     */
  _draft?: boolean
  /**
     * Content partial status
     */
  _partial?: boolean
  /**
     * Content locale
     */
  _locale?: string
  /**
     * File type of the content, i.e `markdown`
     */
  _type?: string
  /**
     * Path to the file relative to the content directory
     */
  _file?: string
  /**
     * Extension of the file
     */
  _extension?: string
}

export interface ParsedContentMeta extends ParsedContentInternalMeta {
  [key: string]: any
}

export interface ParsedContent extends ParsedContentMeta {
  /**
     * Excerpt
     */
  excerpt?: any
  /**
     * Content body
     */
  body: any
}
