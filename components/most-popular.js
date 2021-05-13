export default function mostPopular({  }) {
    return (
        <p className="absolute flex flex-wrap items-center justify-center px-4 py-2 font-light text-center transform -translate-x-1/2 rounded-full xl:w-4/5 -top-4 left-1/2 text-2xs bg-secondary-light text-secondary-dark">
            <img className="block mx-auto xl:mx-0 xl:mr-2 lg:-mt-1 lg:inline-block" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
            <span className="hidden xl:inline-block">Most Popular!</span>
        </p>
    )
}