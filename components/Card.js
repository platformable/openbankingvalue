import React from 'react';

const Card = ({content,user}) => {



  const {selectedTypeOfValue} = user
 

    return (
      <>
     
      {content.length===0 ? <section className="container mx-auto"><h3 className="text-center font-black text-4xl my-5">No values registered</h3></section> : 
    
      <section className="text-gray-600 body-font cards">
            
        <div className="container py-10 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs  tracking-widest font-medium title-font mb-1 text-gray-900">Value example</h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-russian-violet-500">{selectedTypeOfValue}</h1>
          </div>
          <div className="flex flex-wrap -m-4">
              {content.map((item,index)=>{
                  return (
                <div className="p-4 md:w-1/3" key={index}>
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <div className="w-8 h-8 mr-3 inline-flex items-center justify-center rounded-full bg-btn-russian-violet text-white flex-shrink-0">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                        <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                      </svg>
                      
                    </div>
                    <h2 className="text-gray-900 text-lg title-font font-medium">{selectedTypeOfValue}</h2>
                 {'  '} <p>  </p>
                  </div>
                  <div className="flex-grow">
                  <p className="leading-relaxed text-sm break-words title-font">Data point: {item.fields['Data point'] =="" ? "numbers" : item.fields['Data point']}</p>
                    <p className="leading-relaxed text-sm break-words">{item.fields['Data point narrative']}</p>
                    <p className="mt-3 text-russian-violet-500 inline-flex items-center">Region: {item.fields['Region (from Country)']}</p>
                  </div>
              
                 {/*  <div><p className="block">{item.fields.Country}</p></div> */}
                 <div><a href={`${item.fields['Source link']}`} className="text-sm">Source Link</a></div>
                 {item.fields['Who benefits?'].map((ben,index)=>{
                    return(<li>Beneficiary: {ben}</li>)
                 })}
                 {
                   item.fields['ISO Country Code'].map((country,index)=>{
                     return(<span key={index} class="inline-block items-center ">{country}</span>)
                   })
                 }
              {/*    <div><p className="block text-sm">${item.fields['Who benefits?']}</p></div> */}
                
                </div>
              </div>
              )})
           
       }
   
          </div>
        </div>
      </section>
    }
        
    </>);
}

export default Card;
