export const respJson = (code: number | string, message: string, data?: any) => {
  return Response.json({
    code: code,
    message: message,
    data: data,
  });
}

export const respData = (data: any) => {
  return respJson(0, "success", data || []);
}

export const respErr = (message: string) => {
  return respJson(-1, message);
}
