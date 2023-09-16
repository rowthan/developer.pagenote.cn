import {useEffect, useRef} from 'react';
import { fabric } from 'fabric';
import { useRouter } from 'next/router';
import useDeveloperKeyValue from 'hooks/useDeveloperKeyValue';
import useSnapshots from 'hooks/useSnapshots';
import { Canvas } from 'fabric/fabric-impl';

interface ScreenInfo {
    hasNextScreen: boolean,
    success: boolean,
    remainingPixels: number,
    startY: number,
    endY: number,
    width: number
    height: number
    image: string
}

export default function Page() {
    const canvasEl = useRef<HTMLCanvasElement>(null);
    const router = useRouter()
    const keys = router.query?.keys?.toString().split(',');
    const [images=[]] = useSnapshots(keys)
    const refCanvas = useRef<Canvas>(null)

    function run() {
        const canvas = refCanvas.current;
        for (var i = 0; i < images.length; i++) {
            const image = images[i];

          fabric.Image.fromURL("https://avatars.githubusercontent.com/u/3284833?s=80&v=4" ||image?.url || '', function(img) {
            img.set({
              left: 0,
              top: 0,
              angle: 0, //fabric.util.getRandomInt(0, 90),
            });
    
            img.perPixelTargetFind = true;
            img.hasControls = img.hasBorders = false;
            img.crossOrigin = 'anonymous';


            // img.scale(fabric.util.getRandomInt(50, 100) / 100);

            canvas.add(img);
          },
          // { crossOrigin: '' }
          );
        }
    }
    
    function init(){
      var canvas =  new fabric.Canvas(canvasEl.current, {
        hoverCursor: 'pointer',
        selection: false,
        targetFindTolerance: 2
      });
  
      canvas.on('object:moving',function(e) {
          if(e.target){
            e.target.opacity = 0.5;
          }
        }
      );
      canvas.on('object:modified', function(e) {
        if(e.target){
          e.target.opacity = 1;
        }
      })
      refCanvas?.current = canvas;
    }


    useEffect(function(){
      init();
    },[])
    useEffect(function () {
        if(images.length){
            run()
        }
    },[images])

    const lastImage = images[images.length-1];
    const width =  1200; //window.innerWidth;
    const height = 600; // window.innerHeight // (lastImage?.startY + lastImage?.height )|| 
    return(
      <div className='m-auto max-w-[1200px]'>
          <canvas  width={width} height={height} ref={canvasEl}/>
      </div>
  )
}
