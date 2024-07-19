import styles from "../styles/Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <section
        // style={{ backgroundColor: "var(--purple-medium)" }}
        className={`${styles["bg-footer"]}  mx-auto text-white pt-11 pb-8 px-4 lg:flex lg:gap-2 justify-center items-start`}
      >
        <p>
          © This tool is developed and maintained by{' '}
          <img
            src="/platformable_logo_footer.png"
            alt="Platformable logo"
            className="inline-block drop-shadow"
          />
          {' '}
          <strong>Platformable.com</strong>
          <img
            src="/heart-fixed-icon.png"
            alt="pride heart icon"
            className="inline-block drop-shadow"
          />
          proudly based in Barcelona
        </p>
      </section>
      <div
        // style={{ backgroundColor: "var(--purple-medium)" }}
        className={` ${styles["bg-footer"]} text-white  flex flex-col justify-center items-center  pt-5 pb-8 border-t border-white border-solid`}
      >
        <Link href="#header">
          <div className="flex flex-col items-center gap-2">
            <img
              src="/arrow_collapse_top.svg"
              alt="arrow icon"
              className="cursor-pointer"
            />
            GO TO TOP
          </div>
        </Link>
      </div>
    </>
  );
}
