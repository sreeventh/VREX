import { StandardReality, LostWorld } from "spacesvr";

export default function World() {
  return (
    <StandardReality>
      <LostWorld /> // an example world with a floor, skybox, and fog
    </StandardReality>
  );
}
