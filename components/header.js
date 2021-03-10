import Container from './container'
import { Image } from "react-datocms";

export default function Header({ heroImage }) {
    return (
        <header className="relative overflow-hidden bg-secondary-dark">
            
            <div className="absolute top-0 left-0 w-full h-full opacity-10 lg:w-2/5">
                <Image className="" data={heroImage} /> 
            </div>
            
            <Container>
                <img className="max-w-24" src="images/adtrak-logo.svg" width={160} height={35} alt="Adtrak Media Limited" /> 
            </Container>            
            
        </header>
    )
}