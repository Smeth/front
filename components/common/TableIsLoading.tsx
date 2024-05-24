const TableIsLoading = ({ isLoading }: { isLoading: boolean }) => {
    if(isLoading) {
        return (
            <div className="w-full h-52 bg-dark-900"></div>
        )
    }
    return (
        <></>
    )
}

export default TableIsLoading