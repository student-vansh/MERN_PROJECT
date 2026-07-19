import React, { useEffect, useRef } from 'react'
import mermaid from "mermaid"

mermaid.initialize({
    startOnLoad:false,
    theme:"default",
})

const cleanMermaidChart = (diagram) =>{
    if(!diagram) return "";

    let clean = diagram.replace(/\r\n/g,"\n").trim();

    if(!clean.startsWith("graph")){
        clean = `graph TD\n${clean}`

    }
    return clean;
}

const autoFixBadNodes = (diagram)=>{
    let index =0;
    return diagram.replace(/\[(.*?)\]/g,(_,label)=>{
        index++;
        return `N${index}[${label}]`;
    });
};

const Mermaid = ({diagram}) => {
    const conatinerRef = useRef(null);

     useEffect(()=>{
        if(!diagram || !conatinerRef.current) return;

        const renderDiagram = async () =>{
            try {
                conatinerRef.current.innerHTML = "";

                const uniqueId = `mermaid-${Math.random().toString(36).substring(2,9)}`;

                const safeChart = autoFixBadNodes(cleanMermaidChart(diagram));

                const {svg} = await mermaid.render(uniqueId,safeChart);

                conatinerRef.current.innerHTML = svg;
            } catch(error) {
                console.error("Mermaid render Failed",error);
                
            }
        }
        renderDiagram();
     },[diagram]);    
  return (
    <div className='bg-white border rounded-lg p-4 overflow-x-auto'>
      <div ref={conatinerRef}>

      </div>
    </div>
  )
}

export default Mermaid
