import { useMatches } from "react-router-dom";

function Breadcrumbs() {
  let matches = useMatches();
  let crumbs = matches.filter((match) => Boolean(match.handle?.crumb)).map((match) => { return match.handle?.crumb()});

  return (
    <ol>
      {crumbs.map((crumb, index) => {
        return <li key={index}>{crumb}</li>
      })}
    </ol>
  );
}

export default Breadcrumbs;