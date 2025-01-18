import EventList from "../components/Home/EventList"
import Footer from "../components/Home/footer"
import Intro from "../components/Home/intro"
import Navbar from "../components/Home/navbar"
import Testimonials from "../components/Home/Testimonial"
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
           <div>
            <EventList/>
           </div>
           <div>
            <Testimonials/>
           </div>
           
           <Footer/>
        </div>
    )
}

export default HomePage