import {useEffect, useState} from 'react'

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css'

function ProjectForm({btnText}){
    const [categories, setCategories] = useState([]);

    //Stop React from fetching data in looping
   useEffect(()=>{
        //Request para a API
    fetch("http://localhost:5000/categories", {
        method: "GET",
        headers: {
            'Content-Type':'application/json'
        }
        }).then((resp)=>resp.json()) //Transform the data from the response into json
        .then((data)=>{  //Get the data to be used
            setCategories(data)
        })
        .catch((err)=> console.log(err))
   },[])

    return (
        <form className={styles.form}>
            <Input type="text" text="Nome do projeto" name="name" placeholder="Insira o nome do projeto"  />
            <Input type="number" text="Orçamento do projeto" name="budget" placeholder="Insira o orçamento total"  />
            <Select name="category_id" text="selecione a categoria" 
             options={categories}/>
            <SubmitButton text={btnText}/>
        </form>
    )
}

export default ProjectForm;