import { useState } from 'react'
import './styles/App.css'

import Card from './components/Card/Card'
import Carousel from './components/Carousel/Carousel.jsx'
import Modal from './components/Modal/Modal'

import projects from './data/projects.json'

function App() {
    const [activeProject, setActiveProject] = useState(null);
    return(
        <div id='container'>
            <header>
                <div className='title'>
                    Juan Melara
                </div>
                <div className='subtitle'>
                    Creative Technologist
                </div>
            </header>
             <Carousel>
            {/*<div className='carousel'>*/}
                {projects.map(project => (
                    <Card
                        key={project.title}
                        project={project}
                        onMoreInfo={setActiveProject}
                        // small={true}
                    />
                ))}
            {/*</div>*/}
             </Carousel>
            <footer>
                <div>
                    This portfolio is actively evolving.
                    Additional projects and detailed case studies will be added soon.
                </div>
                <div>
                    © {new Date().getFullYear()} Juan Melara • Built with React, Vite, and modern CSS
                </div>
            </footer>
            {activeProject && (
                <Modal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </div>
    );
}

export default App
