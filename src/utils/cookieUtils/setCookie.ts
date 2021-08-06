type TSetCookieProps = {
  expires?: number | string;
  path?: string;
} & { [key: string]: string | number | boolean };

export const setCookie = (
  name: string,
  value: string | number | boolean | null,
  props?: TSetCookieProps
): void => {
  props = {
    path: "/",
    ...props,
  };

  let exp = props.expires;

  const d = new Date();

  if (typeof exp == "number" && exp) {
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = Number(d);
  }

  if (exp && d.toUTCString) {
    props.expires = d.toUTCString();
  }

  value = value ? encodeURIComponent(value) : null;

  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;

    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
};
