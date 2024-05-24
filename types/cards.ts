export type StatCardProps = {
    label: string,
    value: string,
    color: string,
    link?: string
}

export type GenreCardProps = {
    title: string,
    id: string,
    active: boolean,
    img_path: string
}

export type LanguageCardProps = {
    title: string,
    flag: string,
    id: string,
    active: boolean
}

export type MovieCardProps = {
    title: string,
    id: string,
    active: boolean,
    selected: boolean,
    image: string,
    language: string,
    collection?: string
    handleSelect: (value: string) => void
}

export type SerieCardProps = {
    title: string,
    id: string,
    active: boolean,
    selected: boolean,
    image: string
}

export type SeasonCardProps = {
    season: string,
    title: string,
    id: string,
    active: boolean,
    selected: boolean,
    image: string
}

export type EpisodeCardProps = {
    serie: string,
    title: string,
    id: string,
    active: boolean,
    selected: boolean,
    image: string
}

export type SliderCardProps = {
    title: string,
    id: string,
    active: boolean,
    image: string
}

export type TVCardProps = {
    title: string,
    id: string,
    active: boolean,
    selected: boolean,
    image: string
}