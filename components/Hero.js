import Image from "next/image";
import heroImg from "../public/hero_image.svg";
import styles from "../styles/Home.module.css";
import BannerTop from "./BannerTop";

const Hero = () => {
  return (
    <>
      <BannerTop />
      <section className={styles.bg_hero}>
        <div className="container mx-auto flex lg:flex-row text-white flex-col items-center max-sm:pt-5 max-lg:pt-10">
          <div className="min-h-20 lg:flex-grow lg:w-1/2 lg:pr-24 lg:pr-16 flex flex-col lg:items-start lg:text-left mb-16 md:mb-0 items-center text-center text-[var(--purple-medium)]">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold ">
              Open Banking Value Tool
            </h1>
            <h2 className="md:mb-8  text-2xl no-italic">
              What evidence do we have that open banking is really creating
              impactful benefits for all stakeholders across the ecosystem?
            </h2>
            {/*   <div className="flex justify-center">
              <button className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                <Link href="/tool">Learn More</Link>
              </button>
            </div> */}
          </div>
          <div className="lg:w-3/6 flex justify-end">
            <Image
              src={heroImg}
              alt="Open Banking value tool schema"
              onLoadingComplete={img => console.log("image done loading", img)}
              priority={true}
              // defer={true}
              // width={650}
              // height={300}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
