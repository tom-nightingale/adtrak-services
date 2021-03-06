import Link from 'next/link'


export default function fancyLink( {destination, a11yText, label, extraClasses} ) {
    return (
        <Link href={destination}>
            <a aria-label={a11yText} className={`p-4 text-white m-4 inline-block rounded-sm ${extraClasses}`}>
                {label}
            </a>
        </Link>
    )
}