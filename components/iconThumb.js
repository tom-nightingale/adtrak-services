export default function iconThumb({ outcome }) {
    return (
        <div className={`inline-flex rounded-full justify-center px-4 py-2 bg-${outcome} border border-opacity-50 border-${outcome}-dark`}>
            <img className="" src={`images/icon-thumb-${outcome}.svg`} width={11} height={30} alt={outcome} />
            <span className={`ml-2 ${(outcome == "positive" ? "" : "text-white")}`}>{(outcome == "positive" ? "Yes" : "No")}</span>
        </div>
    )
}