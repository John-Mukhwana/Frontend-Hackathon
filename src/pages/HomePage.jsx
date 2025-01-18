import Intro from "../components/Home/intro"
import Navbar from "../components/Home/navbar"
import WhyChooseUs from "../components/Home/whyUs"



const HomePage = () => {
    return (
        <div className=" md:mx-auto overflow-hidden">
           <Navbar/>
           <div>
            <Intro/>
           </div>
           <div>
            <WhyChooseUs/>
           </div>
        </div>
    )
}

export default HomePage