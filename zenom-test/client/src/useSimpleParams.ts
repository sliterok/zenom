import { useParams } from "react-router";

export function useSimpleParams() {
  const params = Object.entries(useParams());
  let section, sectionValue;
  if (params.length) {
    [[section, sectionValue]] = params;
  }
  return { section, sectionValue };
}
