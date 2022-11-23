const BASE_URL =
  'https://glborderpadserverapitest.azurewebsites.net/api/GLBOrderPads/SelectItemByNameRange?companySeq=5&searchStr=annie&viewCount=20&page=1';

export const baseURL = () => fetch(BASE_URL).then(response => response.json());
