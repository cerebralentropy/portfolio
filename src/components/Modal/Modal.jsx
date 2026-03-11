import "./Modal.css"
import { CircleX } from "lucide-react";

export default function Modal ({ project, onClose }) {
    return(
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-panel" onClick={e => e.stopPropagation()}>

                <div className="modal-header">
                    <div className="modal-title-wrap">
                        <div className="modal-title">{project.title}</div>
                        <div className="modal-subtitle">Project Details</div>
                    </div>
                    <div className="modal-close" onClick={onClose}><CircleX /></div>
                </div>

                <div className="modal-body">
                    <div className="modal-hero">
                        <div className={"modal-hero-wrapper"}></div>
                    </div>

                    <div className="modal-content">
                        <div>
                            <div className="modal-section-title">Overview</div>
                            <p className="modal-text">Longer project description goes here.</p>
                        </div>

                        <div>
                            <div className="modal-section-title">Tools</div>
                            <div className="modal-tags">
                                <span className="modal-tag">React</span>
                                <span className="modal-tag">Vite</span>
                                <span className="modal-tag">CSS</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
