import sharp from 'sharp';
import satori from 'satori';

import React from 'react';

async function getOptimizedFrame(frameComponent: React.ReactElement) {
  const jerseyFontResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH}/fonts/PlayfairDisplay-Regular.ttf`);
  const jerseyFont = await jerseyFontResponse.arrayBuffer();

  const svg = await satori(
    frameComponent,
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: 'Jersey20-Regular.ttf',
          data: jerseyFont,
          weight: 700,
          style: 'normal',
        },
      ],
    }
  );

  const svgBuffer = Buffer.from(svg);
  const png = sharp(svgBuffer).png();
  const response = await png.toBuffer();
  return response;
}

export default getOptimizedFrame;

