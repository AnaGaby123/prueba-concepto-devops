import {buildWebpImg} from '@appUtil/util';

describe('Build Webp Image', () => {
  it('Should returns image name with default directory', () => {
    const imgName = 'alcon';
    const newImgName = buildWebpImg(imgName, false);

    expect(newImgName).toEqual(`assets/Images/alcon.webp`);
  });

  it('Should returns image hover name with default directory', () => {
    const imgName = 'alcon';
    const newImgName = buildWebpImg(imgName, true);

    expect(newImgName).toEqual(`assets/Images/alcon_hover.webp`);
  });

  it('Should returns image name with a custom directory', () => {
    const newImgName = buildWebpImg('alcon', false, 'logos');

    expect(newImgName).toEqual(`assets/Images/logos/alcon.webp`);
  });

  it('Should returns image hover name with a custom directory', () => {
    const newImgName = buildWebpImg('alcon', true, 'logos');

    expect(newImgName).toEqual(`assets/Images/logos/alcon_hover.webp`);
  });
});
