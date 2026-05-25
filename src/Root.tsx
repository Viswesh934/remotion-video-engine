import "./index.css";
import { Composition } from "remotion";
import { ModernSearchDemo } from "./compositions/ModernSearchDemo";
import { FetchVsAxios } from "./compositions/FetchVsAxios";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="FetchVsAxios"
        component={FetchVsAxios}
        durationInFrames={10800}
        fps={30}
        width={1920}
        height={1080}
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
