import slugify from 'slugify';


const generateSlug = (toggle, name, BHKconfig, propertyType, availableFor, city, id) => {

    if (toggle === 'Project') {
        return slugify(`${id}-${name} for ${availableFor} in ${city}`, {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
          });
      } else {
        return slugify(
          `${id}-${BHKconfig}Bhk ${propertyType} for ${availableFor} in ${city}`
          , {
            lower: true,
            remove: /[*+~.()'"!:@]/g,
          });
      }
}

export default generateSlug;