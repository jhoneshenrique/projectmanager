import Message from "../layout/Message";

import {useLocation} from 'react-router-dom';

import {useState, useEffect} from 'react'

import styles from './Projects.module.css'

import Container from '../layout/Container'
import LinkButton from "../layout/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";

function Projects(){
    //fetch data from the db
    const[projects, setProjects] = useState([]);
    //State do Loading
    const[removeLoading, setRemoveLoading] = useState(false)
    //Message state
    const[projectMessage, setProjectMessage] = useState('');

    const location = useLocation()
    let message = '';
    if(location.state){
        message = location.state.message
    }

    useEffect(()=>{
        //This is in order to test the loading componenet
        setTimeout(
            ()=>{
                fetch('http://localhost:5000/projects',{
            method: 'GET',
            headers: {
                'content-type':'application/json'
            }
        }).then(resp => resp.json())
          .then(data => {
            console.log(data)
            setProjects(data); 
            setRemoveLoading(true);
          }).catch((err) => console.log(err))
            },300
        )
    },[])

    function removeProject(id){
        fetch(`http://localhost:5000/projects/${id}`,{
            method: 'DELETE',
            headers: {
                'Content-Type':'application/json'
            }
        }).then(resp => resp.json())
           .then(data =>{
               setProjects(projects.filter((project)=>project.id !== id))
               setProjectMessage('Projeto removido com sucesso!')
           })
          .catch( err => console.log(err))
    }

    return (
        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButton to="/newproject" text="Criar Projeto"/>
            </div>
            {message && <Message type="success" msg={message} />}
            {projectMessage && <Message type="success" msg={projectMessage} />}
            <Container customClass="start">
                {projects.length > 0 && (
                    projects.map((project)=> (
                        <ProjectCard name={project.name}
                                      id={project.id}
                                      budget={project.budget} 
                                      category={project.category.name}
                                      key={project.id}
                                      handleRemove={removeProject}
                        />
                    ))
                )}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados</p>
                )}
            </Container>
        </div>
    )
}

export default Projects;