const PlaceholderTableRows = ({ nbRows }: { nbRows: number }) => {
    const rows = Array.from({ length: nbRows }, (_, index) => index + 1)
    return (
        <>
            {rows.map((row, i) => (<div key={i} className="h-12 bg-dark border border-dark-600 animate-pulse" /> ))}
        </>
    )
}

export default PlaceholderTableRows