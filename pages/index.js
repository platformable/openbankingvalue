import React,{useContext} from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Layout from '../components/Layout'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {useAppContext}from '../context/userContext'
import { ValueContext } from '../context/valueContext'


export default function Home() {


  const router = useRouter()
 const [user,setUser]=useContext(ValueContext)

function handleValue(value,url){
setUser({...user,selectedTypeOfValue:value})
router.push(url)
}


  return (
    <Layout>
      <Head>
        <title>Platformable Value Generated Tool</title>
        <meta name="description" content="Platformable Value Generated Tool" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="text-gray-600 body-font bg-gray-50">
  <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
    <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
      <h1 className="title-font sm:text-4xl text-3xl mb-4 font-black ">Open Banking Value Tool
     
      </h1>
      <p className="mb-8 leading-relaxed">What evidence do we have that open banking is creating benefits for the banks that open APIs?</p>
      <div className="flex justify-center"> 
      <button className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <Link href="/tool" >Learn More</Link>
        </button>
      </div>
    </div>
    <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
      <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600"/>
    </div>
  </div>
</section>

<section className="home-select-region">

<div className="container mx-auto px-6 p-6 bg-white dark:bg-gray-800">
    <div className="mb-16 text-center">
        <h2 className="text-base text-russian-violet-500 font-semibold tracking-wide ">
            Select 
        </h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Type of value 
        </p>
      
       
    </div>
    <div className="flex flex-wrap my-12 dark:text-white">
        <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                    All 
                </div>
            </div>
            {/* <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, omnis?
            </p> */}
            <div className="flex justify-center mt-2">
            <button 
            onClick={()=>handleValue("All","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >
        <a>Learn More</a>
        </button>
            </div>
        </div>
        <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                    Portfolio enhacement
                </div>
            </div>
           {/*  <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptas, cupiditate.
            </p> */}
            <div className="flex justify-center  mt-2">
            <button 
            onClick={()=>handleValue("Portfolio enhacement","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg" >
        <a>Learn More</a>
        </button>
            </div>
        </div>
        <div className="w-full border-b md:w-1/2 md:border-r lg:w-1/3 lg:border-r-0 p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                Portfolio expansion
                </div>
            </div>
            {/* <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repellendus aperiam dolore, ut atque harum beatae.
            </p> */}
            <div className="flex justify-center mt-2">
            <button 
            onClick={()=>handleValue("Portfolio expansion","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <a>Learn More</a>
        </button>
            </div>
        </div>
        <div className="w-full border-b md:w-1/2 lg:w-1/3 lg:border-r lg:border-b-0 p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                    Efficiency enhacement
                </div>
            </div>
            {/* <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Necessitatibus pariatur aut tenetur sed illo ipsum cumque nesciunt delectus! Maxime, eos!
            </p> */}
            <div className="flex justify-center mt-2">
            <button 
            onClick={()=>handleValue("Efficiency enhacement","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <a>Learn More</a>
        </button>
            </div>
        </div>
        <div className="w-full border-b md:w-1/2 md:border-r md:border-b-0 lg:w-1/3 lg:border-b-0 p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                    Network optimization
                </div>
            </div>
      {/*       <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, debitis aut.
            </p> */}
            <div className="flex justify-center mt-2">
            <button 
             onClick={()=>handleValue("Network optimization","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <a>Learn More</a>
        </button>
            </div>
        </div>
        <div className="w-full md:w-1/2 lg:w-1/3 p-8">
            <div className="flex items-center justify-center mb-6">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6 text-russian-violet-500" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
                <div className="ml-4 text-xl">
                    Revenue generation or cost reduction
                </div>
            </div>
            {/* <p className="leading-loose text-gray-500 dark:text-gray-200 text-md">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi esse mollitia quod.
            </p> */}
            <div className="flex justify-center mt-2">
            <button 
            onClick={()=>handleValue("Revenue generation or cost reduction","/tool")}
            className="inline-flex text-white bg-btn-russian-violet border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
        <a>Learn More</a>
        </button>
            </div>
        </div>
    </div>
</div>
</section>

      
<section className="container mx-auto flex justify-center my-5">
      <footer className={styles.footer}>
        <a
          href="https://platformable.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="https://platformable.com/static/5319a443d00bd1eee2efee3fa63ac32c/bc86d/logo.webp" alt="Platformable Logo" width={125} height={21} />
          </span>
        </a>
      </footer>
      </section>
    </Layout>
    
  )
}
