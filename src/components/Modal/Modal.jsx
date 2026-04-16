import "./Modal.css"
import { CircleX } from "lucide-react";

export default function Modal ({ project, onClose }) {
    return(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-panel" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <div className="modal-title-wrap">
                        <div className="modal-title">{project.title}</div>
                        <div className="modal-subtitle">{project.desc}</div>
                    </div>
                    <div className="modal-close" onClick={onClose}><CircleX /></div>
                </div>

                <div className="modal-body">
                    <div className="modal-hero">
                        <div className="modal-hero-wrapper">
                            {project.link ? (
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    <img src={project.image} alt={project.title} />
                                </a>
                            ):(
                                <img src={project.image} alt={project.title} />
                            )}
                        </div>
                    </div>

                    <div className="modal-content">
                        <div>
                            <div className="modal-section-title">Overview</div>
                            <p className="modal-text">{project.about}</p>
                        </div>

                        <div>
                            <div className="modal-section-title">Tools</div>
                            <div className="modal-tags">
                                {project.tools?.map((tool, index) => (
                                    <span key={index} className="modal-tag">{tool}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
