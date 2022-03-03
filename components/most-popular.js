import { useRouter } from "next/router"

export default function mostPopular({  }) {

    const router = useRouter();
    const currentLink = router.asPath.replace('/', '');

    return (
        <p className={`absolute flex flex-wrap items-center justify-center px-4 py-2 font-light text-center transform -translate-x-1/2 rounded-full  max-w-40 -top-8 left-1/2 text-2xs bg-secondary-light text-secondary-dark ${currentLink !== "internet-marketing" ? 'xl:w-4/5' : ''}`}>
            <img className="block mx-auto xl:mx-0 lg:-mt-1 lg:inline-block" src="images/icon-star.svg" width={15} height={18} alt="Most Popular" />
            {currentLink !== "internet-marketing" &&
                <span className="hidden xl:ml-2 xl:inline-block">Most Popular!</span>
            }
        </p>
    )
}