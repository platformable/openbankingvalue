import Image from "next/image";
import heroImg from "../public/hero_image.svg";
import styles from "../styles/Home.module.css";
import Link from "next/link";
const BannerTop = () => {
  return (
    <section className={`${styles.bg_banner_top} py-5`}>
      <div className="container mx-auto text-white text-xl 2xl:text-3xl flex flex-col gap-y-5 lg:flex-row justify-between items-center">
        <img src="/banner_logo.svg" alt="Platformable data products" />
        <div className="max-md:text-center">
          <span className="mr-3 ">
            <strong>Want more open banking data?</strong>
          </span>
          <span>
            Subscribe to our <strong>Trends Reports</strong>
          </span>
        </div>
        <Link href="https://platformable.com/products/open-banking" target="_blank">
        <button className="bg-yellow shadow rounded-md px-10 py-2 text-xl text-[var(--purple-medium)]">
          Find out more
        </button>
        </Link>
      </div>
    </section>
  );
};
const Hero = () => {
  return (
    <>
      <BannerTop />
      <section className={styles.bg_hero}>
        <div className="container mx-auto flex lg:flex-row text-white flex-col items-center max-sm:pt-5 max-lg:pt-10">
          <div className="lg:flex-grow lg:w-1/2 lg:pr-24 lg:pr-16 flex flex-col lg:items-start lg:text-left mb-16 md:mb-0 items-center text-center text-[var(--purple-medium)]">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold ">
              Open Banking Value Tool
            </h1>
            <h2 className="mb-8 leading-relaxed text-2xl ">
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
              // width={350}
              // height={300}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
