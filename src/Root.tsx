import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";
import { LayoutDemo } from "./components/LayoutDemo";
import { ModernSearchDemo } from "./compositions/ModernSearchDemo";
import { SimpleTest } from "./compositions/SimpleTest";
import { MinimalDemo } from "./compositions/MinimalDemo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MinimalDemo"
        component={MinimalDemo}
        durationInFrames={180}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="SimpleTest"
        component={SimpleTest}
        durationInFrames={90}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="LayoutDemo"
        component={LayoutDemo}
        durationInFrames={90}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="ModernSearchDemo"
        component={ModernSearchDemo}
        durationInFrames={10800}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
