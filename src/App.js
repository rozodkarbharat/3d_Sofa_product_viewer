import { Canvas } from "@react-three/fiber";
import { Stage, PresentationControls, PerspectiveCamera } from "@react-three/drei";
import { useEffect, useState } from "react";
import { TextureLoader } from 'three'; // For loading textures

import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';


function Model(props){
  // const fbx = useLoader(FBXLoader, '/cheapsetsofa.fbx');  // Replace with the correct path

  const obj = useLoader(OBJLoader, '/sofaobj.obj')
  const texture = useLoader(TextureLoader, "/texture.avif"); // Pass texture URL
  
  
  useEffect(() => {
    if (obj && texture) {
      obj.traverse((child) => {
        if (child.isMesh) {
          console.log(child.name ,'child')
          // if(child.name== "Sofa_seat005"){
          //   child.material.color.set("red");
          // }
          // else if(child.name == "default051"){
          //   child.material.color.set("green");
          // }
            // else{
            console.log(child.name,'name')
            child.material.color.set("lightgray");
            child.material.map = texture; 
            child.material.needsUpdate = true; 

          // }
        }
      });
    }
  }, []); 

  return <primitive object={obj} {...props} />
}

function App() {
  const [zoom, setzoom] = useState(0.1)

  useEffect(() => {
    const handleWheel = (event) => {
      console.log(event,'scroll')
      if(event.deltaY >0){
        setzoom((prev)=>prev+0.01)
      }
      else{
        setzoom((prev)=>prev - 0.01)
      }
    };

    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, []); 

  return (
    <div className="App">
      <Canvas dpr={[1,2]} shadows camera={{fav:1.5}} style={{position:"relative", height:"100vh", overflow:"scroll"}} >
      <PerspectiveCamera manual />
        <color attach={"background"} args={["black"]} />
        <PresentationControls polar={[0.2, Math.PI/4]} >
        <Stage environment={null}>
          <Model scale = {zoom} colors={{seat: '#f0a0a0',
          back: '#a0f0a0',
          arm: '#a0a0f0',
          default: '#ffffff'}} />
        </Stage>
    
        </PresentationControls>
      </Canvas>
      
    </div>
  );
}

export default App;
