import { NavLink } from "react-router-dom";

export const linkifyOptions = {
  tagName: {
    mention: () => NavLink,
    hashtag: () => NavLink,
  },
  attributes: (href, type) => {
    if (type === "mention") {
      return {
        to: "/" + href.substring(1),
      };
    }
    if (type === "hashtag") {
      return {
        to: "/explore/tags/" + href.substring(1),
      };
    }
    return {};
  },
};
