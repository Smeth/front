
export type NavLink = {
    title: string,
    link?: string,
    depth: number,
    icon: JSX.Element,
    children?: NavLink[]
}