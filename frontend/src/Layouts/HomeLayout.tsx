import Header from "../Components/Header"
import Hero from "../Components/Hero"
import Footer from "../Components/Footer";
import SearchBar from "../Components/SearchBar";

interface Props {
    children: React.ReactNode;
}

const HomeLayout = ({children}: Props)=>{
    return(
        <div className="flex flex-col min-h-screen">
            <Header />
            <Hero />
            <div className="container mx-auto">
                <SearchBar />
            </div>
            <div className="py-10 flex-1 container mx-auto">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default HomeLayout