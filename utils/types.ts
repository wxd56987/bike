export interface uploadType {
  key: string,
  url: string,
  folder?: string,
}

export interface BikeDateType {
  folder: string,
  name: string,
  date: string
}

export interface RoadmapItemType {
  img: string,
  name: string,
}

export interface Rodemap {
  v: RoadmapItemType[]
}