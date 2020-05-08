import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICES } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: string): any {
    // console.log(type);
    let url = URL_SERVICES + '/images';
    if (!img){
      return url + '/users/xxx';
    }
    if ( img.indexOf('https') >= 0 ){
      return img;
    }
    switch (type){

      case 'user':
        url += '/users/' + img;
        break;
      case 'medic':
        url += '/medics/' + img;
        break;
      case 'hospital':
        url += '/hospitals/' + img;
        break;

      default: // console.log('tipo de imagen inexistente');
               url += '/users/xxx';
    }
    // console.log(url);
    return url;
  }

}
