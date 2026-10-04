
// ------ BASE REQUEST ------
async function baseRequest(url, options, params) {
  if (!url) throw new Error("Url inválida");

  if (params){
    const queryParams = new URLSearchParams(params).toString();
    const connector = url.includes('?') ? '&' : '?';
    url = `${url}${connector}${queryParams}`;
  }

  const response = await fetch(url, options);
  if (!response.ok) throw new Error(`Error en la petición, estatus: ${response.status}`);
  return await response.json();
}


// ------ GET ------
export function get(url, { 
  params = null,
  customOptions = {}
} = {}){

  const options = {
    ...customOptions,
    method: "GET",
    headers: { 'Content-Type': 'application/json', ...(customOptions.headers || {}) }
  };
  
  return baseRequest(url, options, params);
}


// ------ POST ------
export function post(url, {
  body = null,
  customOptions = {} 
} = {}){

  const options = {
    ...customOptions,
    method: "POST",
    headers: { 'Content-Type': 'application/json', ...(customOptions.headers || {}) },
    ...(body && { body: JSON.stringify(body) }),
  };

  return baseRequest(url, options);
}
