import { NavLink } from "@/types/links"

import 
{ 
    DashboardIcon, 
    TranslationIcon,
    ListIcon,
    CameraVideoIcon,
    MovieIcon,
    DesktopIcon,
    RadioIcon,
    PodcastIcon,
    UsersIcon,
    SlidersIcon,
    GearIcon,
    TagsIcon,
    ImageIcon,
    DollarIcon,
    PlayCircleIcon,
    RadioIconAlt,
    UsersIconAlt,
    AdsIcon,
    GroupIcon,
    LanguageIcon,
    LiveIcon,
    FlagIcon
} 
from "@icons/MyTVIcons"

export const navLinks: NavLink[] = [
    {
        title: 'Dashboard',
        link: "/",
        depth: 1,
        children: [],
        icon: <DashboardIcon classes="h-5"/>
    },
    {
        title: 'TV',
        link: "/tv",
        depth: 1,
        children: [
            {
                title: 'Categories TV',
                link: "/tv/categories",
                depth: 2,
                children: [],
                icon: <TagsIcon classes="h-5"/>
            },
            {
                title: 'Liste des chaines',
                link: "/tv",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            }
        ],
        icon: <DesktopIcon classes="h-5"/>
    },
    {
        title: 'Lives',
        link: "/lives",
        depth: 1,
        children: [
            {
                title: 'Categories lives',
                link: "/lives/categories",
                depth: 2,
                children: [],
                icon: <TagsIcon classes="h-5"/>
            },
            {
                title: 'Liste des lives',
                link: "/lives",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            }
        ],
        icon: <LiveIcon classes="h-5"/>
    },
    {
        title: 'Films',
        link: "/movies",
        depth: 1,
        children: [],
        icon: <CameraVideoIcon classes="h-5"/>
    },
    {
        title: 'Séries',
        link: "/series",
        depth: 1,
        children: [
            {
                title: 'Liste des séries',
                link: "/series",
                depth: 2,
                children: [],
                icon: <ImageIcon classes="h-5"/>
            },
            {
                title: 'Liste des saisons',
                link: "/series/seasons",
                depth: 2,
                children: [],
                icon: <CameraVideoIcon classes="h-5"/>
            },
            {
                title: 'Liste des épisodes',
                link: "/series/episodes",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            },
        ],
        icon: <MovieIcon classes="h-5"/>
    },
    {
        title: 'Podcasts',
        link: "/podcasts",
        depth: 1,
        children: [
            {
                title: 'Collections Podcast',
                link: "/podcasts/collections",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            },
            {
                title: 'Categories Podcast',
                link: "/podcasts/categories",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            },
            {
                title: 'Liste Podcasts',
                link: "/podcasts",
                depth: 2,
                children: [],
                icon: <RadioIconAlt classes="h-5"/>
            }
        ],
        icon: <PodcastIcon classes="h-5"/>
    },
    {
        title: 'Radios',
        link: "/radios",
        depth: 1,
        children: [
            {
                title: 'Categories Radio',
                link: "/radios/categories",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            },
            {
                title: 'Liste Radios',
                link: "/radios",
                depth: 2,
                children: [],
                icon: <RadioIconAlt classes="h-5"/>
            }
        ],
        icon: <RadioIcon classes="h-5"/>
    },
    {
        title: 'Genres',
        link: "/genres",
        depth: 1,
        children: [],
        icon: <ListIcon classes="h-5"/>
    },
    {
        title: 'Sliders',
        link: "/sliders",
        depth: 1,
        children: [],
        icon: <SlidersIcon classes="h-5"/>
    },
    {
        title: 'Langues',
        link: "/languages",
        depth: 1,
        children: [],
        icon: <LanguageIcon classes="h-6"/>
    },
    {
        title: 'Player Settings',
        link: "/player_settings",
        depth: 1,
        children: [],
        icon: <PlayCircleIcon classes="h-5"/>
    },
    {
        title: 'Plans d’abonnement',
        link: "/subscription",
        depth: 1,
        children: [],
        icon: <DollarIcon classes="h-5"/>
    },
    {
        title: 'Casting & Equipe',
        link: "/profiles",
        depth: 1,
        children: [
            {
                title: 'Acteurs',
                link: "/profiles/actors",
                depth: 2,
                children: [],
                icon: <UsersIcon classes="h-5"/>
            },
            {
                title: 'Directeurs',
                link: "/profiles/directors",
                depth: 2,
                children: [],
                icon: <ListIcon classes="h-5"/>
            }
        ],
        icon: <GroupIcon classes="h-5"/>
    },
    {
        title: 'Gestion des utilisateurs',
        link: "/users",
        depth: 1,
        children: [
            {
                title: 'Liste des utilisateurs',
                link: "/users",
                depth: 2,
                children: [],
                icon: <UsersIcon classes="h-5"/>
            },
            {
                title: 'Administrateurs',
                link: "/users/admins",
                depth: 2,
                children: [],
                icon: <UsersIcon classes="h-5"/>
            },
            {
                title: 'Utilisateurs archivés',
                link: "/users/archived",
                depth: 2,
                children: [],
                icon: <UsersIcon classes="h-5"/>
            }
        ],
        icon: <UsersIcon classes="h-5"/>
    },
    {
        title: "Bannières publicitaires",
        link: "/banner_ads",
        depth: 1,
        children: [],
        icon: <AdsIcon classes="h-5"/>
    },
    {
        title: 'Réglages',
        link: "/settings",
        depth: 1,
        children: [],
        icon: <GearIcon classes="h-5"/>
    },
    {
        title: 'Pays',
        link: "/countries",
        depth: 1,
        children: [],
        icon: <FlagIcon classes="h-5"/>
    },
]