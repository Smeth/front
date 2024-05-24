
const PlaceholderShortCards = ({ nbCards = 4 }: { nbCards?: number }) => {
    const cards = Array.from({ length: nbCards }, (_, index) => index + 1)
    return (
        <>
            {cards.map((card, i) => (
                <div key={i} className="border border-dark-700 rounded-lg bg-dark-600/30 bg-plan-shape bg-no-repeat bg-bottom shadow-secondary p-4">
                    <div className="py-4 relative before:absolute before:w-14 before:h-14 before:bg-black/20 before:animate-pulse before:rounded-full before:top-1.5 before:left-1/2 before:-translate-x-1/2">
                        <div className="mb-3 h-7 bg-dark-400 animate-pulse" />
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                        <div className="flex space-x-3">
                            <div className="h-7 w-7 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                            <div className="h-7 w-7 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                        </div>
                        <div className="">
                            <div className="h-6 w-12 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                        </div>
                    </div>      
                </div>
            ))}
           
        </>
    )
}

export default PlaceholderShortCards