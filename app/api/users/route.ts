import { users } from "@data/users"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const pageStr = request.nextUrl.searchParams.get("page")
    const pageSizeStr = request.nextUrl.searchParams.get("pageSize")
    const plan = request.nextUrl.searchParams.get("plan")
    const searchWord = request.nextUrl.searchParams.get("searchWord")
    
    let filteredUsers = users

    if (searchWord && searchWord !== "") {
        filteredUsers = users.filter(user => {
            const searchLower = searchWord.toLowerCase()
            return Object.values(user).some(value =>
                typeof value === "string" && value.toLowerCase().includes(searchLower)
            )
        })
    }
    if(plan && plan !== "") {
        filteredUsers = users.filter(user => user.plan.toLocaleLowerCase() === plan.toLocaleLowerCase())
    }
    if(pageSizeStr && pageStr) {
        const page = parseInt(pageStr)
        const pageSize = parseInt(pageSizeStr)
        
        const start = (page - 1) * pageSize
        const end = start + pageSize
        const totalPages = Math.ceil(filteredUsers.length / pageSize)
        
        return NextResponse.json({ users: filteredUsers.slice(start, end), totalPage: totalPages })
    }
    else {
        return NextResponse.json({ users: filteredUsers, totalPage: 1 })
    }
}

export async function DELETE(request: NextRequest) {
    const id = request.nextUrl.searchParams.get("id")
    if (id) {
        const filteredUsers = users.filter(user => user.id !== id)
        return NextResponse.json({ users: filteredUsers })
    }
}