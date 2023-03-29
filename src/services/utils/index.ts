export const GetApiBaseUrl = (apiType: string): string | undefined => {
  let baseUrl;

  switch (apiType) {
    case "EMISSORES":
      baseUrl = process.env.NEXT_PUBLIC_URL_API_EMISS;
      break;
    case "ADM":
      baseUrl = process.env.NEXT_PUBLIC_URL_API_ADM_PROD;
      break;
    case "SAIBWEB":
      baseUrl = process.env.NEXT_PUBLIC_URL_API_SAIB;

      break;
    case "SAIBWEB1":
      baseUrl = process.env.NEXT_PUBLIC_URL_API_SAIB2;

      break;

    default:
      baseUrl = "";
      break;
  }

  return baseUrl;
};
