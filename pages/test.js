import React,{useContext} from 'react'
import Layout from '../components/Layout'
import { ValueContext } from '../context/valueContext'

export default function test() {
    const [user,setUser]=useContext(ValueContext)
console.log(user)
    return (
        <div>
            <Layout>
                <h3>Favorites</h3>
                {user.favorites.map((item,index)=>{
                    return (item.id)
                })}
            </Layout>    
        </div>
    )
}
