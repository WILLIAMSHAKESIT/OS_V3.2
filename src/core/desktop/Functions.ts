import * as PIXI from "pixi.js";

//GET SPRITE
const loadSprite = (loader: PIXI.Loader, asset: any, name: string, textures: Boolean = false) => {
  let img: any = null;
  let imgarr: any = [];
  let sprite: any = null;
  if(textures){
    for(let sprite in loader.resources![`${asset}`].textures){
      const spritetexture = PIXI.Texture.from(sprite);
      imgarr.push(spritetexture);
    } 
    sprite = new PIXI.AnimatedSprite(imgarr);
    imgarr = [];
  }
  else{
    img = loader.resources![`${asset}`].textures![name];
    sprite = new PIXI.Sprite(img);
    img = null;
  }

  return sprite;
}

// SCALING SIZES
const scaleSizeFixedHeight = (height: number, sprite: PIXI.Sprite) => {
  const h = sprite.height;
  const w = sprite.width;

  return (w / h) * height;
}

const scaleSizeFixedWidth = (width: number, sprite: PIXI.Sprite) => {
  const h = sprite.height;
  const w = sprite.width;

  return (h / w) * width;
}

//RANDMON INT
const getRandomInt = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
}

const formatNumber = (number: any) => {
  let newnumber = number.toLocaleString("en-US");
  return newnumber;
}


export default {
  loadSprite,
  scaleSizeFixedHeight,
  scaleSizeFixedWidth,
  getRandomInt,
  formatNumber
}