import MyTypeScriptElement from './my-element';

export const onInit = () => {
  console.log('My First Extension loaded');
};

// Export the element as default for Umbraco
export default MyTypeScriptElement;
