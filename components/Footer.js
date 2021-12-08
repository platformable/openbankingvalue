import React from 'react'
import Image from "next/image";

export default function Footer() {
    return (
        <section className="py-5 bg-gray-200">
        <footer className="container mx-auto flex justify-center">
          <a
            href="https://platformable.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{" "}
            <span className="">
              <Image
                src="https://platformable.com/static/5319a443d00bd1eee2efee3fa63ac32c/bc86d/logo.webp"
                alt="Platformable Logo"
                width={125}
                height={21}
              />
            </span>
          </a>
        </footer>
      </section>
    )
}
