import { sanitizeKey, unsanitizeKey } from "./utils";

describe("utils", () => {
  it('sanitizeKey should replace "." with "@" ', async () => {
    expect(sanitizeKey("key")).toBe("key");
    expect(sanitizeKey("key.prop")).toBe("key@prop");
    expect(sanitizeKey("key.prop.subprop")).toBe("key@prop@subprop");
  });

  it('unsanitizeKey should replace "@" with "." ', async () => {
    expect(unsanitizeKey("key")).toBe("key");
    expect(unsanitizeKey("key@prop")).toBe("key.prop");
    expect(unsanitizeKey("key@prop@subprop")).toBe("key.prop.subprop");
  });
});
