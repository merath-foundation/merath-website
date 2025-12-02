import { useEffect, useState } from 'react';
import { sanityClient, isSanityConfigured } from '../lib/sanity';
import type { Project } from '../data/projects';

export function useSanityProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      if (!isSanityConfigured()) {
        // Fallback to static data if Sanity is not configured
        const { projects: staticProjects } = await import('../data/projects');
        setProjects(staticProjects);
        setLoading(false);
        return;
      }

      try {
        const query = `*[_type == "project"] | order(publishedAt desc) {
          "id": id.current,
          title,
          type,
          year,
          "image": image.asset->url,
          overview,
          approach,
          outcomes
        }`;
        
        const data = await sanityClient.fetch<Project[]>(query);
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects from Sanity:', err);
        // Fallback to static data on error
        const { projects: staticProjects } = await import('../data/projects');
        setProjects(staticProjects);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return { projects, loading, error };
}

export function useSanityProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProject() {
      if (!id) {
        setLoading(false);
        return;
      }

      if (!isSanityConfigured()) {
        // Fallback to static data
        const { projects: staticProjects } = await import('../data/projects');
        const found = staticProjects.find(p => p.id === id);
        setProject(found || null);
        setLoading(false);
        return;
      }

      try {
        const query = `*[_type == "project" && id.current == $id][0] {
          "id": id.current,
          title,
          type,
          year,
          "image": image.asset->url,
          overview,
          approach,
          outcomes
        }`;
        
        const data = await sanityClient.fetch<Project>(query, { id });
        setProject(data);
      } catch (err) {
        console.error('Error fetching project from Sanity:', err);
        // Fallback to static data on error
        const { projects: staticProjects } = await import('../data/projects');
        const found = staticProjects.find(p => p.id === id);
        setProject(found || null);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id]);

  return { project, loading, error };
}
