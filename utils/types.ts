export interface uploadType {
  key: string,
  url: string,
  folder?: string,
}

export interface BikeDateType {
  folder: string,
  name: string,
  date: string,
  icon: string,
}

export interface RoadmapItemType {
  img: string,
  name: string,
}

export interface Rodemap {
  v: RoadmapItemType[]
}

export interface MapListType {
  img: string,
  star: string,
  start: string,
  title: string,
  end: string,
  distance: string,
  decs: string
}

export interface MapType {
  v: MapListType[]
}