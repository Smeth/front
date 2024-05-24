const NoTableData = ({ data }: {data: any[]}) => {
    if(data && data.length <= 0) {
       return <div className="w-full border border-dark-600 p-8 text-white text-center">Aucune donnée à afficher</div>
    }
    return <></>
}

export default NoTableData