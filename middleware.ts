import { NextResponse } from 'next/server'
export { default } from "next-auth/middleware"

export const config = { 
    matcher: [
        "/",
        "/banner_ads/:path*",
        "/countries/:path*",
        "/genres/:path*",
        "/languages/:path*",
        "/lives/:path*",
        "/livetv/:path*",
        "/movies/:path*",
        "/player_settings/:path*",
        "/podcasts/:path*",
        "/profiles/:path*",
        "/radios/:path*",
        "/series/:path*",
        "/sliders/:path*",
        "/subscription/:path*",
        "/users/:path*",
        "/api/:path*",
    ] 
}