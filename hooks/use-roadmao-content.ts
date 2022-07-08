
import { createContext } from 'react'
import { RoadmapItemType } from '../utils/types'

interface Rodemap {
  v: RoadmapItemType[]
}

export const initialState: Rodemap = {
  v: [
    {
      img: '',
      name: '',
    }
  ]
}

const RodemapCtx = createContext(initialState);

export default RodemapCtx;
