import AddClient from '../components/AddClient';
import AddProject from '../components/AddProject';
import Clients from '../components/Clients';
import Projects from '../components/Projects';

export default function Home() {
  return (
    <>
      <h1>Manage your projects</h1>
      <h2 className="text-center mt-5">Clients</h2>
      <div className="border border-secondary p-2">
        <AddClient />
        <Clients />
      </div>
      <h2 className="text-center mt-5">Projects</h2>
      <div className="border border-secondary p-2">
        <AddProject />
        <Projects />
      </div>
    </>
  );
}
