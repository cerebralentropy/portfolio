import "./Card.css"
import { iconMap } from "../../data/iconMap";

export default function Card({ project, onMoreInfo, small=false }) {
    const Icon = iconMap[project.image];
    return(
        <div className={small ? "card card-small" : "card"}>
            <div className="card-title">
                { project.title }
            </div>
            <div className="card-hero">
                <div className="card-hero-img">
                    <Icon />
                </div>
            </div>
            <div className="card-desc">
                {project.desc}
            </div>
            <div className="card-button" onClick={() => onMoreInfo(project)}>
                More Info
            </div>
        </div>
    );
}
