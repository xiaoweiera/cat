import axios from 'axios'

export const loadProject = async(status: String, cb: (arg0: any) => void): Promise<void> => {
  axios.get(`api/v1/growthpad/projects?status=${status}`)
    .then(({ data }) => {
      if (data.data.length === 0) {
        return cb([{}, {}, {}])
      }
      return cb(data.data)
    })
}
