import { movies } from "@data/movies"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const pageStr = request.nextUrl.searchParams.get("page")
    const pageSizeStr = request.nextUrl.searchParams.get("pageSize")
    const language = request.nextUrl.searchParams.get("language")
    const searchWord = request.nextUrl.searchParams.get("searchWord")
    
    let filteredMovies = movies

    if (searchWord && searchWord !== "") {
        filteredMovies = movies.filter(movie => {
            const searchLower = searchWord.toLowerCase()
            return Object.values(movie).some(value =>
                typeof value === "string" && value.toLowerCase().includes(searchLower)
            )
        })
    }
    if(language && language !== "") {
        filteredMovies = movies.filter(movie => movie.language.value.toLocaleLowerCase() === language.toLocaleLowerCase())
    }
    if(pageSizeStr && pageStr) {
        const page = parseInt(pageStr)
        const pageSize = parseInt(pageSizeStr)
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const totalPages = Math.ceil(filteredMovies.length / pageSize)
        
        return NextResponse.json({ movies: filteredMovies.slice(start, end), totalPage: totalPages })
    }
    else {
        return NextResponse.json({ movies: filteredMovies, totalPage: 1 })
    }
}
