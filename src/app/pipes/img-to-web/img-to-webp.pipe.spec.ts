import {ImgToWebpPipe} from './img-to-webp.pipe';

describe('ImgToWebpPipe', () => {
  let pipe: ImgToWebpPipe;

  beforeEach(() => {
    pipe = new ImgToWebpPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it("The function changeImgExtension() is meant to alter the string's extension to webp", () => {
    const name = 'alcon.png';

    expect(pipe.transform(name)).toEqual('alcon.webp');
  });
});
