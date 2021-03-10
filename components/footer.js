import Container from './container'

export default function Footer({ content }) {
    return (
        <footer className="text-center">
            <Container>

                <div className="max-w-md mx-auto my-24 text-center opacity-50" dangerouslySetInnerHTML={{ __html: content }} />
                
            </Container>
        </footer>
    )
}