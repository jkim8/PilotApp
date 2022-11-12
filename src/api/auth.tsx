const VALIDATIONCODE = '123';

export const validationCheck = (validationCode: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (validationCode === VALIDATIONCODE) {
        resolve(validationCode);
      } else {
        reject('The ValidationCoded is wrong.');
      }
    }, 1000);
  });
};
