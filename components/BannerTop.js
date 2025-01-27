import Link from "next/link";
import styles from "../styles/Home.module.css";


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

  export default BannerTop;