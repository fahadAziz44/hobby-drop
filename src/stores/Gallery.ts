import {
  types,
  flow,
  Instance,
  applySnapshot,
  getParent,
  destroy,
  SnapshotIn,
} from 'mobx-state-tree'

import { UserFile } from 'src/lib/types'
import { fetchDeleteJSON, fetchGetJSON } from 'src/utils/api-helpers'

export const GalleryItem = types
  .model({
    id: types.identifier,
    url: types.string,
    name: types.string,
    fileName: types.string,
    type: types.string,
    loading: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    remove() {
      getParent<Instance<typeof Gallery>>(self, 2).deleteGalleryItem(self)
    },
  }))

export const Gallery = types
  .model({
    items: types.array(GalleryItem),
    state: types.enumeration('State', ['pending', 'done', 'error']),
    errorMessage: types.optional(types.string, ''),
  })
  .views((self) => ({
    get itemList() {
      return (
        self.items &&
        self.items.length &&
        self.items.map((item) => ({
          id: item.id,
          name: item.name,
          url: item.url,
        }))
      )
    },
  }))
  .actions((self) => ({
    setError: (error: string) => {
      self.errorMessage = error
    },
  }))
  .actions((self) => ({
    fetchGalleryItems: flow(function* fetchGalleryItems() {
      self.state = 'pending'
      try {
        const resp: UserFile[] = yield fetchGetJSON<UserFile[]>('/api/files')
        const mappedItemsWithStringId = resp.map((item) => ({
          ...item,
          id: String(item.id),
        }))
        applySnapshot(self.items, mappedItemsWithStringId)
        self.state = 'done'
      } catch (err: any) {
        self.state = 'error'
        self.setError(
          (err.message as string) || 'Something went wrong fetching gallery'
        )
      }
    }),
    deleteGalleryItem: flow(function* deleteGalleryItem(
      item: SnapshotIn<typeof GalleryItem>
    ) {
      try {
        item.loading = true
        yield fetchDeleteJSON<UserFile>(`/api/files?fileId=${item.id}`)
        item.loading = false
        destroy(item)
      } catch (err: any) {
        // eslint-disable-next-line no-console
        console.error('Error occured while deleting gallery item: ', err)
        self.state = 'error'
        self.setError(
          (err.message as string) || 'Something went wrong fetching gallery'
        )
      }
    }),
  }))
