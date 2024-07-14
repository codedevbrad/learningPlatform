
import Header from "@editorjs/header";

class CustomHeader extends Header {
    render(settings) {
      const wrapper = super.render(settings);
      const level = this.data.level || this.defaultLevel;
  
      let tailwindClasses = '';
      switch (level) {
        case 1:
          tailwindClasses = 'text-4xl font-bold';
          break;
        case 2:
          tailwindClasses = 'text-3xl font-bold';
          break;
        case 3:
          tailwindClasses = 'text-2xl font-bold';
          break;
        case 4:
          tailwindClasses = 'text-xl font-bold';
          break;
        case 5:
          tailwindClasses = 'text-lg font-bold';
          break;
        case 6:
          tailwindClasses = 'text-md font-bold';
          break;
        default:
          tailwindClasses = 'text-lg font-bold';
          break;
      }
  
      tailwindClasses.split(' ').forEach(cls => wrapper.classList.add(cls));
  
      return wrapper;
    }
  }
  export default CustomHeader; 