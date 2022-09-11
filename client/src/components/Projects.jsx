import { gql, useQuery } from '@apollo/client';

import ProjectCard from './ProjectCard';
import Spinner from './Spinner';

const GET_PROJECTS = gql`
  query GetProjects {
    projects {
      id
      name
      status
    }
  }
`;

function groupBy(objectArray, property) {
  return objectArray.reduce((acc, obj) => {
    const key = obj[property];
    acc[key] ??= [];
    acc[key].push(obj);
    return acc;
  }, {});
}

export default function Projects() {
  const { loading, error, data } = useQuery(GET_PROJECTS);

  if (loading) return <Spinner />;
  if (error) return <p>Error...</p>;
  if (data.projects.length < 0) return <p>No Projects</p>;

  const groupedProjects = groupBy(data.projects, 'status');

  return (
    <>
      {Object.entries(groupedProjects).map(([status, projects]) => (
        <div className="row" key={status}>
          <h3 className="text-center text-muted fst-italic mt-2">{status}</h3>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ))}
    </>
  );
}

export { GET_PROJECTS };
