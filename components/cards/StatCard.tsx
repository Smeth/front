import { StatCardProps } from "@/types/cards"
import Link from "next/link"

const StatCard = ({ label, value, color, link }: StatCardProps) => {
    return (
        <Link href={link || "#"} className="bg-dark-800 h-36 rounded flex flex-col items-center justify-center p-10 space-y-2">
            <p className={color + " text-2xl  font-medium"}>{value}</p>
            <h3 className="text-white">{label}</h3>
        </Link>
    )
}

export default StatCard