import { ProjectItem } from "@/interfaces/project";

function PreviewByArea({ project }: { project: ProjectItem }) {
  return (
    <div>
      {Object.keys(project?.byArea || {}).map((key) => {
        return (
          <div className="flex justify-between items-center px-3 py-2 bg-green-50 text-sm">
            <p className="capitalize">{key}</p>
            <p>{project.byArea![key].length} Tree</p>
          </div>
        );
      })}
    </div>
  );
}

export default PreviewByArea;
