import Image from "next/image";
import heroImg from "../public/heroImg.png";
import styles from '../styles/Home.module.css'

const Hero = () => {
    return (
        <section className={styles.bg_hero}>
        <div className="container mx-auto flex px-5 py-24 md:flex-row text-white flex-col items-start">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 text-white font-bold">
              Open Banking Value Tool
            </h1>
            <p className="mb-8 leading-relaxed text-2xl">
            What evidence do we have that open banking is really creating impactful benefits for the different ecosystem’s stakeholders?
            </p>
            {/*   <div className="flex justify-center">
              <button className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                <Link href="/tool">Learn More</Link>
              </button>
            </div> */}
          </div>
          <div className="lg:max-w-lg lg:w-full">
            <Image src={heroImg} alt="OBV__OBV_tool_isometric" width={350} height={300}/>
          </div>
        </div>
      </section>
    )
}

export default Hero;