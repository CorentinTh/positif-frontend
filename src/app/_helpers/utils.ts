export class Utils {

  static serialize(o: Object): String {
    const str = [];
    for (const p in o)
      if (o.hasOwnProperty(p)) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(o[p]));
      }
    return str.join("&");
  }
}
