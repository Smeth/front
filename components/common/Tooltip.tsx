const Tooltip = ({ title }: { title: string }) => {
    return (
        <div className="p-1">
            <span className="bg-dark-900 rounded-md py-2 px-3 text-grey-100 text-sm mb-2">{title}</span>
        </div>
    )
}

export default Tooltip