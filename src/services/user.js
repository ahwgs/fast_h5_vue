import request from "@/utils/request";

export const logout = () => {
  return request({
    url: "/user/logout",
    method: "post"
  });
};

export const resetToken = () => {
  return request({
    url: "/user/resetToken",
    method: "get"
  });
};
