import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";


const Home = () => {


    enum categoryEnum {
        computer='computer',
        sport='sport'
      }

      type ItemsArray ={
        id: number;
        title: string;
        category: categoryEnum;
      }
    
      const itemArray =[
        {
          id:1,
          title:'computer',
          category:categoryEnum.computer,
        },
        {
          id:2,
          title:'monitor',
          category:categoryEnum.computer,
        },
        {
          id:3,
          title:'bike',
          category:categoryEnum.sport,
        },
        {
          id:4,
          title:'ball',
          category:categoryEnum.sport,
        }
      ]

     

      const [items, setItems] = useState(itemArray)
      const [filterParams, setFilterParams] = useSearchParams()   
      const [filteredItemsState, setFilteredItemsState] = useState<ItemsArray[]|null>(items)    
      const inputRef = useRef<HTMLInputElement>(null)
     
    
     

      const filterByCheckbox= (e: React.ChangeEvent<HTMLInputElement>)=>{
        const inputCategory = e.target.name
      
        setFilterParams(prev=>{

            if(!filterParams.getAll('category').includes(inputCategory)){     
                prev.append('category', inputCategory)
            }else{
              
                const existingValuesForCategory = prev.getAll('category');
                const filteredValuesForCategory = existingValuesForCategory.filter(val=>val!=inputCategory)
                prev.delete('category')
                filteredValuesForCategory.forEach(val=>prev.append('category', val))
            }
            
            return prev
  
        },{replace:true})

      }


      const filterByTextFunc = (e: React.ChangeEvent<HTMLInputElement>)=>{
      
       
  
        setFilterParams(prev=>{

          if(e.target.value==''){            
              prev.delete('text')
                         
          }else{
            const allCategories = prev.getAll('category')
            prev.delete('category')
            allCategories.forEach(category=>prev.append('category', category))
            prev.delete('text')
            prev.append('text', e.target.value)
          }
       
          return prev
        },{replace:true})
      }

   

      useEffect(()=>{
         const textFilter = filterParams.get('text')
         const filteredByText = textFilter? items.filter(item=>item.title.toLowerCase().includes(textFilter.toLowerCase())):items

        const allItemCategory = filterParams.getAll('category')
        const filteredItems = allItemCategory.length? filteredByText.filter(item=>allItemCategory.includes(item.category)):filteredByText

        setFilteredItemsState(filteredItems)
        
      },[filterParams])

      
      
     

      useEffect(()=>{
        const textFilter = filterParams.get('text')
        console.log(textFilter)
        if (inputRef.current) {
          inputRef.current.value = textFilter || '';  
        }
       
     },[])



     

  return (
    <main>

      <div className="topbar">

        {/* <label htmlFor="inputText">Search by title</label> */}
        <input ref={inputRef} type="text" onChange={filterByTextFunc} placeholder="search by title" id="inputText"/>  
        <label htmlFor="computerItem">Technology items</label>
        <input onChange={filterByCheckbox} type="checkbox" checked={filterParams.getAll('category').includes(categoryEnum.computer)} name={categoryEnum.computer} id="computerItem" />
        <label htmlFor="sportItem">Sport Gear</label>
        <input onChange={filterByCheckbox} type="checkbox" checked={filterParams.getAll('category').includes(categoryEnum.sport)} name={categoryEnum.sport} id="sportItem" />

      </div>

      <section className="itemsWrapper">
   
        <h2>List of items</h2>
        <ul>
          {filteredItemsState?.map(item=>(
            <li key={item.id}>{item.title}</li>
          ))}
        </ul>

      </section>

    </main>
  )
}

export default Home