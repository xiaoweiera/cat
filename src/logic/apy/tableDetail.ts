import { CoinModel } from '~/types/apy'

interface CellDetail {
  token_name: String
  high_light: String
  data: CellItem[]
}

interface RowItem {
  project_name: String
  cells: CellDetail[]
}

export const filterByOptions = (headers, rows, options) => {
  return rows.map((row, rowIdx: Number) => {
    return {
      project_name: row.project_name,
      data: headers.map(({ token_name }: { token_name: String }, columnIdx: Number) => {
        return {
          rowIdx,
          columnIdx,
          data: options.map((option) => {
            const obj = {}
            obj['name'] = option.name
            obj['key'] = option.key
            if (row.data[token_name]) {
              const cellOrigin = row.data[token_name]
              if (option.format_func) {
                obj['value'] = option.format_func(cellOrigin[option.key])
              }
              else if (option.format_cb) {
                obj['value'] = option.format_cb(cellOrigin)
              }
              else {
                obj['value'] = cellOrigin[option.key] ? cellOrigin[option.key] : '-'
              }
              obj['status'] = option.status
            }
            return obj
          }),
        }
      }),
    }

  })
}
