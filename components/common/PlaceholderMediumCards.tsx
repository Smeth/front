const PlaceholderMediumCards = ({ nbCards }: { nbCards: number }) => {
    const cards = Array.from({ length: nbCards }, (_, index) => index + 1)
    return (
        <>
            {cards.map((card, i) => (
               <div className="rounded-xl overflow-hidden bg-dark-800 shadow-secondary border border-dark-700" key={i}>
                    <div className="bg-black h-36 w-full relative" />
                    <div className="p-3">
                        <div className="mb-3 h-7 bg-dark-400 animate-pulse" />
                        <div className="flex justify-between items-center">
                            <div className="flex space-x-3">
                                <div className="h-7 w-7 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                                <div className="h-7 w-7 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                            </div>
                            <div className="">
                                <div className="h-6 w-12 bg-dark-400 animate-pulse rounded-full flex items-center justify-center" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default PlaceholderMediumCards