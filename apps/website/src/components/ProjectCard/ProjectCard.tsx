import React from "react";
import { projectCardStyles } from "./ProjectCard.styles";
import styles from "./ProjectCard.module.scss";

interface ProjectTag {
  tagName: string;
}

interface ProjectData {
  url: any;
  image?: string;
  title: string;
  status?: "active" | "completed";
  description: string;
  tags?: ProjectTag[];
  slug?: string;
}

interface ProjectCardProps {
  project: {
    id: string;
    data: ProjectData;
  };
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={`${projectCardStyles.card} ${styles.card}`}>
      {project.data.image && (
        <img
          src={project.data.image}
          alt={project.data.title}
          className={`${projectCardStyles.image} ${styles.card__image}`}
        />
      )}
      <div className={`${projectCardStyles.content} ${styles.card__content}`}>
        <div className={projectCardStyles.header}>
          <h3 className={projectCardStyles.title}>{project.data.title}</h3>
          {project.data.status && (
            <span
              className={`${projectCardStyles.statusBadge} ${
                project.data.status === "active"
                  ? projectCardStyles.statusActive
                  : projectCardStyles.statusCompleted
              }`}
            >
              {project.data.status === "active" ? "Activ" : "Finalizat"}
            </span>
          )}
        </div>
        <p className={projectCardStyles.description}>
          {project.data.description}
        </p>
        {project.data.tags && project.data.tags.length > 0 && (
          <div className={projectCardStyles.tagsContainer}>
            {project.data.tags.map((tag: ProjectTag, index: number) => (
              <span key={index} className={projectCardStyles.tag}>
                {tag.tagName}
              </span>
            ))}
          </div>
        )}
        <a
          href={`${project.data.url}`}
          className={`${projectCardStyles.link} ${styles.card__link}`}
        >
          Citește mai mult
          <svg
            className={projectCardStyles.linkIcon}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProjectCard;
