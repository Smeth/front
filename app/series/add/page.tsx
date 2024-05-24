"use client"

import DatePickerComponent from "@components/elements/forms/DatePicker"
import S3FileUploader from "@components/elements/forms/S3FileUploader"
import SelectSearch from "@components/elements/forms/SelectSearch"
import SwitchRadio from "@components/elements/forms/SwitchRadio"
import TinyEditor from "@components/elements/forms/TinyEditor"
import { LeftArrowIcon, SaveIcon } from "@icons/MyTVIcons"
import axios from "@lib/axios"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { dateToInputDate, getFieldArrayValue } from "@utils/utilities"
import { useSession } from "next-auth/react"
import { toast } from "react-toastify"

export default function AddSeriePage() {
    const [tmdbID, setTmdbID] = useState<string>("")
    const [tmdbIsLoading, setTmdbIsLoading] = useState<boolean>(false)
    const [serie, setSerie] = useState<any>({})
    const [languesOptions, setLanguesOptions] = useState<any>([])
    const [genresOptions, setGenresOptions] = useState<any>([])
    const [actorsOptions, setActorsOptions] = useState<any>([])
    const [directorsOptions, setDirectorsOptions] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const handleTMDBFetch = async () => {
        setTmdbIsLoading(true)
        fetch(`https://api.themoviedb.org/3/tv/${tmdbID}?api_key=${process.env.NEXT_PUBLIC_TMDB_APIKEY}&language=fr&append_to_response=videos`)
        .then(response => response.json())
        .then((data: any) => {
            let genres: any[] = []
            data.genres.forEach((genre: any) => {
                genresOptions.forEach((g: any) => {
                    if(g.label.toLowerCase() === genre.name.toLowerCase()) {
                        genres.push({...g})
                    }
                })
            })

            setSerie({
                ...serie,
                imdbId: tmdbID,
                idSerie: data.id,
                name: data.name,
                overview: data.overview,
                releaseDate: data.release_date,
                budget: data.budget,
                poster_path: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${data.poster_path}`,
                popularity: data.popularity,
                status: data.status === 'Ended' ? false : true,
                rating: data.vote_average,
                genreList: genres,
                backdrop_path: `https://image.tmdb.org/t/p/w780/${data.backdrop_path}`,
                trailerUrl: "https://www.youtube.com/embed/" + data.videos.results[0].key
            })
        })
        .catch(error => console.error(error))
        .finally(() => setTmdbIsLoading(false))
    }

    const handleFieldChange = (fieldName: string, value: string) => {
        setSerie({
            ...serie,
            [fieldName]: value
        })
    }

    console.log('serie', serie)

    const handleSelectSearchChange = (newValue: any, actionMeta: any) => {
        setSerie({
            ...serie,
            [actionMeta.name]: newValue.value
        })
    }

    const [errors, setErrors] = useState<any>({})
    const router = useRouter()
    const { data: session } = useSession()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/admin/ressources/all?resources=genres,langues,acteurs,directeurs', {
                    headers: {
                        Authorization: `Bearer ${session?.token}`
                    }
                })
                if(response.status === 200) {
                    for (const item of response.data.Data) {
                        if (item.langues) {
                            setLanguesOptions(item.langues.map((langue: any) => ({ label: langue.name, value: langue.idLang })))
                        } else if (item.genres) {
                            setGenresOptions(item.genres.map((genre: any) => ({ label: genre.name, value: genre.idGenre })))
                        } else if (item.acteurs) {
                            setActorsOptions(item.acteurs.map((acteur: any) => ({ label: acteur.fistName + ' ' + acteur.lastName, value: acteur.idActor })))
                        } else if (item.directeurs) {
                            setDirectorsOptions(item.directeurs.map((directeur: any) => ({ label: directeur.fistName + ' ' + directeur.lastName, value: directeur.idDirector })))
                        }
                    }
                }
                else {
                    toast.error("Une erreur est survenue. Veuillez rafraichir la page.")
                }
            } catch (error: any) {
                
            }
        }
        session?.token ? fetchData() : null
    }, [session])
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const { 
            name,
            overview,
            status,
            backdrop_path,
            releaseDate,
            accessFree,
            adult,
            upcoming,
            contentRating,
            popularity,
            vote_average,
            vote_count,
            budget,
            poster_path,
            trailerUrl,
            imdbRating,
        }: any = e.currentTarget
        
        const data = {
            name: name.value,
            overview: overview.value,
            releaseDate: dateToInputDate(releaseDate.value),
            accessFree: accessFree.value,
            status: status.value,
            adult: adult.value,
            acteurList: getFieldArrayValue(e, 'acteurList'),
            directorList: getFieldArrayValue(e, 'directorList'),
            genreList: getFieldArrayValue(e, 'genreList'),
            upcoming: upcoming.value,
            contentRating: contentRating.value,
            langue: getFieldArrayValue(e, 'langue'),
            poster_path: poster_path.value,
            backdrop_path: backdrop_path.value,
            trailerUrl: trailerUrl.value,
            imdbRating: imdbRating.value,
            popularity: popularity.value,
            vote_average: vote_average.value,
            vote_count: vote_count.value,
            budget: budget.value,
            // saison: [],
        }

        console.log('data', data)

        try {
            const res = await axios.post('/admin/series/create', data, {
                headers: {
                    Authorization: `Bearer ${session?.token}`
                }
            })
    
            if(res.status === 201) {
                toast.success('Série ajoutée avec succès!')
                return router.push('/series')
            }
        } catch (error: any) {
            if(error.response.status === 409) {
                setErrors({ ...errors, global: error.response.data.Data })
            }
            else if (error.response.status === 400) {
                setErrors({ ...errors, ...error.response.data.Data })
            } 
            else {
                 setErrors({ ...errors, global: "Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et réessayer" })
                toast.error("Oops, quelque chose s'est mal passé. Veuillez rafraichir la page et reessayer")
            }
        }
    }

    return (
        <div className="w-full">
            <div className="w-full bg-dark-800 rounded p-5">
                <Link href="/series" className="inline-flex items-center space-x-1">
                    <LeftArrowIcon classes="h-6 text-primary-900" />
                    <span className="text-primary-900 font-bold">Retour</span>
                </Link>
                <div className="mt-4">
                    <div className="flex justify-between space-x-4 py-6 border-b border-dark-500">
                        <span className="text-white text-sm font-medium mt-3">Importer depuis IMDb</span>
                        <div className="w-full md:w-3/5 flex space-x-3">
                            <div className="w-full">
                                <input 
                                    className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder:text-gray-500 font-medium shadow-lg focus:shadow-input"
                                    type="text" 
                                    name="title" 
                                    id="title"
                                    onChange={(e: any) => setTmdbID(e.target.value)}
                                    placeholder="Entrez un ID IMDb (ex: tt1234567)"
                                />
                                <span className="text-[11px] text-grey-100">(Recommended : Search by IMDb ID for better result)</span>
                            </div>
                            <div className="pt-0.5">
                                <button
                                    onClick={handleTMDBFetch} 
                                    type="button" className={`flex items-center space-x-2 uppercase text-white font-bold ${!tmdbIsLoading ? 'bg-primary-900' : 'bg-[#49494a]'} rounded px-4 py-2.5 text-sm hover:bg-slate-600`}
                                >
                                    <span>Importer</span>
                                    {tmdbIsLoading && <div className="animate-spin rounded-full h-5 w-5 border-2 border-t-0 border-gray-900" />}
                                </button>
                            </div>
                        </div>
                        <div className=""></div>
                    </div>
                    <form onSubmit={handleSubmit} className="grid grid-cols-2 my-3 gap-4 md:gap-12">
                        <div className="">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Informations sur la série</h2>
                                <div className="mt-8 flex flex-col gap-4">

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="name" className="text-white text-sm font-medium">Titre de la série*</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="name" 
                                                id="name"
                                                onChange={(e: any) => setSerie({...serie, name: e.target.value})}
                                                value={serie?.name}
                                            />
                                            {errors && errors?.name && <span className="text-red-500 text-sm">{errors.name}</span>}
                                        </div>
                                    </div>

                                    <div className="">
                                        <label htmlFor="overview" className="text-white text-sm font-medium">Description</label>
                                        <div className="w-full my-3 h-72 bg-white rounded">
                                            <TinyEditor 
                                                defaultValue={serie?.overview || ''}
                                                id="overview"
                                                name="overview"
                                                onFieldChange={handleFieldChange}
                                            />
                                            {errors && errors?.overview && <span className="text-red-500 text-sm">{errors.overview}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="releaseDate" className="text-white text-sm font-medium">Date de sortie</label>
                                        <div className="w-full md:w-2/3">
                                            <DatePickerComponent
                                                defaultValue={serie.releaseDate !== "" ? serie.releaseDate : null}
                                                onFieldChange={handleFieldChange}
                                                name="releaseDate"
                                                id="releaseDate"
                                            />
                                            {errors && errors?.releaseDate && <span className="text-red-500 text-sm">{errors.releaseDate}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="accessFree" className="text-white text-sm font-medium">Accès au film</label>
                                        <select 
                                            className="w-full md:w-2/3 px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                            name="accessFree" 
                                            id="accessFree"
                                            value={serie?.accessFree}
                                            onChange={(e: any) => setSerie({...serie, accessFree: e.target.value === "true"})}
                                        >
                                            <option value="false">Payant</option>
                                            <option value="true">Gratuit</option>
                                        </select>
                                    </div>

                                    <div className="flex justify-between space-x-4 py-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="status" className="text-white text-sm font-medium">Statut</label>
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <SwitchRadio 
                                                active={serie?.status || false}
                                                label1="Actif"
                                                label2="Inactif"
                                                name="status"
                                                id="status"
                                                onFieldChange={handleFieldChange}
                                            />
                                            {errors && errors?.status && <span className="text-red-500 text-sm">{errors.status}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4 py-2">
                                        <div className="flex flex-col">
                                            <label htmlFor="adult" className="text-white text-sm font-medium">Contenu pour adulte ?</label>
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <SwitchRadio 
                                                active={serie?.adult || false}
                                                label1="Oui"
                                                label2="Non"
                                                name="adult"
                                                id="adult"
                                                onFieldChange={handleFieldChange}
                                            />
                                            {errors && errors?.adult && <span className="text-red-500 text-sm">{errors.adult}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="acteurList" className="text-white text-sm font-medium">Acteurs</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="acteurList"
                                                name="acteurList"
                                                options={actorsOptions}
                                                isMulti={true}
                                                defaultValue={serie?.acteurList || null}
                                                label="Selectionner un ou plusieurs acteurs"
                                                onChange={handleSelectSearchChange}
                                            />
                                            {errors && errors?.acteurList && <span className="text-red-500 text-sm">{errors.acteurList}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="directorList" className="text-white text-sm font-medium">Directeur(s)</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="directorList"
                                                name="directorList"
                                                options={directorsOptions}
                                                isMulti={true}
                                                defaultValue={serie?.directorList || null}
                                                label="Selectionner un ou plusieurs directeurs"
                                                onChange={handleSelectSearchChange}
                                            />
                                            {errors && errors?.directorList && <span className="text-red-500 text-sm">{errors.directorList}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="genreList" className="text-white text-sm font-medium">Genres</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="genreList"
                                                name="genreList"
                                                options={genresOptions}
                                                isMulti={true}
                                                defaultValue={serie?.genreList}
                                                label="Selectionner un ou plusieurs genres"
                                                onChange={handleSelectSearchChange}
                                            />
                                            {errors && errors?.genreList && <span className="text-red-500 text-sm">{errors.genreList}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="upcoming" className="text-white text-sm font-medium mt-3">À venir</label>
                                        <div className="w-full md:w-2/3">
                                            <select 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                name="upcoming" 
                                                id="upcoming"
                                                value={serie?.upcoming}
                                                onChange={(e) => setSerie({...serie, upcoming: e.target.value === "true"})}
                                            >
                                                <option value="false">Non</option>
                                                <option value="true">Oui</option>
                                            </select>
                                            <span className="text-[11px] text-grey-100">{"(Affichage uniquement sur la page d'accueil)"}</span>
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="contentRating" className="text-white text-sm font-medium">Classification du contenu</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="contentRating" 
                                                id="contentRating"
                                                onChange={(e: any) => setSerie({...serie, contentRating: e.target.value})}
                                                value={serie?.contentRating}
                                            />
                                            {errors && errors?.contentRating && <span className="text-red-500 text-sm">{errors.contentRating}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="langue" className="text-white text-sm font-medium">Langue*</label>
                                        <div className="w-full md:w-2/3">
                                            <SelectSearch
                                                id="langue"
                                                name="langue"
                                                options={languesOptions}
                                                isMulti={false}
                                                label="Selectionner une langue"
                                                defaultValue={serie?.langue}
                                                onChange={handleSelectSearchChange}
                                            />
                                            {errors && errors?.langue && <span className="text-red-500 text-sm">{errors.langue}</span>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:pr-12">
                            <div className="">
                                <h2 className="text-lg text-white font-medium">Poster et couverture</h2>
                                <div className="flex flex-col gap-4 mt-4">
                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="poster_path" className="text-white text-sm font-medium mt-3">Poster*</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="poster_path" 
                                                id="poster_path" 
                                                accept="image/*"
                                                helper="(Recommended resolution : 270X390)"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={serie?.poster_path}
                                            />
                                            {errors && errors?.poster_path && <span className="text-red-500 text-sm">{errors.poster_path}</span>}
                                            {
                                                serie.poster_path && serie.poster_path !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"Poster " + serie.name}
                                                            src={serie.poster_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="backdrop_path" className="text-white text-sm font-medium mt-3">Couverture</label>
                                        <div className="w-full md:w-2/3">
                                            <S3FileUploader 
                                                name="backdrop_path" 
                                                id="backdrop_path" 
                                                accept="image/*"
                                                helper="(Recommended resolution : 270X390)"
                                                onFieldChange={handleFieldChange}
                                                fileUrl={serie?.backdrop_path}
                                            />
                                            {errors && errors?.backdrop_path && <span className="text-red-500 text-sm">{errors.backdrop_path}</span>}
                                            {
                                                serie.backdrop_path && serie.backdrop_path !== "" && (
                                                    <div className="h-28 mt-1 w-auto relative">
                                                        <Image
                                                            fill className="object-contain object-left"
                                                            alt={"Couverture de " + serie.name}
                                                            src={serie.backdrop_path}
                                                            sizes="(100vw - 2.5rem)"
                                                        />
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-dark-500 mt-4 pt-4">
                                <h2 className="text-lg text-white font-medium">Autres</h2>
                                <div className="flex flex-col gap-4 mt-4">

                                    <div className="flex justify-between space-x-4">
                                        <label htmlFor="trailerUrl" className="text-white text-sm font-medium mt-3">Trailer Url</label>
                                        <div className="flex flex-col space-y-2 w-full md:w-2/3">
                                            <input 
                                                className="w-full  px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="trailerUrl" 
                                                id="trailerUrl"
                                                onChange={(e: any) => setSerie({...serie, trailerUrl: e.target.value})}
                                                value={serie.trailerUrl}
                                            />
                                            {errors && errors?.trailerUrl && <span className="text-red-500 text-sm">{errors.trailerUrl}</span>}
                                            {serie.trailerUrl && serie.trailerUrl !== "" && (
                                                <iframe className="h-40 w-40" allowFullScreen src={serie.trailerUrl} />
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="imdbRating" className="text-white text-sm font-medium">Note IMDb</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="imdbRating" 
                                                id="imdbRating"
                                                onChange={(e: any) => setSerie({...serie, imdbRating: e.target.value})}
                                                value={serie?.imdbRating}
                                            />
                                            {errors && errors?.imdbRating && <span className="text-red-500 text-sm">{errors.imdbRating}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="popularity" className="text-white text-sm font-medium">Popularité</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="popularity" 
                                                id="popularity"
                                                onChange={(e: any) => setSerie({...serie, popularity: e.target.value})}
                                                value={serie?.popularity}
                                            />
                                            {errors && errors?.popularity && <span className="text-red-500 text-sm">{errors.popularity}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="vote_average" className="text-white text-sm font-medium">Vote moyenne</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="vote_average" 
                                                id="vote_average"
                                                onChange={(e: any) => setSerie({...serie, vote_average: e.target.value})}
                                                value={serie?.vote_average}
                                            />
                                            {errors && errors?.vote_average && <span className="text-red-500 text-sm">{errors.vote_average}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="vote_count" className="text-white text-sm font-medium">Total votes</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="vote_count" 
                                                id="vote_count"
                                                onChange={(e: any) => setSerie({...serie, vote_count: e.target.value})}
                                                value={serie?.vote_count}
                                            />
                                            {errors && errors?.vote_count && <span className="text-red-500 text-sm">{errors.vote_count}</span>}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center space-x-4">
                                        <label htmlFor="budget" className="text-white text-sm font-medium">Budget</label>
                                        <div className="flex flex-col space-y-1 w-full md:w-2/3">
                                            <input 
                                                className="w-full px-4 py-3 rounded focus:outline-none bg-dark-700 text-sm text-grey-200 placeholder-gray-500 font-medium shadow-lg focus:shadow-input"
                                                type="text" 
                                                name="budget" 
                                                id="budget"
                                                onChange={(e: any) => setSerie({...serie, budget: e.target.value})}
                                                value={serie?.budget}
                                            />
                                            {errors && errors?.budget && <span className="text-red-500 text-sm">{errors.budget}</span>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className="mt-8">
                                <button type="submit" className="flex items-center space-x-2 bg-primary-900 px-4 py-2 rounded">
                                    <SaveIcon classes="h-4 text-white" />
                                    <span className="text-white text-xs font-semibold uppercase">Sauvegarder</span>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
