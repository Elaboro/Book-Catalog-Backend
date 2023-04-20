
export const removeFieldDeleted = <T>(
  object: T & { deleted: Date }[]
  | T & { deleted: Date }
): (
  Omit<T[], "deleted">
  | Omit<T, "deleted">
) => {

  if(Array.isArray(object)) {
    return object.map((v: T & { deleted: Date }) => {
      delete v.deleted;
      return v;
    });
  }

  if(typeof object === "object") {
    delete object.deleted;
    return object;
  }

};
