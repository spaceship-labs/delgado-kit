var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});

// node_modules/@sveltejs/kit/dist/install-fetch.js
var import_http = __toModule(require("http"));
var import_https = __toModule(require("https"));
var import_zlib = __toModule(require("zlib"));
var import_stream = __toModule(require("stream"));
var import_util = __toModule(require("util"));
var import_crypto = __toModule(require("crypto"));
var import_url = __toModule(require("url"));
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
var src = dataUriToBuffer;
var dataUriToBuffer$1 = src;
var { Readable } = import_stream.default;
var wm = new WeakMap();
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
var Blob = class {
  constructor(blobParts = [], options2 = {}) {
    let size = 0;
    const parts = blobParts.map((element) => {
      let buffer;
      if (element instanceof Buffer) {
        buffer = element;
      } else if (ArrayBuffer.isView(element)) {
        buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
      } else if (element instanceof ArrayBuffer) {
        buffer = Buffer.from(element);
      } else if (element instanceof Blob) {
        buffer = element;
      } else {
        buffer = Buffer.from(typeof element === "string" ? element : String(element));
      }
      size += buffer.length || buffer.size || 0;
      return buffer;
    });
    const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
    wm.set(this, {
      type: /[^\u0020-\u007E]/.test(type) ? "" : type,
      size,
      parts
    });
  }
  get size() {
    return wm.get(this).size;
  }
  get type() {
    return wm.get(this).type;
  }
  async text() {
    return Buffer.from(await this.arrayBuffer()).toString();
  }
  async arrayBuffer() {
    const data = new Uint8Array(this.size);
    let offset = 0;
    for await (const chunk of this.stream()) {
      data.set(chunk, offset);
      offset += chunk.length;
    }
    return data.buffer;
  }
  stream() {
    return Readable.from(read(wm.get(this).parts));
  }
  slice(start = 0, end = this.size, type = "") {
    const { size } = this;
    let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
    let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
    const span = Math.max(relativeEnd - relativeStart, 0);
    const parts = wm.get(this).parts.values();
    const blobParts = [];
    let added = 0;
    for (const part of parts) {
      const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
      if (relativeStart && size2 <= relativeStart) {
        relativeStart -= size2;
        relativeEnd -= size2;
      } else {
        const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
        blobParts.push(chunk);
        added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
        relativeStart = 0;
        if (added >= span) {
          break;
        }
      }
    }
    const blob = new Blob([], { type: String(type).toLowerCase() });
    Object.assign(wm.get(blob), { size: span, parts: blobParts });
    return blob;
  }
  get [Symbol.toStringTag]() {
    return "Blob";
  }
  static [Symbol.hasInstance](object) {
    return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
  }
};
Object.defineProperties(Blob.prototype, {
  size: { enumerable: true },
  type: { enumerable: true },
  slice: { enumerable: true }
});
var fetchBlob = Blob;
var Blob$1 = fetchBlob;
var FetchBaseError = class extends Error {
  constructor(message, type) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.type = type;
  }
  get name() {
    return this.constructor.name;
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
};
var FetchError = class extends FetchBaseError {
  constructor(message, type, systemError) {
    super(message, type);
    if (systemError) {
      this.code = this.errno = systemError.code;
      this.erroredSysCall = systemError.syscall;
    }
  }
};
var NAME = Symbol.toStringTag;
var isURLSearchParameters = (object) => {
  return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
};
var isBlob = (object) => {
  return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
};
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
var isAbortSignal = (object) => {
  return typeof object === "object" && object[NAME] === "AbortSignal";
};
var carriage = "\r\n";
var dashes = "-".repeat(2);
var carriageLength = Buffer.byteLength(carriage);
var getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
var getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
var INTERNALS$2 = Symbol("Body internals");
var Body = class {
  constructor(body, {
    size = 0
  } = {}) {
    let boundary = null;
    if (body === null) {
      body = null;
    } else if (isURLSearchParameters(body)) {
      body = Buffer.from(body.toString());
    } else if (isBlob(body))
      ;
    else if (Buffer.isBuffer(body))
      ;
    else if (import_util.types.isAnyArrayBuffer(body)) {
      body = Buffer.from(body);
    } else if (ArrayBuffer.isView(body)) {
      body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
    } else if (body instanceof import_stream.default)
      ;
    else if (isFormData(body)) {
      boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
      body = import_stream.default.Readable.from(formDataIterator(body, boundary));
    } else {
      body = Buffer.from(String(body));
    }
    this[INTERNALS$2] = {
      body,
      boundary,
      disturbed: false,
      error: null
    };
    this.size = size;
    if (body instanceof import_stream.default) {
      body.on("error", (err) => {
        const error3 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
        this[INTERNALS$2].error = error3;
      });
    }
  }
  get body() {
    return this[INTERNALS$2].body;
  }
  get bodyUsed() {
    return this[INTERNALS$2].disturbed;
  }
  async arrayBuffer() {
    const { buffer, byteOffset, byteLength } = await consumeBody(this);
    return buffer.slice(byteOffset, byteOffset + byteLength);
  }
  async blob() {
    const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
    const buf = await this.buffer();
    return new Blob$1([buf], {
      type: ct
    });
  }
  async json() {
    const buffer = await consumeBody(this);
    return JSON.parse(buffer.toString());
  }
  async text() {
    const buffer = await consumeBody(this);
    return buffer.toString();
  }
  buffer() {
    return consumeBody(this);
  }
};
Object.defineProperties(Body.prototype, {
  body: { enumerable: true },
  bodyUsed: { enumerable: true },
  arrayBuffer: { enumerable: true },
  blob: { enumerable: true },
  json: { enumerable: true },
  text: { enumerable: true }
});
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error3) {
    if (error3 instanceof FetchBaseError) {
      throw error3;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error3.message}`, "system", error3);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error3) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error3.message}`, "system", error3);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
var clone = (instance, highWaterMark) => {
  let p1;
  let p2;
  let { body } = instance;
  if (instance.bodyUsed) {
    throw new Error("cannot clone body after it is used");
  }
  if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
    p1 = new import_stream.PassThrough({ highWaterMark });
    p2 = new import_stream.PassThrough({ highWaterMark });
    body.pipe(p1);
    body.pipe(p2);
    instance[INTERNALS$2].body = p1;
    body = p2;
  }
  return body;
};
var extractContentType = (body, request) => {
  if (body === null) {
    return null;
  }
  if (typeof body === "string") {
    return "text/plain;charset=UTF-8";
  }
  if (isURLSearchParameters(body)) {
    return "application/x-www-form-urlencoded;charset=UTF-8";
  }
  if (isBlob(body)) {
    return body.type || null;
  }
  if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
    return null;
  }
  if (body && typeof body.getBoundary === "function") {
    return `multipart/form-data;boundary=${body.getBoundary()}`;
  }
  if (isFormData(body)) {
    return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
  }
  if (body instanceof import_stream.default) {
    return null;
  }
  return "text/plain;charset=UTF-8";
};
var getTotalBytes = (request) => {
  const { body } = request;
  if (body === null) {
    return 0;
  }
  if (isBlob(body)) {
    return body.size;
  }
  if (Buffer.isBuffer(body)) {
    return body.length;
  }
  if (body && typeof body.getLengthSync === "function") {
    return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
  }
  if (isFormData(body)) {
    return getFormDataLength(request[INTERNALS$2].boundary);
  }
  return null;
};
var writeToStream = (dest, { body }) => {
  if (body === null) {
    dest.end();
  } else if (isBlob(body)) {
    body.stream().pipe(dest);
  } else if (Buffer.isBuffer(body)) {
    dest.write(body);
    dest.end();
  } else {
    body.pipe(dest);
  }
};
var validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
  if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
    const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
    throw err;
  }
};
var validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
  if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
    const err = new TypeError(`Invalid character in header content ["${name}"]`);
    Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
    throw err;
  }
};
var Headers = class extends URLSearchParams {
  constructor(init2) {
    let result = [];
    if (init2 instanceof Headers) {
      const raw = init2.raw();
      for (const [name, values] of Object.entries(raw)) {
        result.push(...values.map((value) => [name, value]));
      }
    } else if (init2 == null)
      ;
    else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
      const method = init2[Symbol.iterator];
      if (method == null) {
        result.push(...Object.entries(init2));
      } else {
        if (typeof method !== "function") {
          throw new TypeError("Header pairs must be iterable");
        }
        result = [...init2].map((pair) => {
          if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
            throw new TypeError("Each header pair must be an iterable object");
          }
          return [...pair];
        }).map((pair) => {
          if (pair.length !== 2) {
            throw new TypeError("Each header pair must be a name/value tuple");
          }
          return [...pair];
        });
      }
    } else {
      throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
    }
    result = result.length > 0 ? result.map(([name, value]) => {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return [String(name).toLowerCase(), String(value)];
    }) : void 0;
    super(result);
    return new Proxy(this, {
      get(target, p, receiver) {
        switch (p) {
          case "append":
          case "set":
            return (name, value) => {
              validateHeaderName(name);
              validateHeaderValue(name, String(value));
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
            };
          case "delete":
          case "has":
          case "getAll":
            return (name) => {
              validateHeaderName(name);
              return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
            };
          case "keys":
            return () => {
              target.sort();
              return new Set(URLSearchParams.prototype.keys.call(target)).keys();
            };
          default:
            return Reflect.get(target, p, receiver);
        }
      }
    });
  }
  get [Symbol.toStringTag]() {
    return this.constructor.name;
  }
  toString() {
    return Object.prototype.toString.call(this);
  }
  get(name) {
    const values = this.getAll(name);
    if (values.length === 0) {
      return null;
    }
    let value = values.join(", ");
    if (/^content-encoding$/i.test(name)) {
      value = value.toLowerCase();
    }
    return value;
  }
  forEach(callback) {
    for (const name of this.keys()) {
      callback(this.get(name), name);
    }
  }
  *values() {
    for (const name of this.keys()) {
      yield this.get(name);
    }
  }
  *entries() {
    for (const name of this.keys()) {
      yield [name, this.get(name)];
    }
  }
  [Symbol.iterator]() {
    return this.entries();
  }
  raw() {
    return [...this.keys()].reduce((result, key) => {
      result[key] = this.getAll(key);
      return result;
    }, {});
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return [...this.keys()].reduce((result, key) => {
      const values = this.getAll(key);
      if (key === "host") {
        result[key] = values[0];
      } else {
        result[key] = values.length > 1 ? values : values[0];
      }
      return result;
    }, {});
  }
};
Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
  result[property] = { enumerable: true };
  return result;
}, {}));
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
var redirectStatus = new Set([301, 302, 303, 307, 308]);
var isRedirect = (code) => {
  return redirectStatus.has(code);
};
var INTERNALS$1 = Symbol("Response internals");
var Response = class extends Body {
  constructor(body = null, options2 = {}) {
    super(body, options2);
    const status = options2.status || 200;
    const headers = new Headers(options2.headers);
    if (body !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(body);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    this[INTERNALS$1] = {
      url: options2.url,
      status,
      statusText: options2.statusText || "",
      headers,
      counter: options2.counter,
      highWaterMark: options2.highWaterMark
    };
  }
  get url() {
    return this[INTERNALS$1].url || "";
  }
  get status() {
    return this[INTERNALS$1].status;
  }
  get ok() {
    return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
  }
  get redirected() {
    return this[INTERNALS$1].counter > 0;
  }
  get statusText() {
    return this[INTERNALS$1].statusText;
  }
  get headers() {
    return this[INTERNALS$1].headers;
  }
  get highWaterMark() {
    return this[INTERNALS$1].highWaterMark;
  }
  clone() {
    return new Response(clone(this, this.highWaterMark), {
      url: this.url,
      status: this.status,
      statusText: this.statusText,
      headers: this.headers,
      ok: this.ok,
      redirected: this.redirected,
      size: this.size
    });
  }
  static redirect(url, status = 302) {
    if (!isRedirect(status)) {
      throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
    }
    return new Response(null, {
      headers: {
        location: new URL(url).toString()
      },
      status
    });
  }
  get [Symbol.toStringTag]() {
    return "Response";
  }
};
Object.defineProperties(Response.prototype, {
  url: { enumerable: true },
  status: { enumerable: true },
  ok: { enumerable: true },
  redirected: { enumerable: true },
  statusText: { enumerable: true },
  headers: { enumerable: true },
  clone: { enumerable: true }
});
var getSearch = (parsedURL) => {
  if (parsedURL.search) {
    return parsedURL.search;
  }
  const lastOffset = parsedURL.href.length - 1;
  const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
  return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
};
var INTERNALS = Symbol("Request internals");
var isRequest = (object) => {
  return typeof object === "object" && typeof object[INTERNALS] === "object";
};
var Request = class extends Body {
  constructor(input, init2 = {}) {
    let parsedURL;
    if (isRequest(input)) {
      parsedURL = new URL(input.url);
    } else {
      parsedURL = new URL(input);
      input = {};
    }
    let method = init2.method || input.method || "GET";
    method = method.toUpperCase();
    if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
      throw new TypeError("Request with GET/HEAD method cannot have body");
    }
    const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
    super(inputBody, {
      size: init2.size || input.size || 0
    });
    const headers = new Headers(init2.headers || input.headers || {});
    if (inputBody !== null && !headers.has("Content-Type")) {
      const contentType = extractContentType(inputBody, this);
      if (contentType) {
        headers.append("Content-Type", contentType);
      }
    }
    let signal = isRequest(input) ? input.signal : null;
    if ("signal" in init2) {
      signal = init2.signal;
    }
    if (signal !== null && !isAbortSignal(signal)) {
      throw new TypeError("Expected signal to be an instanceof AbortSignal");
    }
    this[INTERNALS] = {
      method,
      redirect: init2.redirect || input.redirect || "follow",
      headers,
      parsedURL,
      signal
    };
    this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
    this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
    this.counter = init2.counter || input.counter || 0;
    this.agent = init2.agent || input.agent;
    this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
    this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
  }
  get method() {
    return this[INTERNALS].method;
  }
  get url() {
    return (0, import_url.format)(this[INTERNALS].parsedURL);
  }
  get headers() {
    return this[INTERNALS].headers;
  }
  get redirect() {
    return this[INTERNALS].redirect;
  }
  get signal() {
    return this[INTERNALS].signal;
  }
  clone() {
    return new Request(this);
  }
  get [Symbol.toStringTag]() {
    return "Request";
  }
};
Object.defineProperties(Request.prototype, {
  method: { enumerable: true },
  url: { enumerable: true },
  headers: { enumerable: true },
  redirect: { enumerable: true },
  clone: { enumerable: true },
  signal: { enumerable: true }
});
var getNodeRequestOptions = (request) => {
  const { parsedURL } = request[INTERNALS];
  const headers = new Headers(request[INTERNALS].headers);
  if (!headers.has("Accept")) {
    headers.set("Accept", "*/*");
  }
  let contentLengthValue = null;
  if (request.body === null && /^(post|put)$/i.test(request.method)) {
    contentLengthValue = "0";
  }
  if (request.body !== null) {
    const totalBytes = getTotalBytes(request);
    if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
      contentLengthValue = String(totalBytes);
    }
  }
  if (contentLengthValue) {
    headers.set("Content-Length", contentLengthValue);
  }
  if (!headers.has("User-Agent")) {
    headers.set("User-Agent", "node-fetch");
  }
  if (request.compress && !headers.has("Accept-Encoding")) {
    headers.set("Accept-Encoding", "gzip,deflate,br");
  }
  let { agent } = request;
  if (typeof agent === "function") {
    agent = agent(parsedURL);
  }
  if (!headers.has("Connection") && !agent) {
    headers.set("Connection", "close");
  }
  const search = getSearch(parsedURL);
  const requestOptions = {
    path: parsedURL.pathname + search,
    pathname: parsedURL.pathname,
    hostname: parsedURL.hostname,
    protocol: parsedURL.protocol,
    port: parsedURL.port,
    hash: parsedURL.hash,
    search: parsedURL.search,
    query: parsedURL.query,
    href: parsedURL.href,
    method: request.method,
    headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
    insecureHTTPParser: request.insecureHTTPParser,
    agent
  };
  return requestOptions;
};
var AbortError = class extends FetchBaseError {
  constructor(message, type = "aborted") {
    super(message, type);
  }
};
var supportedSchemas = new Set(["data:", "http:", "https:"]);
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = dataUriToBuffer$1(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error3 = new AbortError("The operation was aborted.");
      reject(error3);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error3);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error3);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error3) {
                reject(error3);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
        reject(error3);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error3) => {
          reject(error3);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error3) => {
              reject(error3);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error3) => {
              reject(error3);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error3) => {
          reject(error3);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}

// node_modules/@sveltejs/kit/dist/ssr.js
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
function is_content_type_textual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}
async function render_endpoint(request, route, match) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (!handler2) {
    return;
  }
  const params = route.params(match);
  const response = await handler2({ ...request, params });
  const preface = `Invalid response from route ${request.path}`;
  if (!response) {
    return;
  }
  if (typeof response !== "object") {
    return error(`${preface}: expected an object, got ${typeof response}`);
  }
  let { status = 200, body, headers = {} } = response;
  headers = lowercase_keys(headers);
  const type = headers["content-type"];
  const is_type_textual = is_content_type_textual(type);
  if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
    return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
  }
  let normalized_body;
  if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
    headers = { ...headers, "content-type": "application/json; charset=utf-8" };
    normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
  } else {
    normalized_body = body;
  }
  return { status, body: normalized_body, headers };
}
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
Promise.resolve();
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  branch,
  options: options2,
  $session,
  page_config,
  status,
  error: error3,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error3) {
    error3.stack = options2.get_stack(error3);
  }
  if (page_config.ssr) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error4) => {
      throw new Error(`Failed to serialize session data: ${error4.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error3)},
					nodes: [
						${(branch || []).map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page && page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page && page.path)},
						query: new URLSearchParams(${page ? s$1(page.query.toString()) : ""}),
						params: ${page && s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error3) {
  if (!error3)
    return null;
  let serialized = try_serialize(error3);
  if (!serialized) {
    const { name, message, stack } = error3;
    serialized = try_serialize({ ...error3, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status: status || 500,
        error: new Error()
      };
    }
    const error3 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error3 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error3}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error3 };
    }
    return { status, error: error3 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
var s = JSON.stringify;
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  prerender_enabled,
  is_leaf,
  is_error,
  status,
  error: error3
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  const page_proxy = new Proxy(page, {
    get: (target, prop, receiver) => {
      if (prop === "query" && prerender_enabled) {
        throw new Error("Cannot access query on a page with prerendering enabled");
      }
      return Reflect.get(target, prop, receiver);
    }
  });
  if (module2.load) {
    const load_input = {
      page: page_proxy,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        const resolved = resolve(request.path, url.split("?")[0]);
        let response;
        const filename = resolved.replace(options2.paths.assets, "").slice(1);
        const filename_html = `${filename}/index.html`;
        const asset = options2.manifest.assets.find((d) => d.file === filename || d.file === filename_html);
        if (asset) {
          response = options2.read ? new Response(options2.read(asset.file), {
            headers: asset.type ? { "content-type": asset.type } : {}
          }) : await fetch(`http://${page.host}/${asset.file}`, opts);
        } else if (resolved.startsWith("/") && !resolved.startsWith("//")) {
          const relative = resolved;
          const headers = { ...opts.headers };
          if (opts.credentials !== "omit") {
            uses_credentials = true;
            headers.cookie = request.headers.cookie;
            if (!headers.authorization) {
              headers.authorization = request.headers.authorization;
            }
          }
          if (opts.body && typeof opts.body !== "string") {
            throw new Error("Request body must be a string");
          }
          const search = url.includes("?") ? url.slice(url.indexOf("?") + 1) : "";
          const rendered = await respond({
            host: request.host,
            method: opts.method || "GET",
            headers,
            path: relative,
            rawBody: new TextEncoder().encode(opts.body),
            query: new URLSearchParams(search)
          }, options2, {
            fetched: url,
            initiator: route
          });
          if (rendered) {
            if (state.prerender) {
              state.prerender.dependencies.set(relative, rendered);
            }
            response = new Response(rendered.body, {
              status: rendered.status,
              headers: rendered.headers
            });
          }
        } else {
          if (resolved.startsWith("//")) {
            throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
          }
          if (typeof request.host !== "undefined") {
            const { hostname: fetch_hostname } = new URL(url);
            const [server_hostname] = request.host.split(":");
            if (`.${fetch_hostname}`.endsWith(`.${server_hostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const external_request = new Request(url, opts);
          response = await options2.hooks.externalFetch.call(null, external_request);
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error3;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  if (!loaded) {
    throw new Error(`${node.entry} - load must return a value except for page fall through`);
  }
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var absolute = /^([a-z]+:)?\/?\//;
function resolve(base2, path) {
  const base_match = absolute.exec(base2);
  const path_match = absolute.exec(path);
  if (!base_match) {
    throw new Error(`bad base path: "${base2}"`);
  }
  const baseparts = path_match ? [] : base2.slice(base_match[0].length).split("/");
  const pathparts = path_match ? path.slice(path_match[0].length).split("/") : path.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  const prefix = path_match && path_match[0] || base_match && base_match[0] || "";
  return `${prefix}${baseparts.join("/")}`;
}
function coalesce_to_error(err) {
  return err instanceof Error ? err : new Error(JSON.stringify(err));
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error3 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    prerender_enabled: is_prerender_enabled(options2, default_error, state),
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded ? loaded.context : {},
      prerender_enabled: is_prerender_enabled(options2, default_error, state),
      is_leaf: false,
      is_error: true,
      status,
      error: error3
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error3,
      branch,
      page
    });
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4, request);
    return {
      status: 500,
      headers: {},
      body: error4.stack
    };
  }
}
function is_prerender_enabled(options2, node, state) {
  return options2.prerender && (!!node.module.prerender || !!state.prerender && state.prerender.all);
}
async function respond$1(opts) {
  const { request, options: options2, state, $session, route } = opts;
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id ? options2.load_component(id) : void 0));
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4, request);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error4
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  let page_config = get_page_config(leaf, options2);
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: ""
    };
  }
  let branch = [];
  let status = 200;
  let error3;
  ssr:
    if (page_config.ssr) {
      let context = {};
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              ...opts,
              node,
              context,
              prerender_enabled: is_prerender_enabled(options2, node, state),
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error3 } = loaded.loaded);
            }
          } catch (err) {
            const e = coalesce_to_error(err);
            options2.handle_error(e, request);
            status = 500;
            error3 = e;
          }
          if (loaded && !error3) {
            branch.push(loaded);
          }
          if (error3) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  const error_loaded = await load_node({
                    ...opts,
                    node: error_node,
                    context: node_loaded.context,
                    prerender_enabled: is_prerender_enabled(options2, error_node, state),
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error3
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  page_config = get_page_config(error_node.module, options2);
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (err) {
                  const e = coalesce_to_error(err);
                  options2.handle_error(e, request);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error3
            });
          }
        }
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      ...opts,
      page_config,
      status,
      error: error3,
      branch: branch.filter(Boolean)
    });
  } catch (err) {
    const error4 = coalesce_to_error(err);
    options2.handle_error(error4, request);
    return await respond_with_error({
      ...opts,
      status: 500,
      error: error4
    });
  }
}
function get_page_config(leaf, options2) {
  return {
    ssr: "ssr" in leaf ? !!leaf.ssr : options2.ssr,
    router: "router" in leaf ? !!leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? !!leaf.hydrate : options2.hydrate
  };
}
async function render_page(request, route, match, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  const $session = await options2.hooks.getSession(request);
  const response = await respond$1({
    request,
    options: options2,
    state,
    $session,
    route,
    page
  });
  if (response) {
    return response;
  }
  if (state.fetched) {
    return {
      status: 500,
      headers: {},
      body: `Bad request in load function: failed to fetch ${state.fetched}`
    };
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        (map.get(key) || []).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of this.#map)
      yield key;
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  const content_type = headers["content-type"];
  const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];
  const text = () => new TextDecoder(headers["content-encoding"] || "utf-8").decode(raw);
  switch (type) {
    case "text/plain":
      return text();
    case "application/json":
      return JSON.parse(text());
    case "application/x-www-form-urlencoded":
      return get_urlencoded(text());
    case "multipart/form-data": {
      const boundary = directives.find((directive) => directive.startsWith("boundary="));
      if (!boundary)
        throw new Error("Missing boundary");
      return get_multipart(text(), boundary.slice("boundary=".length));
    }
    default:
      return raw;
  }
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    throw new Error("Malformed form data");
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    if (!match) {
      throw new Error("Malformed form data");
    }
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    const headers = {};
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      headers[name] = value;
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          throw new Error("Malformed form data");
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      throw new Error("Malformed form data");
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !(incoming.path.split("/").pop() || "").includes(".")) {
      const path = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: options2.paths.base + path + (q ? `?${q}` : "")
        }
      };
    }
  }
  const headers = lowercase_keys(incoming.headers);
  const request = {
    ...incoming,
    headers,
    body: parse_body(incoming.rawBody, headers),
    params: {},
    locals: {}
  };
  try {
    return await options2.hooks.handle({
      request,
      resolve: async (request2) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request2),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            branch: []
          });
        }
        const decoded = decodeURI(request2.path);
        for (const route of options2.manifest.routes) {
          const match = route.pattern.exec(decoded);
          if (!match)
            continue;
          const response = route.type === "endpoint" ? await render_endpoint(request2, route, match) : await render_page(request2, route, match, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body || "")}"`;
                if (request2.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: ""
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        const $session = await options2.hooks.getSession(request2);
        return await respond_with_error({
          request: request2,
          options: options2,
          state,
          $session,
          status: 404,
          error: new Error(`Not found: ${request2.path}`)
        });
      }
    });
  } catch (err) {
    const e = coalesce_to_error(err);
    options2.handle_error(e, request);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// .svelte-kit/output/server/app.js
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
function afterUpdate() {
}
var css$k = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$k);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${``}`;
});
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="/favicon.png" />\n		<meta name="viewport" content="width=device-width, initial-scale=1" />\n\n		' + head + '\n	</head>\n	<body>\n		<div id="svelte">' + body + "</div>\n	</body>\n</html>\n";
var options = null;
var default_settings = { paths: { "base": "", "assets": "" } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  const hooks = get_hooks(user_hooks);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: assets + "/_app/start-618d984b.js",
      css: [assets + "/_app/assets/start-61d1577b.css"],
      js: [assets + "/_app/start-618d984b.js", assets + "/_app/chunks/vendor-af294010.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => assets + "/_app/" + entry_lookup[id],
    get_stack: (error22) => String(error22),
    handle_error: (error22, request) => {
      hooks.handleError({ error: error22, request });
      error22.stack = options.get_stack(error22);
    },
    hooks,
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    prerender: true,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var empty = () => ({});
var manifest = {
  assets: [{ "file": "favicon.png", "size": 1571, "type": "image/png" }, { "file": "fonts/Glyphter.eot", "size": 5600, "type": "application/vnd.ms-fontobject" }, { "file": "fonts/Glyphter.svg", "size": 32769, "type": "image/svg+xml" }, { "file": "fonts/Glyphter.ttf", "size": 5432, "type": "font/ttf" }, { "file": "fonts/Glyphter.woff", "size": 3568, "type": "font/woff" }, { "file": "img/arrow-left.svg", "size": 761, "type": "image/svg+xml" }, { "file": "img/arrow-right.svg", "size": 766, "type": "image/svg+xml" }, { "file": "img/buscar.svg", "size": 844, "type": "image/svg+xml" }, { "file": "img/card.png", "size": 398, "type": "image/png" }, { "file": "img/cart.png", "size": 442, "type": "image/png" }, { "file": "img/logo.png", "size": 56130, "type": "image/png" }, { "file": "img/package.png", "size": 396, "type": "image/png" }, { "file": "img/tarjetas.png", "size": 11102, "type": "image/png" }, { "file": "img/temp/ad.png", "size": 34194, "type": "image/png" }, { "file": "img/temp/layer-16.png", "size": 3953, "type": "image/png" }, { "file": "img/temp/layer-17.png", "size": 6462, "type": "image/png" }, { "file": "img/temp/layer-18.png", "size": 3181, "type": "image/png" }, { "file": "img/temp/layer-19.png", "size": 5278, "type": "image/png" }, { "file": "img/temp/layer-20.png", "size": 4270, "type": "image/png" }, { "file": "img/temp/layer-21.png", "size": 4124, "type": "image/png" }, { "file": "img/temp/layer-6.png", "size": 7212, "type": "image/png" }, { "file": "img/temp/product0-thumb.png", "size": 7299, "type": "image/png" }, { "file": "img/temp/product0.png", "size": 150191, "type": "image/png" }, { "file": "img/temp/product1.png", "size": 48541, "type": "image/png" }, { "file": "img/temp/product2.png", "size": 18925, "type": "image/png" }, { "file": "img/temp/product3.png", "size": 11823, "type": "image/png" }, { "file": "img/temp/product4.png", "size": 14785, "type": "image/png" }, { "file": "img/temp/product5.png", "size": 12273, "type": "image/png" }, { "file": "img/temp/product6.png", "size": 11901, "type": "image/png" }, { "file": "img/temp/product7.png", "size": 50456, "type": "image/png" }, { "file": "img/temp/product8.png", "size": 40988, "type": "image/png" }, { "file": "img/temp/product9.png", "size": 55520, "type": "image/png" }, { "file": "img/user.png", "size": 440, "type": "image/png" }, { "file": "img/van.png", "size": 473, "type": "image/png" }, { "file": "robots.txt", "size": 67, "type": "text/plain" }],
  layout: "src/routes/__layout.svelte",
  error: ".svelte-kit/build/components/error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/product\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/product.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    },
    {
      type: "page",
      pattern: /^\/cart\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/cart.svelte"],
      b: [".svelte-kit/build/components/error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  handleError: hooks.handleError || (({ error: error22 }) => console.error(error22.stack)),
  externalFetch: hooks.externalFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  ".svelte-kit/build/components/error.svelte": () => Promise.resolve().then(function() {
    return error2;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/product.svelte": () => Promise.resolve().then(function() {
    return product;
  }),
  "src/routes/cart.svelte": () => Promise.resolve().then(function() {
    return cart;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "pages/__layout.svelte-57bf8a78.js", "css": ["assets/pages/__layout.svelte-d335ce58.css"], "js": ["pages/__layout.svelte-57bf8a78.js", "chunks/vendor-af294010.js"], "styles": [] }, ".svelte-kit/build/components/error.svelte": { "entry": "error.svelte-e1e7a444.js", "css": [], "js": ["error.svelte-e1e7a444.js", "chunks/vendor-af294010.js"], "styles": [] }, "src/routes/index.svelte": { "entry": "pages/index.svelte-0059bcd1.js", "css": ["assets/pages/index.svelte-8319bdf1.css", "assets/ContactRibbon-8ace12d0.css"], "js": ["pages/index.svelte-0059bcd1.js", "chunks/vendor-af294010.js", "chunks/ContactRibbon-469bd7db.js"], "styles": [] }, "src/routes/product.svelte": { "entry": "pages/product.svelte-47a54bf4.js", "css": ["assets/pages/product.svelte-edcb689c.css", "assets/PolicyInfo.svelte_svelte&type=style&lang-a7bfaab2.css", "assets/ContactRibbon-8ace12d0.css"], "js": ["pages/product.svelte-47a54bf4.js", "chunks/vendor-af294010.js", "chunks/PolicyInfo.svelte_svelte&type=style&lang-04855276.js", "chunks/ContactRibbon-469bd7db.js"], "styles": [] }, "src/routes/cart.svelte": { "entry": "pages/cart.svelte-32e58c26.js", "css": ["assets/pages/cart.svelte-25343472.css", "assets/PolicyInfo.svelte_svelte&type=style&lang-a7bfaab2.css", "assets/ContactRibbon-8ace12d0.css"], "js": ["pages/cart.svelte-32e58c26.js", "chunks/vendor-af294010.js", "chunks/PolicyInfo.svelte_svelte&type=style&lang-04855276.js", "chunks/ContactRibbon-469bd7db.js"], "styles": [] } };
async function load_component(file) {
  const { entry, css: css2, js, styles } = metadata_lookup[file];
  return {
    module: await module_lookup[file](),
    entry: assets + "/_app/" + entry,
    css: css2.map((dep) => assets + "/_app/" + dep),
    js: js.map((dep) => assets + "/_app/" + dep),
    styles
  };
}
function render(request, {
  prerender: prerender2
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender: prerender2 });
}
var css$j = {
  code: "nav.svelte-h3d4yo.svelte-h3d4yo{background-color:#E5E5E5}ul.svelte-h3d4yo.svelte-h3d4yo{display:flex;list-style:none;margin:0 auto;max-width:866px}ul.svelte-h3d4yo li.svelte-h3d4yo{text-align:center;flex:1}ul.svelte-h3d4yo li a.svelte-h3d4yo{line-height:41px;color:#767676;text-transform:uppercase;font-size:13px;font-weight:500;display:block}",
  map: '{"version":3,"file":"TopNav.svelte","sources":["TopNav.svelte"],"sourcesContent":["<nav>\\r\\n  <ul>\\r\\n    <li><a href=\\"/product\\">Productos</a></li>\\r\\n    <li><a href=\\"/\\">Proyectos</a></li>\\r\\n    <li><a href=\\"/\\">Nosotros</a></li>\\r\\n    <li><a href=\\"/\\">Sucursales</a></li>\\r\\n    <li><a href=\\"/\\">Catalogo PDF</a></li>\\r\\n    <li><a href=\\"/\\">Blog</a></li>\\r\\n    <li><a href=\\"/\\">Contacto</a></li>\\r\\n  </ul>\\r\\n</nav>\\r\\n\\r\\n<style>\\r\\n\\tnav{\\r\\n\\t\\tbackground-color: #E5E5E5;\\r\\n\\t}\\r\\n\\tul{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tlist-style: none;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tmax-width: 866px;\\r\\n\\t}\\r\\n\\tul li{\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tflex: 1;\\r\\n\\t}\\r\\n\\tul li a{\\r\\n\\t\\tline-height: 41px;\\r\\n\\t\\tcolor: #767676;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tfont-size: 13px;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\tdisplay: block;\\r\\n\\t}\\r\\n\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAaC,+BAAG,CAAC,AACH,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,8BAAE,CAAC,AACF,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,KAAK,AACjB,CAAC,AACD,gBAAE,CAAC,gBAAE,CAAC,AACL,UAAU,CAAE,MAAM,CAClB,IAAI,CAAE,CAAC,AACR,CAAC,AACD,gBAAE,CAAC,EAAE,CAAC,eAAC,CAAC,AACP,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,KAAK,AACf,CAAC"}'
};
var TopNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$j);
  return `<nav class="${"svelte-h3d4yo"}"><ul class="${"svelte-h3d4yo"}"><li class="${"svelte-h3d4yo"}"><a href="${"/product"}" class="${"svelte-h3d4yo"}">Productos</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Proyectos</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Nosotros</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Sucursales</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Catalogo PDF</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Blog</a></li>
    <li class="${"svelte-h3d4yo"}"><a href="${"/"}" class="${"svelte-h3d4yo"}">Contacto</a></li></ul>
</nav>`;
});
var css$i = {
  code: "nav.svelte-mgunnz.svelte-mgunnz{display:flex;border-bottom:2px solid #E5E5E5;margin:0 auto;max-width:1359px;padding:4px 40px 0px 40px}nav.svelte-mgunnz form.svelte-mgunnz{margin-left:auto;padding-top:38px;padding-right:55px;position:relative}nav.svelte-mgunnz form input.svelte-mgunnz{padding-right:35px;width:297px;position:relative}nav.svelte-mgunnz form.svelte-mgunnz:after{content:'';background-image:url('/img/buscar.svg');background-size:contain;background-repeat:no-repeat;width:25px;height:25px;position:absolute;right:65px;top:45px}nav.svelte-mgunnz .cart.svelte-mgunnz{margin:43px 75px 0 0;position:relative}nav.svelte-mgunnz .cart i.svelte-mgunnz{font-style:normal;font-weight:bold;background-color:#001a47;position:absolute;top:-19px;right:-27px;color:white;width:34px;height:34px;border-radius:25px;display:block;line-height:35px;text-align:center}nav.svelte-mgunnz p.svelte-mgunnz{font-size:16px;font-weight:bold;color:#767676;margin-top:28px;margin-right:70px}nav.svelte-mgunnz p a.svelte-mgunnz{color:#d36e36}nav.svelte-mgunnz p a img.svelte-mgunnz{position:relative;top:13px}.main-logo.svelte-mgunnz.svelte-mgunnz{margin-bottom:-4px}",
  map: `{"version":3,"file":"UserNav.svelte","sources":["UserNav.svelte"],"sourcesContent":["<nav>\\r\\n\\t<a href='/' class='main-logo'><img src='/img/logo.png' alt='Manuel Delgado logo principal' /></a>\\r\\n\\t<form><input type=\\"text\\" name=\\"product-search\\" placeholder=\\"Buscar Muebles\\" class=\\"default-input\\" /></form>\\r\\n\\t<a class='cart' href='/cart'>\\r\\n\\t\\t<img src='/img/cart.png' alt='carrito de compras' />\\r\\n\\t\\t<i>2</i>\\r\\n\\t</a>\\r\\n\\t<p>Hola! <a href='/'>Acceder <img src='/img/user.png' alt='usuario'/></a></p>\\r\\n</nav>\\r\\n<style>\\r\\n\\tnav{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tborder-bottom: 2px solid #E5E5E5;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tmax-width: 1359px;\\r\\n\\t\\tpadding: 4px 40px 0px 40px;\\r\\n\\t}\\r\\n\\r\\n\\tnav form{\\r\\n\\t\\tmargin-left: auto;\\r\\n\\t\\tpadding-top: 38px;\\r\\n\\t\\tpadding-right: 55px;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\tnav form input{\\r\\n\\t\\tpadding-right: 35px;\\r\\n\\t\\twidth: 297px;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\tnav form:after{\\r\\n\\t\\tcontent: '';\\r\\n\\t\\tbackground-image: url('/img/buscar.svg');\\r\\n\\t\\tbackground-size: contain;\\r\\n\\t\\tbackground-repeat: no-repeat;\\r\\n\\t\\twidth: 25px;\\r\\n\\t\\theight: 25px;\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\tright: 65px;\\r\\n\\t\\ttop: 45px;\\r\\n\\r\\n\\t}\\r\\n\\tnav .cart{\\r\\n\\t\\tmargin: 43px 75px 0 0;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\tnav .cart i{\\r\\n\\t\\tfont-style: normal;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tbackground-color: #001a47;\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\ttop: -19px;\\r\\n\\t\\tright: -27px;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\twidth: 34px;\\r\\n\\t\\theight: 34px;\\r\\n\\t\\tborder-radius: 25px;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tline-height: 35px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t}\\r\\n\\tnav p{\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tcolor: #767676;\\r\\n\\t\\tmargin-top: 28px;\\r\\n\\t\\tmargin-right: 70px;\\r\\n\\r\\n\\t}\\r\\n\\tnav p a{\\r\\n\\t\\tcolor: #d36e36;\\r\\n\\t}\\r\\n\\tnav p a img{\\r\\n\\t\\tposition: relative;\\r\\n\\t\\ttop: 13px;\\r\\n\\t}\\r\\n\\t.main-logo{\\r\\n\\t\\tmargin-bottom: -4px;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAUC,+BAAG,CAAC,AACH,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,AAC3B,CAAC,AAED,iBAAG,CAAC,kBAAI,CAAC,AACR,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAAI,CACnB,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,iBAAG,CAAC,IAAI,CAAC,mBAAK,CAAC,AACd,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,CACZ,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,iBAAG,CAAC,kBAAI,MAAM,CAAC,AACd,OAAO,CAAE,EAAE,CACX,gBAAgB,CAAE,IAAI,iBAAiB,CAAC,CACxC,eAAe,CAAE,OAAO,CACxB,iBAAiB,CAAE,SAAS,CAC5B,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,AAEV,CAAC,AACD,iBAAG,CAAC,mBAAK,CAAC,AACT,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CACrB,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,iBAAG,CAAC,KAAK,CAAC,eAAC,CAAC,AACX,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CACjB,gBAAgB,CAAE,OAAO,CACzB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,KAAK,CACZ,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,IAAI,CACnB,OAAO,CAAE,KAAK,CACd,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,iBAAG,CAAC,eAAC,CAAC,AACL,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,CACd,UAAU,CAAE,IAAI,CAChB,YAAY,CAAE,IAAI,AAEnB,CAAC,AACD,iBAAG,CAAC,CAAC,CAAC,eAAC,CAAC,AACP,KAAK,CAAE,OAAO,AACf,CAAC,AACD,iBAAG,CAAC,CAAC,CAAC,CAAC,CAAC,iBAAG,CAAC,AACX,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,AACV,CAAC,AACD,sCAAU,CAAC,AACV,aAAa,CAAE,IAAI,AACpB,CAAC"}`
};
var UserNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$i);
  return `<nav class="${"svelte-mgunnz"}"><a href="${"/"}" class="${"main-logo svelte-mgunnz"}"><img src="${"/img/logo.png"}" alt="${"Manuel Delgado logo principal"}" class="${"svelte-mgunnz"}"></a>
	<form class="${"svelte-mgunnz"}"><input type="${"text"}" name="${"product-search"}" placeholder="${"Buscar Muebles"}" class="${"default-input svelte-mgunnz"}"></form>
	<a class="${"cart svelte-mgunnz"}" href="${"/cart"}"><img src="${"/img/cart.png"}" alt="${"carrito de compras"}" class="${"svelte-mgunnz"}">
		<i class="${"svelte-mgunnz"}">2</i></a>
	<p class="${"svelte-mgunnz"}">Hola! <a href="${"/"}" class="${"svelte-mgunnz"}">Acceder <img src="${"/img/user.png"}" alt="${"usuario"}" class="${"svelte-mgunnz"}"></a></p>
</nav>`;
});
var css$h = {
  code: "ul.svelte-13ps3ut.svelte-13ps3ut{list-style-type:none;display:flex;padding:0;margin:0 auto;max-width:1059px}li.svelte-13ps3ut.svelte-13ps3ut{margin:auto}li.svelte-13ps3ut a.svelte-13ps3ut{display:block;padding:17px 15px 18px;color:#757575;font-weight:bold;font-size:16px;text-align:center;text-transform:uppercase;letter-spacing:1.6px}li.svelte-13ps3ut a.selected.svelte-13ps3ut{border-bottom:4px solid #738dc8;padding:17px 0 14px}",
  map: `{"version":3,"file":"CategoryNav.svelte","sources":["CategoryNav.svelte"],"sourcesContent":["<nav>\\r\\n\\t<ul>\\r\\n\\t\\t<li><a href='/' >Ofertas</a></li>\\r\\n\\t\\t<li><a href='/' >Sillas</a></li>\\r\\n\\t\\t<li><a href='/' class='selected' >Escritorios</a></li>\\r\\n\\t\\t<li><a href='/' >Metalico</a></li>\\r\\n\\t\\t<li><a href='/' >Restaurante</a></li>\\r\\n\\t\\t<li><a href='/' >Home Office</a></li>\\r\\n\\t\\t<li><a href='/' >Relampago</a></li>\\r\\n\\t</ul>\\r\\n</nav>\\r\\n<style>\\r\\n\\tul{\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tmax-width: 1059px;\\r\\n\\t}\\r\\n\\tli{\\r\\n\\t\\tmargin: auto;\\r\\n\\t}\\r\\n\\tli a{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tpadding: 17px 15px 18px;\\r\\n\\t\\tcolor: #757575;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tfont-size: 16px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tletter-spacing: 1.6px;\\r\\n\\t}\\r\\n\\tli a.selected{\\r\\n\\t\\tborder-bottom: 4px solid #738dc8;\\r\\n\\t\\tpadding: 17px 0 14px;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAYC,gCAAE,CAAC,AACF,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,SAAS,CAAE,MAAM,AAClB,CAAC,AACD,gCAAE,CAAC,AACF,MAAM,CAAE,IAAI,AACb,CAAC,AACD,iBAAE,CAAC,gBAAC,CAAC,AACJ,OAAO,CAAE,KAAK,CACd,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CACvB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,SAAS,CACzB,cAAc,CAAE,KAAK,AACtB,CAAC,AACD,iBAAE,CAAC,CAAC,wBAAS,CAAC,AACb,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AACrB,CAAC"}`
};
var CategoryNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$h);
  return `<nav><ul class="${"svelte-13ps3ut"}"><li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Ofertas</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Sillas</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"selected svelte-13ps3ut"}">Escritorios</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Metalico</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Restaurante</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Home Office</a></li>
		<li class="${"svelte-13ps3ut"}"><a href="${"/"}" class="${"svelte-13ps3ut"}">Relampago</a></li></ul>
</nav>`;
});
var css$g = {
  code: "section.svelte-1jck09c.svelte-1jck09c{background-color:black}nav.svelte-1jck09c.svelte-1jck09c{max-width:689px;margin:0 auto;display:flex}nav.svelte-1jck09c a.svelte-1jck09c{margin-top:33px}nav.svelte-1jck09c i.svelte-1jck09c{font-size:22px}ul.svelte-1jck09c.svelte-1jck09c{list-style-type:none;padding:0;flex:1;text-align:center;text-transform:uppercase;margin:36px 0 33px}a.svelte-1jck09c.svelte-1jck09c{color:white;font-weight:bold}a.svelte-1jck09c strong.svelte-1jck09c{color:#3BC07E}",
  map: `{"version":3,"file":"AnnouncementsNav.svelte","sources":["AnnouncementsNav.svelte"],"sourcesContent":["<section>\\r\\n\\t<nav>\\r\\n\\t\\t<a href='#ba'><i class='icon-fizq1-01'></i></a>\\r\\n\\t\\t<ul>\\r\\n\\t\\t\\t<li><a href='/'><strong>Ultimos d\xEDas 50%</strong> piezas marcadas</a></li>\\r\\n\\t\\t</ul>\\r\\n\\t\\t<a href='#fw'><i class='icon-fderecha-01'></i></a>\\r\\n\\t</nav>\\r\\n</section>\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\tbackground-color: black;\\r\\n\\t}\\r\\n\\tnav{\\r\\n\\t\\tmax-width: 689px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t}\\r\\n\\tnav a{\\r\\n\\t\\tmargin-top: 33px;\\r\\n\\t}\\r\\n\\tnav i{\\r\\n\\t\\tfont-size: 22px;\\r\\n\\t}\\r\\n\\tul{\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tflex: 1;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tmargin: 36px 0 33px;\\r\\n\\t}\\r\\n\\ta{\\r\\n\\t\\tcolor:  white;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n\\ta strong{\\r\\n\\t\\tcolor: #3BC07E;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAUC,qCAAO,CAAC,AACP,gBAAgB,CAAE,KAAK,AACxB,CAAC,AACD,iCAAG,CAAC,AACH,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,AACd,CAAC,AACD,kBAAG,CAAC,gBAAC,CAAC,AACL,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,kBAAG,CAAC,gBAAC,CAAC,AACL,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,gCAAE,CAAC,AACF,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CAAC,CACV,IAAI,CAAE,CAAC,CACP,UAAU,CAAE,MAAM,CAClB,cAAc,CAAE,SAAS,CACzB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AACpB,CAAC,AACD,+BAAC,CAAC,AACD,KAAK,CAAG,KAAK,CACb,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,gBAAC,CAAC,qBAAM,CAAC,AACR,KAAK,CAAE,OAAO,AACf,CAAC"}`
};
var AnnouncementsNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$g);
  return `<section class="${"svelte-1jck09c"}"><nav class="${"svelte-1jck09c"}"><a href="${"#ba"}" class="${"svelte-1jck09c"}"><i class="${"icon-fizq1-01 svelte-1jck09c"}"></i></a>
		<ul class="${"svelte-1jck09c"}"><li><a href="${"/"}" class="${"svelte-1jck09c"}"><strong class="${"svelte-1jck09c"}">Ultimos d\xEDas 50%</strong> piezas marcadas</a></li></ul>
		<a href="${"#fw"}" class="${"svelte-1jck09c"}"><i class="${"icon-fderecha-01 svelte-1jck09c"}"></i></a></nav>
</section>`;
});
var css$f = {
  code: "section.svelte-rx99rx.svelte-rx99rx{margin-right:126px}footer.svelte-rx99rx.svelte-rx99rx{color:#5e5e5e;max-width:1082px;margin:0 auto;display:flex;padding:26px 0}footer.svelte-rx99rx a.svelte-rx99rx{color:#5e5e5e}footer.svelte-rx99rx i.svelte-rx99rx{font-size:28px;color:#A1A1A1;margin-right:10px}footer.svelte-rx99rx ul.svelte-rx99rx{list-style-type:none;padding:0}h4.svelte-rx99rx.svelte-rx99rx{font-size:14.5px}h3.svelte-rx99rx.svelte-rx99rx{font-weight:300;font-size:21px}h5.svelte-rx99rx.svelte-rx99rx{font-size:12.5px;font-weight:500}.button.svelte-rx99rx.svelte-rx99rx{border:none}li.svelte-rx99rx.svelte-rx99rx{margin:11px 0}",
  map: `{"version":3,"file":"Footer.svelte","sources":["Footer.svelte"],"sourcesContent":["<footer>\\r\\n\\t<section>\\r\\n\\t\\t<h4>S\xEDguenos</h4>\\r\\n\\t\\t<p>\\r\\n\\t\\t\\t<a href='http://facebook.com'><i class='icon-face-01'></i></a>\\r\\n\\t\\t\\t<a href='http://facebook.com'><i class='icon-inst-01'></i></a>\\r\\n\\t\\t\\t<a href='http://facebook.com'><i class='icon-pint-01'></i></a>\\r\\n\\t\\t\\t<a href='http://facebook.com'><i class='icon-tw-01'></i></a>\\r\\n\\t\\t</p>\\r\\n\\t\\t<h3>Suscribete a nuestro newsletter</h3>\\r\\n\\t\\t<h5>Recibe ofertas y contenido exclusivo</h5>\\r\\n\\t\\t<form>\\r\\n\\t\\t\\t<p><input type=\\"text\\" name=\\"email\\" placeholder=\\"Escribe tu mail\\" class='default-input'/></p>\\r\\n\\t\\t\\t<p><input type=\\"submit\\" value='Suscribete' name=\\"submit\\" class='button' /></p>\\r\\n\\t\\t</form>\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t<h4>Nuestros Productos</h4>\\r\\n\\t\\t<ul>\\r\\n\\t\\t\\t<li><a href='/'>Sillas</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Escritorios</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Met\xE1licos</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Restaurantes</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Complementos</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Escolar</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Promociones</a></li>\\r\\n\\t\\t</ul>\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t<h4>M\xE9todos de Pago</h4>\\r\\n\\t\\t<ul>\\r\\n\\t\\t\\t<li><a href='/'>Tarjetas de cr\xE9dito / d\xE9bito</a></li>\\r\\n\\t\\t\\t<li><a href='/'>Paypal</a></li>\\r\\n\\t\\t\\t<li><a href='/'>En efectivo</a></li>\\r\\n\\t\\t</ul>\\r\\n\\t\\t<p>\\r\\n\\t\\t\\t<img src='/img/tarjetas.png' alt='tarjetas' />\\r\\n\\t\\t</p>\\r\\n\\t</section>\\r\\n</footer>\\r\\n\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\tmargin-right: 126px;\\r\\n\\t}\\r\\n\\tfooter{\\r\\n\\t\\tcolor: #5e5e5e;\\r\\n\\t\\tmax-width: 1082px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tpadding: 26px 0;\\r\\n\\t}\\r\\n\\tfooter a{\\r\\n\\t\\tcolor:  #5e5e5e;\\r\\n\\t}\\r\\n\\tfooter i{\\r\\n\\t\\tfont-size: 28px;\\r\\n\\t\\tcolor: #A1A1A1;\\r\\n\\t\\tmargin-right: 10px;\\r\\n\\t}\\r\\n\\tfooter ul{\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\th4{\\r\\n\\t\\tfont-size: 14.5px;\\r\\n\\t}\\r\\n\\th3{\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tfont-size: 21px;\\r\\n\\t}\\r\\n\\th5{\\r\\n\\t\\tfont-size: 12.5px;\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t}\\r\\n\\t.button{\\r\\n\\t\\tborder: none;\\r\\n\\t}\\r\\n\\tli{\\r\\n\\t\\tmargin: 11px 0;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AA0CC,mCAAO,CAAC,AACP,YAAY,CAAE,KAAK,AACpB,CAAC,AACD,kCAAM,CAAC,AACN,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACb,OAAO,CAAE,IAAI,CAAC,CAAC,AAChB,CAAC,AACD,oBAAM,CAAC,eAAC,CAAC,AACR,KAAK,CAAG,OAAO,AAChB,CAAC,AACD,oBAAM,CAAC,eAAC,CAAC,AACR,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,OAAO,CACd,YAAY,CAAE,IAAI,AACnB,CAAC,AACD,oBAAM,CAAC,gBAAE,CAAC,AACT,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CAAC,AACX,CAAC,AACD,8BAAE,CAAC,AACF,SAAS,CAAE,MAAM,AAClB,CAAC,AACD,8BAAE,CAAC,AACF,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,8BAAE,CAAC,AACF,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,GAAG,AACjB,CAAC,AACD,mCAAO,CAAC,AACP,MAAM,CAAE,IAAI,AACb,CAAC,AACD,8BAAE,CAAC,AACF,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC"}`
};
var Footer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$f);
  return `<footer class="${"svelte-rx99rx"}"><section class="${"svelte-rx99rx"}"><h4 class="${"svelte-rx99rx"}">S\xEDguenos</h4>
		<p><a href="${"http://facebook.com"}" class="${"svelte-rx99rx"}"><i class="${"icon-face-01 svelte-rx99rx"}"></i></a>
			<a href="${"http://facebook.com"}" class="${"svelte-rx99rx"}"><i class="${"icon-inst-01 svelte-rx99rx"}"></i></a>
			<a href="${"http://facebook.com"}" class="${"svelte-rx99rx"}"><i class="${"icon-pint-01 svelte-rx99rx"}"></i></a>
			<a href="${"http://facebook.com"}" class="${"svelte-rx99rx"}"><i class="${"icon-tw-01 svelte-rx99rx"}"></i></a></p>
		<h3 class="${"svelte-rx99rx"}">Suscribete a nuestro newsletter</h3>
		<h5 class="${"svelte-rx99rx"}">Recibe ofertas y contenido exclusivo</h5>
		<form><p><input type="${"text"}" name="${"email"}" placeholder="${"Escribe tu mail"}" class="${"default-input"}"></p>
			<p><input type="${"submit"}" value="${"Suscribete"}" name="${"submit"}" class="${"button svelte-rx99rx"}"></p></form></section>
	<section class="${"svelte-rx99rx"}"><h4 class="${"svelte-rx99rx"}">Nuestros Productos</h4>
		<ul class="${"svelte-rx99rx"}"><li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Sillas</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Escritorios</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Met\xE1licos</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Restaurantes</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Complementos</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Escolar</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Promociones</a></li></ul></section>
	<section class="${"svelte-rx99rx"}"><h4 class="${"svelte-rx99rx"}">M\xE9todos de Pago</h4>
		<ul class="${"svelte-rx99rx"}"><li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Tarjetas de cr\xE9dito / d\xE9bito</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">Paypal</a></li>
			<li class="${"svelte-rx99rx"}"><a href="${"/"}" class="${"svelte-rx99rx"}">En efectivo</a></li></ul>
		<p><img src="${"/img/tarjetas.png"}" alt="${"tarjetas"}"></p></section>
</footer>`;
});
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(TopNav, "TopNav").$$render($$result, {}, {}, {})}
${validate_component(UserNav, "UserNav").$$render($$result, {}, {}, {})}
${validate_component(CategoryNav, "CategoryNav").$$render($$result, {}, {}, {})}
${validate_component(AnnouncementsNav, "AnnouncementsNav").$$render($$result, {}, {}, {})}
${slots.default ? slots.default({}) : ``}
${validate_component(Footer, "Footer").$$render($$result, {}, {}, {})}`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
function load({ error: error22, status }) {
  return { props: { error: error22, status } };
}
var Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { status } = $$props;
  let { error: error22 } = $$props;
  if ($$props.status === void 0 && $$bindings.status && status !== void 0)
    $$bindings.status(status);
  if ($$props.error === void 0 && $$bindings.error && error22 !== void 0)
    $$bindings.error(error22);
  return `<h1>${escape2(status)}</h1>

<pre>${escape2(error22.message)}</pre>



${error22.frame ? `<pre>${escape2(error22.frame)}</pre>` : ``}
${error22.stack ? `<pre>${escape2(error22.stack)}</pre>` : ``}`;
});
var error2 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Error$1,
  load
});
var css$e = {
  code: ".ribbon.svelte-i8k0fp.svelte-i8k0fp{background-image:linear-gradient(45deg, #e08f59, #F89157, #e16d6d);height:88px;max-width:1300px;margin:0 auto;display:flex;justify-content:center;padding:0;text-transform:uppercase;list-style-type:none;color:white;font-weight:bold;font-size:13.5px}.ribbon.svelte-i8k0fp li.svelte-i8k0fp{padding:13px 32px 0;position:relative;line-height:68px}.ribbon.svelte-i8k0fp li i.svelte-i8k0fp{font-size:37px;position:relative;top:4px;left:-9px;display:block;float:left}.ribbon.svelte-i8k0fp li:first-child i.svelte-i8k0fp{font-size:65px;line-height:37px;top:0}nav.svelte-i8k0fp.svelte-i8k0fp{margin-top:62px}nav.svelte-i8k0fp ul.svelte-i8k0fp{list-style-type:none;padding:0;display:flex;margin:0 auto;justify-content:center}nav.svelte-i8k0fp ul button.svelte-i8k0fp{display:block;background-color:white;width:10px;height:10px;margin:0 6px;border-radius:50%;border:none;padding:0}nav.svelte-i8k0fp ul button.selected.svelte-i8k0fp{background-color:#ffcb66}section.svelte-i8k0fp.svelte-i8k0fp{max-width:1300px;margin:0 auto;padding:22px 0;background-image:linear-gradient(to bottom, #738dc8, #738dc8), linear-gradient(to top, #000, #1b2952);height:363px}section.svelte-i8k0fp .content.svelte-i8k0fp{width:762px;margin:0 auto;position:relative}h1.svelte-i8k0fp.svelte-i8k0fp{font-size:60px;line-height:70px;color:white;font-weight:300;margin:35px 0 4px;max-width:578px}h2.svelte-i8k0fp.svelte-i8k0fp{color:#ffcb66;font-weight:300;font-size:45px;margin:0}h2.svelte-i8k0fp strong.svelte-i8k0fp{font-weight:300;font-size:60px}section.svelte-i8k0fp .content img.svelte-i8k0fp{display:block;position:absolute;right:8px;top:-40px}section.svelte-i8k0fp .content p.svelte-i8k0fp{margin-top:17px}",
  map: `{"version":3,"file":"OffersBanner.svelte","sources":["OffersBanner.svelte"],"sourcesContent":["<section>\\r\\n\\t<div class='content'>\\r\\n\\t\\t<h1>Lorem ipsum dolor sit amet. </h1>\\r\\n\\t\\t<h2>Desc. <strong>50%</strong></h2>\\r\\n\\t\\t<p><a href='/' class='button'>Comprar ahora </a></p>\\r\\n\\t\\t<img src='/img/temp/ad.png' alt='anncio' />\\r\\n\\t</div>\\r\\n\\t<nav>\\r\\n\\t\\t<ul>\\r\\n\\t\\t\\t<li><button></button></li>\\r\\n\\t\\t\\t<li><button></button></li>\\r\\n\\t\\t\\t<li><button class='selected'></button></li>\\r\\n\\t\\t</ul>\\r\\n\\t</nav>\\r\\n</section>\\r\\n<ul class='ribbon'>\\r\\n\\t<li><i class='icon-envios-01'></i>Env\xEDos Gratis</li>\\r\\n\\t<li><i class='icon-devolu-01'></i>Devoluci\xF3n sin costo</li>\\r\\n\\t<li><i class='icon-tarjeta-01'></i>Meses sin intereses</li>\\r\\n\\t<li><i class='icon-garantia-01'></i>Garant\xEDa de un a\xF1o</li>\\r\\n</ul>\\r\\n<style >\\t\\r\\n\\t.ribbon{\\r\\n\\t\\tbackground-image: linear-gradient(45deg, #e08f59, #F89157, #e16d6d);\\r\\n\\t\\theight: 88px;\\r\\n\\t\\tmax-width: 1300px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tdisplay: flex;\\r\\n  \\t\\tjustify-content: center;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tfont-size: 13.5px;\\r\\n\\t}\\r\\n\\t.ribbon li{\\r\\n\\t\\tpadding: 13px 32px 0;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tline-height: 68px;\\r\\n\\t}\\r\\n\\t.ribbon li i{\\r\\n\\t\\tfont-size: 37px;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\ttop: 4px;\\r\\n\\t\\tleft: -9px;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tfloat: left;\\r\\n\\t}\\r\\n\\t.ribbon li:first-child i{\\r\\n\\t\\tfont-size: 65px;\\r\\n\\t\\tline-height: 37px;\\r\\n\\t\\ttop: 0;\\r\\n\\t}\\r\\n\\tnav{\\r\\n\\t\\tmargin-top: 62px;\\r\\n\\t}\\r\\n\\tnav ul{\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tjustify-content: center;\\r\\n\\t}\\r\\n\\tnav ul button{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tbackground-color: white;\\r\\n\\t\\twidth: 10px;\\r\\n\\t\\theight: 10px;\\r\\n\\t\\tmargin: 0 6px;\\r\\n\\t\\tborder-radius: 50%;\\r\\n\\t\\tborder: none;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\tnav ul button.selected{\\r\\n\\t\\tbackground-color: #ffcb66;\\r\\n\\t}\\r\\n\\r\\n\\tsection{\\r\\n\\t\\tmax-width: 1300px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tpadding: 22px 0;\\r\\n\\t\\tbackground-image: linear-gradient(to bottom, #738dc8, #738dc8), linear-gradient(to top, #000, #1b2952);\\r\\n\\t\\theight: 363px;\\r\\n\\t}\\r\\n\\tsection .content{\\r\\n\\t\\twidth: 762px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tposition:  relative;\\r\\n\\t}\\r\\n\\th1{\\r\\n\\t\\tfont-size: 60px;\\r\\n\\t\\tline-height: 70px;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tmargin: 35px 0 4px;\\r\\n\\t\\tmax-width: 578px;\\r\\n\\t}\\r\\n\\th2{\\r\\n\\t\\tcolor: #ffcb66;\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tfont-size: 45px;\\r\\n\\t\\tmargin: 0;\\r\\n\\t}\\r\\n\\th2 strong{\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tfont-size: 60px;\\r\\n\\t}\\r\\n\\tsection .content img{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\tright: 8px;\\r\\n\\t\\ttop: -40px;\\r\\n\\t}\\r\\n\\tsection .content p{\\r\\n\\t\\tmargin-top: 17px;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAsBC,mCAAO,CAAC,AACP,gBAAgB,CAAE,gBAAgB,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CACnE,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CACX,eAAe,CAAE,MAAM,CACzB,OAAO,CAAE,CAAC,CACV,cAAc,CAAE,SAAS,CACzB,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,AAClB,CAAC,AACD,qBAAO,CAAC,gBAAE,CAAC,AACV,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CACpB,QAAQ,CAAE,QAAQ,CAClB,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,qBAAO,CAAC,EAAE,CAAC,eAAC,CAAC,AACZ,SAAS,CAAE,IAAI,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,IAAI,CACV,OAAO,CAAE,KAAK,CACd,KAAK,CAAE,IAAI,AACZ,CAAC,AACD,qBAAO,CAAC,EAAE,YAAY,CAAC,eAAC,CAAC,AACxB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,GAAG,CAAE,CAAC,AACP,CAAC,AACD,+BAAG,CAAC,AACH,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,iBAAG,CAAC,gBAAE,CAAC,AACN,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CAAC,CACV,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,eAAe,CAAE,MAAM,AACxB,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,oBAAM,CAAC,AACb,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,KAAK,CACvB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,CAAC,CAAC,GAAG,CACb,aAAa,CAAE,GAAG,CAClB,MAAM,CAAE,IAAI,CACZ,OAAO,CAAE,CAAC,AACX,CAAC,AACD,iBAAG,CAAC,EAAE,CAAC,MAAM,uBAAS,CAAC,AACtB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AAED,mCAAO,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,MAAM,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,gBAAgB,EAAE,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,CACtG,MAAM,CAAE,KAAK,AACd,CAAC,AACD,qBAAO,CAAC,sBAAQ,CAAC,AAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,QAAQ,CAAG,QAAQ,AACpB,CAAC,AACD,8BAAE,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,GAAG,CAClB,SAAS,CAAE,KAAK,AACjB,CAAC,AACD,8BAAE,CAAC,AACF,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,CAAC,AACV,CAAC,AACD,gBAAE,CAAC,oBAAM,CAAC,AACT,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,qBAAO,CAAC,QAAQ,CAAC,iBAAG,CAAC,AACpB,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,GAAG,CACV,GAAG,CAAE,KAAK,AACX,CAAC,AACD,qBAAO,CAAC,QAAQ,CAAC,eAAC,CAAC,AAClB,UAAU,CAAE,IAAI,AACjB,CAAC"}`
};
var OffersBanner = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$e);
  return `<section class="${"svelte-i8k0fp"}"><div class="${"content svelte-i8k0fp"}"><h1 class="${"svelte-i8k0fp"}">Lorem ipsum dolor sit amet. </h1>
		<h2 class="${"svelte-i8k0fp"}">Desc. <strong class="${"svelte-i8k0fp"}">50%</strong></h2>
		<p class="${"svelte-i8k0fp"}"><a href="${"/"}" class="${"button"}">Comprar ahora </a></p>
		<img src="${"/img/temp/ad.png"}" alt="${"anncio"}" class="${"svelte-i8k0fp"}"></div>
	<nav class="${"svelte-i8k0fp"}"><ul class="${"svelte-i8k0fp"}"><li><button class="${"svelte-i8k0fp"}"></button></li>
			<li><button class="${"svelte-i8k0fp"}"></button></li>
			<li><button class="${"selected svelte-i8k0fp"}"></button></li></ul></nav></section>
<ul class="${"ribbon svelte-i8k0fp"}"><li class="${"svelte-i8k0fp"}"><i class="${"icon-envios-01 svelte-i8k0fp"}"></i>Env\xEDos Gratis</li>
	<li class="${"svelte-i8k0fp"}"><i class="${"icon-devolu-01 svelte-i8k0fp"}"></i>Devoluci\xF3n sin costo</li>
	<li class="${"svelte-i8k0fp"}"><i class="${"icon-tarjeta-01 svelte-i8k0fp"}"></i>Meses sin intereses</li>
	<li class="${"svelte-i8k0fp"}"><i class="${"icon-garantia-01 svelte-i8k0fp"}"></i>Garant\xEDa de un a\xF1o</li>
</ul>`;
});
var css$d = {
  code: "section.svelte-qirz3y.svelte-qirz3y{padding-top:29px;max-width:1344px;margin:0 auto}nav.svelte-qirz3y.svelte-qirz3y{display:flex;margin-top:-4px}nav.svelte-qirz3y a.svelte-qirz3y{display:block;position:relative;background-color:#a198ca;text-align:center;flex:1;height:116px;margin-right:15px;border-radius:20px}nav.svelte-qirz3y a.svelte-qirz3y:last-child{margin-right:0}nav.svelte-qirz3y a img.svelte-qirz3y{position:absolute;bottom:0;margin:0 auto;left:0;right:0}nav.svelte-qirz3y a span.svelte-qirz3y{position:relative;color:white;text-transform:uppercase;font-weight:bold;top:50px}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+2){background-color:#ca98c4}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+3){background-color:#e96473}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+4){background-color:#f99755}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+5){background-color:#f9c555}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+6){background-color:#78ba54}nav.svelte-qirz3y a.svelte-qirz3y:nth-child(7n+7){background-color:#00D9D1}",
  map: `{"version":3,"file":"ProductRibbon.svelte","sources":["ProductRibbon.svelte"],"sourcesContent":["<section>\\r\\n\\t<h3 class='strike-header'><span>Productos</span></h3>\\r\\n\\t<nav>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-16.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Sillas</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-17.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Escritorios</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-18.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Met\xE1licos</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-6.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Promociones</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-19.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Restaurantes</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-21.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Escolar</span>\\r\\n\\t\\t</a>\\r\\n\\t\\t<a href='/'>\\r\\n\\t\\t\\t<img src='/img/temp/layer-20.png' alt='sillas' />\\r\\n\\t\\t\\t<span>Complementos</span>\\r\\n\\t\\t</a>\\r\\n\\t</nav>\\r\\n</section>\\r\\n<style >\\r\\n\\tsection{\\r\\n\\t\\tpadding-top: 29px;\\r\\n\\t\\tmax-width: 1344px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\tnav{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmargin-top: -4px;\\r\\n\\t}\\r\\n\\tnav a{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tbackground-color: #a198ca;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tflex: 1;\\r\\n\\t\\theight: 116px;\\r\\n\\t\\tmargin-right: 15px;\\r\\n\\t\\tborder-radius: 20px;\\r\\n\\t}\\r\\n\\tnav a:last-child{\\r\\n\\t\\tmargin-right: 0;\\r\\n\\t}\\r\\n\\tnav a img{\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\tbottom: 0;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tleft: 0;\\r\\n\\t\\tright: 0;\\r\\n\\t}\\r\\n\\tnav a span{\\r\\n\\t\\tposition: relative;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\ttop: 50px;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+2){\\r\\n\\t\\tbackground-color: #ca98c4;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+3){\\r\\n\\t\\tbackground-color: #e96473;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+4){\\r\\n\\t\\tbackground-color: #f99755;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+5){\\r\\n\\t\\tbackground-color: #f9c555;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+6){\\r\\n\\t\\tbackground-color: #78ba54;\\r\\n\\t}\\r\\n\\tnav a:nth-child(7n+7){\\r\\n\\t\\tbackground-color: #00D9D1;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAkCC,mCAAO,CAAC,AACP,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AACD,+BAAG,CAAC,AACH,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,iBAAG,CAAC,eAAC,CAAC,AACL,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,gBAAgB,CAAE,OAAO,CACzB,UAAU,CAAE,MAAM,CAClB,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,KAAK,CACb,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,AACpB,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,CAAC,AAChB,YAAY,CAAE,CAAC,AAChB,CAAC,AACD,iBAAG,CAAC,CAAC,CAAC,iBAAG,CAAC,AACT,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,IAAI,CAAE,CAAC,CACP,KAAK,CAAE,CAAC,AACT,CAAC,AACD,iBAAG,CAAC,CAAC,CAAC,kBAAI,CAAC,AACV,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,cAAc,CAAE,SAAS,CACzB,WAAW,CAAE,IAAI,CACjB,GAAG,CAAE,IAAI,AACV,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC,AACD,iBAAG,CAAC,eAAC,WAAW,IAAI,CAAC,CAAC,AACrB,gBAAgB,CAAE,OAAO,AAC1B,CAAC"}`
};
var ProductRibbon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$d);
  return `<section class="${"svelte-qirz3y"}"><h3 class="${"strike-header"}"><span>Productos</span></h3>
	<nav class="${"svelte-qirz3y"}"><a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-16.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Sillas</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-17.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Escritorios</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-18.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Met\xE1licos</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-6.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Promociones</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-19.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Restaurantes</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-21.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Escolar</span></a>
		<a href="${"/"}" class="${"svelte-qirz3y"}"><img src="${"/img/temp/layer-20.png"}" alt="${"sillas"}" class="${"svelte-qirz3y"}">
			<span class="${"svelte-qirz3y"}">Complementos</span></a></nav>
</section>`;
});
var css$c = {
  code: "article.svelte-mau5ue.svelte-mau5ue{background-color:white;border-radius:20px;width:calc(33.33% - 17.33px);margin-right:26px;margin-bottom:28px;min-width:410px}article.svelte-mau5ue.svelte-mau5ue:nth-child(3n+3){margin-right:0}article.svelte-mau5ue header.svelte-mau5ue{display:flex;color:#757575;font-weight:bold;font-size:13px;padding:30px 21px 26px}article.svelte-mau5ue header .category.svelte-mau5ue{flex:1}article.svelte-mau5ue header .tag.svelte-mau5ue{display:block;background-color:#76c082;color:#206a2c;padding:0 17px;line-height:25px;font-size:11px;text-transform:uppercase;margin-top:-6px}article.svelte-mau5ue img.svelte-mau5ue{max-height:240px;width:auto;height:auto}h4.svelte-mau5ue.svelte-mau5ue{font-size:15px;font-weight:bold;color:#757575;line-height:23px;margin:5px 40px 0px}h5.svelte-mau5ue.svelte-mau5ue{font-size:13px;line-height:20px;font-weight:bold;margin:0 40px}p.svelte-mau5ue.svelte-mau5ue{margin:0}.price.svelte-mau5ue.svelte-mau5ue{margin:1px 40px}.options.svelte-mau5ue.svelte-mau5ue{margin:18px 40px 35px}.options.svelte-mau5ue .button.svelte-mau5ue{display:inline-block;font-size:11.5px;padding:12px 19px 9px;text-align:center}.options.svelte-mau5ue .button.svelte-mau5ue:first-child{margin-right:12px}",
  map: `{"version":3,"file":"ProductSummary.svelte","sources":["ProductSummary.svelte"],"sourcesContent":["<script>\\r\\n\\texport let product;\\r\\n<\/script>\\r\\n<article>\\r\\n    <header>\\r\\n        <p class='category'>Ejecutivas</p>\\r\\n        <p class='tag'>50% de desc.</p>\\r\\n    </header>\\r\\n    <p class='center'><img src='/img/temp/product{product}.png' alt='{product}'/></p>\\r\\n    <h4>OMNIA</h4>\\r\\n    <h5>SKU: AL-2627</h5>\\r\\n    <p class='price'>\\r\\n        <strong>$6,128.44 mx</strong>\\r\\n        <span class='original-price'>$8,128.44 mx</span>\\r\\n    </p>\\r\\n    <p class='options'>\\r\\n        <a href='/' class='button mute'>A\xF1adir al carrito </a>\\r\\n        <a href='/' class='button'>Comprar ahora </a>\\r\\n    </p>\\r\\n</article>\\r\\n<style>\\r\\n\\tarticle{\\r\\n\\t\\tbackground-color: white;\\r\\n\\t\\tborder-radius: 20px;\\r\\n\\t\\twidth: calc(33.33% - 17.33px);\\r\\n\\t\\tmargin-right: 26px;\\r\\n\\t\\tmargin-bottom: 28px;\\r\\n\\t\\tmin-width: 410px;\\r\\n\\t}\\r\\n\\tarticle:nth-child(3n+3){\\r\\n\\t\\tmargin-right: 0;\\r\\n\\t}\\r\\n\\r\\n\\tarticle header{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tcolor: #757575;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tfont-size: 13px;\\r\\n\\t\\tpadding: 30px 21px 26px;\\r\\n\\t}\\r\\n\\tarticle header .category{\\r\\n\\t\\tflex: 1;\\r\\n\\t}\\r\\n\\tarticle header .tag{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tbackground-color: #76c082;\\r\\n\\t\\tcolor: #206a2c;\\r\\n\\t\\tpadding: 0 17px;\\r\\n\\t\\tline-height: 25px;\\r\\n\\t\\tfont-size: 11px;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tmargin-top: -6px;\\r\\n\\t}\\r\\n\\tarticle img{\\r\\n\\t\\tmax-height: 240px;\\r\\n\\t\\twidth: auto;\\r\\n\\t\\theight: auto;\\r\\n\\t}\\r\\n\\th4{\\r\\n\\t\\tfont-size: 15px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tcolor: #757575;\\r\\n\\t\\tline-height: 23px;\\r\\n\\t\\tmargin: 5px 40px 0px;\\r\\n\\t}\\r\\n\\th5{\\r\\n\\t\\tfont-size: 13px;\\r\\n\\t\\tline-height: 20px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tmargin: 0 40px;\\r\\n\\t}\\r\\n\\tp{\\r\\n\\t\\tmargin: 0;\\r\\n\\t}\\r\\n\\t.price {\\r\\n\\t    margin: 1px 40px;\\r\\n\\t}\\r\\n\\t.options{\\r\\n\\t\\tmargin: 18px 40px 35px;\\r\\n\\t}\\r\\n\\t.options .button{\\r\\n\\t\\tdisplay: inline-block;\\r\\n\\t\\tfont-size: 11.5px;\\r\\n\\t\\tpadding: 12px 19px 9px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t}\\r\\n\\t.options .button:first-child{\\r\\n\\t\\tmargin-right: 12px;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAqBC,mCAAO,CAAC,AACP,gBAAgB,CAAE,KAAK,CACvB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,MAAM,CAAC,CAAC,CAAC,OAAO,CAAC,CAC7B,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,IAAI,CACnB,SAAS,CAAE,KAAK,AACjB,CAAC,AACD,mCAAO,WAAW,IAAI,CAAC,CAAC,AACvB,YAAY,CAAE,CAAC,AAChB,CAAC,AAED,qBAAO,CAAC,oBAAM,CAAC,AACd,OAAO,CAAE,IAAI,CACb,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,AACxB,CAAC,AACD,qBAAO,CAAC,MAAM,CAAC,uBAAS,CAAC,AACxB,IAAI,CAAE,CAAC,AACR,CAAC,AACD,qBAAO,CAAC,MAAM,CAAC,kBAAI,CAAC,AACnB,OAAO,CAAE,KAAK,CACd,gBAAgB,CAAE,OAAO,CACzB,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,SAAS,CACzB,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,qBAAO,CAAC,iBAAG,CAAC,AACX,UAAU,CAAE,KAAK,CACjB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACb,CAAC,AACD,8BAAE,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,GAAG,AACrB,CAAC,AACD,CAAC,6BAAC,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AACD,6BAAC,CAAC,AACD,MAAM,CAAE,CAAC,AACV,CAAC,AACD,MAAM,4BAAC,CAAC,AACJ,MAAM,CAAE,GAAG,CAAC,IAAI,AACpB,CAAC,AACD,oCAAQ,CAAC,AACR,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,AACvB,CAAC,AACD,sBAAQ,CAAC,qBAAO,CAAC,AAChB,OAAO,CAAE,YAAY,CACrB,SAAS,CAAE,MAAM,CACjB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,CACtB,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,sBAAQ,CAAC,qBAAO,YAAY,CAAC,AAC5B,YAAY,CAAE,IAAI,AACnB,CAAC"}`
};
var ProductSummary = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { product: product2 } = $$props;
  if ($$props.product === void 0 && $$bindings.product && product2 !== void 0)
    $$bindings.product(product2);
  $$result.css.add(css$c);
  return `<article class="${"svelte-mau5ue"}"><header class="${"svelte-mau5ue"}"><p class="${"category svelte-mau5ue"}">Ejecutivas</p>
        <p class="${"tag svelte-mau5ue"}">50% de desc.</p></header>
    <p class="${"center svelte-mau5ue"}"><img src="${"/img/temp/product" + escape2(product2) + ".png"}"${add_attribute("alt", product2, 0)} class="${"svelte-mau5ue"}"></p>
    <h4 class="${"svelte-mau5ue"}">OMNIA</h4>
    <h5 class="${"svelte-mau5ue"}">SKU: AL-2627</h5>
    <p class="${"price svelte-mau5ue"}"><strong>$6,128.44 mx</strong>
        <span class="${"original-price"}">$8,128.44 mx</span></p>
    <p class="${"options svelte-mau5ue"}"><a href="${"/"}" class="${"button mute svelte-mau5ue"}">A\xF1adir al carrito </a>
        <a href="${"/"}" class="${"button svelte-mau5ue"}">Comprar ahora </a></p>
</article>`;
});
var css$b = {
  code: ".container.svelte-1nzhtjz{padding-top:29px;max-width:1312px;margin:0 auto}section.svelte-1nzhtjz{display:flex;flex-wrap:wrap}",
  map: `{"version":3,"file":"ProductListing.svelte","sources":["ProductListing.svelte"],"sourcesContent":["<script>\\r\\n\\timport ProductSummary from '$lib/ProductSummary.svelte';\\r\\n\\texport let title;\\r\\n\\tconst products = [1,2,3,4,5,6];\\r\\n<\/script>\\r\\n<div class='container'>\\r\\n\\t<h3 class='strike-header'><span>{title}</span></h3>\\r\\n\\t<section>\\r\\n\\t\\t{#each products as product}\\r\\n\\t\\t\\t<ProductSummary {product} />\\r\\n\\t\\t{/each}\\r\\n\\t</section>\\r\\n</div>\\r\\n<style>\\r\\n\\t.container{\\r\\n\\t\\tpadding-top: 29px;\\r\\n\\t\\tmax-width: 1312px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t}\\r\\n\\tsection{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tflex-wrap: wrap;\\r\\n\\t}\\r\\n\\t\\r\\n</style>"],"names":[],"mappings":"AAcC,yBAAU,CAAC,AACV,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,AACf,CAAC,AACD,sBAAO,CAAC,AACP,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,AAChB,CAAC"}`
};
var ProductListing = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title } = $$props;
  const products = [1, 2, 3, 4, 5, 6];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$b);
  return `<div class="${"container svelte-1nzhtjz"}"><h3 class="${"strike-header"}"><span>${escape2(title)}</span></h3>
	<section class="${"svelte-1nzhtjz"}">${each(products, (product2) => `${validate_component(ProductSummary, "ProductSummary").$$render($$result, { product: product2 }, {}, {})}`)}</section>
</div>`;
});
var css$a = {
  code: "form.svelte-qgpiwi.svelte-qgpiwi{box-sizing:border-box;max-width:1308px;background-image:linear-gradient(to bottom, #2f68cc, #2f68cc), linear-gradient(to top, #000, #1b2952);margin:0 auto;color:white;padding:0 127px;display:flex;padding-bottom:41px}form.svelte-qgpiwi input.svelte-qgpiwi{color:white;border-bottom:3px solid white;margin:59px 0 0 24px;width:296px}form.svelte-qgpiwi input.svelte-qgpiwi::placeholder{color:white}form.svelte-qgpiwi input.button.svelte-qgpiwi{color:black;border:none;margin:62px 0 0 15px;width:auto;padding:11px 54px}form.svelte-qgpiwi h3.svelte-qgpiwi{font-size:29.5px;line-height:40px;font-weight:300;margin:51px 27px 0 0}form.svelte-qgpiwi h4.svelte-qgpiwi{font-weight:500;font-size:18px;margin:9px 0}",
  map: `{"version":3,"file":"SubscriptionForm.svelte","sources":["SubscriptionForm.svelte"],"sourcesContent":["<form action='/'>\\r\\n\\t<section>\\r\\n\\t\\t<h3>Suscribete a nuestro newsletter</h3>\\r\\n\\t\\t<h4>Recibe ofertas y contenido exclusivo</h4>\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t<input type=\\"text\\" name=\\"email\\" placeholder=\\"Escribe tu mail\\" class=\\"default-input\\" />\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t<input type=\\"submit\\" value=\\"Suscr\xEDbete\\"  class=\\"button\\" />\\r\\n\\t</section>\\r\\n</form>\\r\\n<style>\\r\\n\\tform{\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t\\tmax-width: 1308px; \\r\\n\\t\\tbackground-image: linear-gradient(to bottom, #2f68cc, #2f68cc), linear-gradient(to top, #000, #1b2952);\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tpadding: 0 127px;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tpadding-bottom: 41px;\\r\\n\\t}\\r\\n\\tform input{\\r\\n\\t\\tcolor: white;\\r\\n    \\tborder-bottom: 3px solid white;\\r\\n\\t\\tmargin: 59px 0 0 24px;\\r\\n\\t\\twidth: 296px;\\r\\n\\t}\\r\\n\\tform input::placeholder{\\r\\n\\t\\tcolor: white;\\r\\n\\t}\\r\\n\\tform input.button{\\r\\n\\t\\tcolor: black;\\r\\n\\t\\tborder: none;\\t\\t\\r\\n\\t\\tmargin: 62px 0 0 15px;\\r\\n\\t\\twidth: auto;\\r\\n\\t\\tpadding: 11px 54px;\\r\\n\\t}\\r\\n\\tform h3{\\r\\n\\t\\tfont-size: 29.5px;\\r\\n\\t\\tline-height: 40px;\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tmargin: 51px 27px 0 0;\\r\\n\\r\\n\\t}\\r\\n\\tform h4{\\r\\n\\t\\tfont-weight: 500;\\r\\n\\t\\tfont-size: 18px;\\r\\n\\t\\tmargin: 9px 0;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAaC,gCAAI,CAAC,AACJ,UAAU,CAAE,UAAU,CACtB,SAAS,CAAE,MAAM,CACjB,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,MAAM,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,gBAAgB,EAAE,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,CACtG,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,CAAC,CAAC,KAAK,CAChB,OAAO,CAAE,IAAI,CACb,cAAc,CAAE,IAAI,AACrB,CAAC,AACD,kBAAI,CAAC,mBAAK,CAAC,AACV,KAAK,CAAE,KAAK,CACT,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACjC,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACrB,KAAK,CAAE,KAAK,AACb,CAAC,AACD,kBAAI,CAAC,mBAAK,aAAa,CAAC,AACvB,KAAK,CAAE,KAAK,AACb,CAAC,AACD,kBAAI,CAAC,KAAK,qBAAO,CAAC,AACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CACrB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,CAAC,IAAI,AACnB,CAAC,AACD,kBAAI,CAAC,gBAAE,CAAC,AACP,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,CAChB,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,AAEtB,CAAC,AACD,kBAAI,CAAC,gBAAE,CAAC,AACP,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,GAAG,CAAC,CAAC,AACd,CAAC"}`
};
var SubscriptionForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$a);
  return `<form action="${"/"}" class="${"svelte-qgpiwi"}"><section><h3 class="${"svelte-qgpiwi"}">Suscribete a nuestro newsletter</h3>
		<h4 class="${"svelte-qgpiwi"}">Recibe ofertas y contenido exclusivo</h4></section>
	<section><input type="${"text"}" name="${"email"}" placeholder="${"Escribe tu mail"}" class="${"default-input svelte-qgpiwi"}"></section>
	<section><input type="${"submit"}" value="${"Suscr\xEDbete"}" class="${"button svelte-qgpiwi"}"></section>
</form>`;
});
var css$9 = {
  code: "section.svelte-m5fra7{width:100%;margin:46px auto;padding:30px 0 3px;box-sizing:border-box;position:relative}section.svelte-m5fra7:before{width:100%;height:415px;position:absolute;top:0;content:'';background-image:linear-gradient(to left, #e16d6d, #e08f59), linear-gradient(to left, #001a47, #001a47);z-index:0}.products.svelte-m5fra7{display:flex;max-width:1311px;margin:0 auto;z-index:1;position:relative}h3.svelte-m5fra7{color:white;text-transform:uppercase;font-size:20px;letter-spacing:1.5px;margin:8px auto 39px;max-width:660px;display:block;text-align:center;z-index:1;position:relative}",
  map: `{"version":3,"file":"ProductSlider.svelte","sources":["ProductSlider.svelte"],"sourcesContent":["<script >\\r\\n\\timport ProductSummary from '$lib/ProductSummary.svelte';\\r\\n\\texport let title = 'Nuevos dise\xF1os';\\r\\n\\tlet products = [7,8,9]\\r\\n<\/script>\\r\\n<section>\\r\\n\\t<h3>{title}</h3>\\r\\n\\t<div class='products'>\\r\\n\\t\\t{#each products as product}\\r\\n\\t\\t\\t<ProductSummary {product}/>\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</section>\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\tmargin: 46px auto;\\r\\n\\t\\tpadding: 30px 0 3px;\\t\\t\\r\\n\\t\\tbox-sizing: border-box;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\tsection:before{\\r\\n\\t\\twidth: 100%;\\r\\n\\t\\theight: 415px;\\r\\n\\t\\tposition: absolute;\\r\\n\\t\\ttop: 0;\\r\\n\\t\\tcontent: '';\\r\\n\\t\\tbackground-image: linear-gradient(to left, #e16d6d, #e08f59), linear-gradient(to left, #001a47, #001a47);\\r\\n\\t\\tz-index: 0;\\r\\n\\r\\n\\t}\\r\\n\\t.products{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmax-width: 1311px;\\r\\n\\t\\tmargin: 0 auto;\\r\\n\\t\\tz-index: 1;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\th3{\\r\\n\\t\\tcolor: white;\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tfont-size: 20px;\\r\\n\\t\\tletter-spacing: 1.5px;\\r\\n\\t\\tmargin: 8px auto 39px;\\r\\n\\t\\tmax-width: 660px;\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tz-index: 1;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAcC,qBAAO,CAAC,AACP,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,GAAG,CACnB,UAAU,CAAE,UAAU,CACtB,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,qBAAO,OAAO,CAAC,AACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,EAAE,CACX,gBAAgB,CAAE,gBAAgB,EAAE,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,CAAC,gBAAgB,EAAE,CAAC,IAAI,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CACxG,OAAO,CAAE,CAAC,AAEX,CAAC,AACD,uBAAS,CAAC,AACT,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,gBAAE,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,KAAK,CACrB,MAAM,CAAE,GAAG,CAAC,IAAI,CAAC,IAAI,CACrB,SAAS,CAAE,KAAK,CAChB,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,QAAQ,AACnB,CAAC"}`
};
var ProductSlider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "Nuevos dise\xF1os" } = $$props;
  let products = [7, 8, 9];
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  $$result.css.add(css$9);
  return `<section class="${"svelte-m5fra7"}"><h3 class="${"svelte-m5fra7"}">${escape2(title)}</h3>
	<div class="${"products svelte-m5fra7"}">${each(products, (product2) => `${validate_component(ProductSummary, "ProductSummary").$$render($$result, { product: product2 }, {}, {})}`)}</div>
</section>`;
});
var css$8 = {
  code: "section.svelte-74wzye.svelte-74wzye{background-image:linear-gradient(45deg, #396BC2, #688ECC, #00477D);color:white;padding:9px 0 3px}section.svelte-74wzye div.svelte-74wzye{max-width:1143px;margin:10px auto;display:flex;justify-content:space-between}h3.svelte-74wzye.svelte-74wzye{color:white;font-weight:300;font-size:28px;max-width:400px;line-height:38px;margin-left:22px}h4.svelte-74wzye.svelte-74wzye{font-size:15.3px;line-height:18.5px;font-weight:bold;margin-bottom:12px}article.svelte-74wzye.svelte-74wzye{margin-top:38px}article.svelte-74wzye.svelte-74wzye:last-child{padding-right:0}article.svelte-74wzye p.svelte-74wzye{font-size:14.5px;line-height:1.28;margin:10px 0}",
  map: '{"version":3,"file":"ContactRibbon.svelte","sources":["ContactRibbon.svelte"],"sourcesContent":["<section>\\r\\n\\t<div>\\r\\n\\t\\t<h3>Contactanos para mayor informaci\xF3n o cotizar piezas de mayoreo</h3>\\r\\n\\t\\t<article>\\r\\n\\t\\t\\t<h4>Gerente de Ventas</h4>\\r\\n\\t\\t\\t<p>ventas@manueldelgado.com</p>\\r\\n\\t\\t</article>\\r\\n\\t\\t<article>\\r\\n\\t\\t\\t<h4>Ventas de Mayoreo</h4>\\r\\n\\t\\t\\t<p>Tel. 55 7864 38373</p>\\r\\n\\t\\t</article>\\r\\n\\t\\t<article>\\r\\n\\t\\t\\t<h4>Directorio de Sucursales</h4>\\r\\n\\t\\t</article>\\r\\n\\t</div>\\r\\n</section>\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\tbackground-image: linear-gradient(45deg, #396BC2, #688ECC, #00477D);\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tpadding: 9px 0 3px;\\r\\n\\t}\\r\\n\\tsection div{\\r\\n\\t\\tmax-width: 1143px;\\r\\n\\t\\tmargin: 10px auto;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t}\\r\\n\\th3{\\r\\n\\t\\tcolor: white;\\r\\n\\t\\tfont-weight: 300;\\r\\n\\t\\tfont-size: 28px;\\r\\n\\t\\tmax-width: 400px;\\r\\n\\t\\tline-height: 38px;\\r\\n\\t\\tmargin-left: 22px;\\r\\n\\t}\\r\\n\\th4{\\r\\n\\t\\tfont-size: 15.3px;\\r\\n\\t\\tline-height: 18.5px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tmargin-bottom: 12px;\\r\\n\\t}\\r\\n\\tarticle{\\r\\n\\t\\tmargin-top: 38px;\\r\\n\\t}\\r\\n\\tarticle:last-child{\\r\\n\\t\\tpadding-right: 0;\\r\\n\\t}\\r\\n\\tarticle p{\\r\\n\\t\\tfont-size: 14.5px;\\r\\n\\t\\tline-height: 1.28;\\r\\n\\t\\tmargin: 10px 0;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAiBC,mCAAO,CAAC,AACP,gBAAgB,CAAE,gBAAgB,KAAK,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CAAC,OAAO,CAAC,CACnE,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,GAAG,CAAC,CAAC,CAAC,GAAG,AACnB,CAAC,AACD,qBAAO,CAAC,iBAAG,CAAC,AACX,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,AAC/B,CAAC,AACD,8BAAE,CAAC,AACF,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,GAAG,CAChB,SAAS,CAAE,IAAI,CACf,SAAS,CAAE,KAAK,CAChB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,8BAAE,CAAC,AACF,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,MAAM,CACnB,WAAW,CAAE,IAAI,CACjB,aAAa,CAAE,IAAI,AACpB,CAAC,AACD,mCAAO,CAAC,AACP,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,mCAAO,WAAW,CAAC,AAClB,aAAa,CAAE,CAAC,AACjB,CAAC,AACD,qBAAO,CAAC,eAAC,CAAC,AACT,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC"}'
};
var ContactRibbon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$8);
  return `<section class="${"svelte-74wzye"}"><div class="${"svelte-74wzye"}"><h3 class="${"svelte-74wzye"}">Contactanos para mayor informaci\xF3n o cotizar piezas de mayoreo</h3>
		<article class="${"svelte-74wzye"}"><h4 class="${"svelte-74wzye"}">Gerente de Ventas</h4>
			<p class="${"svelte-74wzye"}">ventas@manueldelgado.com</p></article>
		<article class="${"svelte-74wzye"}"><h4 class="${"svelte-74wzye"}">Ventas de Mayoreo</h4>
			<p class="${"svelte-74wzye"}">Tel. 55 7864 38373</p></article>
		<article class="${"svelte-74wzye"}"><h4 class="${"svelte-74wzye"}">Directorio de Sucursales</h4></article></div>
</section>`;
});
var prerender$2 = true;
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${$$result.head += `${$$result.title = `<title>In\xEDcio - Manuel Delgado</title>`, ""}`, ""}

${validate_component(OffersBanner, "OffersBanner").$$render($$result, {}, {}, {})}
${validate_component(ProductRibbon, "ProductRibbon").$$render($$result, {}, {}, {})}
${validate_component(ProductListing, "ProductListing").$$render($$result, { title: "Best Buys" }, {}, {})}
${validate_component(SubscriptionForm, "SubscriptionForm").$$render($$result, {}, {}, {})}
${validate_component(ProductSlider, "ProductSlider").$$render($$result, {}, {}, {})}
${validate_component(ContactRibbon, "ContactRibbon").$$render($$result, {}, {}, {})}`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes,
  prerender: prerender$2
});
var css$7 = {
  code: "p.svelte-180exj6{font-size:13px;font-weight:bold;color:#757575}a.svelte-180exj6{color:#757575}",
  map: `{"version":3,"file":"BreadCrumbs.svelte","sources":["BreadCrumbs.svelte"],"sourcesContent":["<script>\\r\\n\\texport let routes = [\\r\\n\\t\\t{label: 'Inicio', link: '/'},\\r\\n\\t\\t{label: 'Escritorios', link: '/product'},\\r\\n\\t]\\r\\n<\/script>\\r\\n<p>\\r\\n{#each routes as route, i }\\r\\n\\t<a href=\\"{route.link}\\">{route.label}</a>\\r\\n\\t{#if i !== routes.length - 1}\\r\\n\\t\\t&nbsp;/&nbsp;&nbsp;\\r\\n\\t{/if}\\r\\n{/each}\\r\\n</p>\\r\\n\\r\\n<style>\\r\\n\\tp{\\r\\n\\t\\tfont-size: 13px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tcolor: #757575;\\r\\n\\t}\\r\\n\\ta{\\r\\n\\t\\tcolor: #757575;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAgBC,gBAAC,CAAC,AACD,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,AACf,CAAC,AACD,gBAAC,CAAC,AACD,KAAK,CAAE,OAAO,AACf,CAAC"}`
};
var BreadCrumbs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { routes = [{ label: "Inicio", link: "/" }, { label: "Escritorios", link: "/product" }] } = $$props;
  if ($$props.routes === void 0 && $$bindings.routes && routes !== void 0)
    $$bindings.routes(routes);
  $$result.css.add(css$7);
  return `<p class="${"svelte-180exj6"}">${each(routes, (route, i) => `<a${add_attribute("href", route.link, 0)} class="${"svelte-180exj6"}">${escape2(route.label)}</a>
	${i !== routes.length - 1 ? `\xA0/\xA0\xA0` : ``}`)}
</p>`;
});
var css$6 = {
  code: "h4.svelte-te28r2.svelte-te28r2{text-transform:uppercase;color:#a2a2a2;font-weight:bold;font-size:11.5px;margin:12px 0 7px}section.svelte-te28r2.svelte-te28r2{display:flex}button.svelte-te28r2.svelte-te28r2{border:2px solid #B7B7B7;width:46px;text-align:center;font-size:30px;line-height:20px;margin:0;padding:0 12px;height:43px;border-radius:0}section.svelte-te28r2 div.svelte-te28r2{width:66px;text-align:center;line-height:39px;border-top:2px solid #B7B7B7;border-bottom:2px solid #B7B7B7;color:black;font-weight:bold}",
  map: '{"version":3,"file":"QuantityPicker.svelte","sources":["QuantityPicker.svelte"],"sourcesContent":["<script>\\r\\n\\texport let quantity = 1;\\r\\n<\/script>\\r\\n<article>\\r\\n\\t<h4>Cantidad</h4>\\r\\n\\t<section>\\r\\n\\t\\t<button>-</button>\\r\\n\\t\\t<div>{quantity}</div>\\r\\n\\t\\t<button>+</button>\\r\\n\\t</section>\\r\\n</article>\\r\\n<style>\\r\\n\\th4{\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tcolor: #a2a2a2;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tfont-size: 11.5px;\\r\\n\\t\\tmargin: 12px 0 7px;\\r\\n\\t}\\r\\n\\tsection{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t}\\r\\n\\tbutton{\\r\\n\\t\\tborder: 2px solid #B7B7B7;\\r\\n\\t\\twidth: 46px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tfont-size: 30px;\\r\\n\\t\\tline-height: 20px;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tpadding: 0 12px;\\r\\n\\t\\theight: 43px;\\r\\n\\t\\tborder-radius: 0;\\r\\n\\t}\\r\\n\\tsection div{\\r\\n\\t\\twidth: 66px;\\r\\n\\t\\ttext-align: center;\\r\\n\\t\\tline-height: 39px;\\r\\n\\t\\tborder-top: 2px solid #B7B7B7;\\r\\n\\t\\tborder-bottom: 2px solid #B7B7B7;\\r\\n\\t\\tcolor: black;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAYC,8BAAE,CAAC,AACF,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,GAAG,AACnB,CAAC,AACD,mCAAO,CAAC,AACP,OAAO,CAAE,IAAI,AACd,CAAC,AACD,kCAAM,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,MAAM,CAAE,IAAI,CACZ,aAAa,CAAE,CAAC,AACjB,CAAC,AACD,qBAAO,CAAC,iBAAG,CAAC,AACX,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAChC,KAAK,CAAE,KAAK,CACZ,WAAW,CAAE,IAAI,AAElB,CAAC"}'
};
var QuantityPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { quantity = 1 } = $$props;
  if ($$props.quantity === void 0 && $$bindings.quantity && quantity !== void 0)
    $$bindings.quantity(quantity);
  $$result.css.add(css$6);
  return `<article><h4 class="${"svelte-te28r2"}">Cantidad</h4>
	<section class="${"svelte-te28r2"}"><button class="${"svelte-te28r2"}">-</button>
		<div class="${"svelte-te28r2"}">${escape2(quantity)}</div>
		<button class="${"svelte-te28r2"}">+</button></section>
</article>`;
});
var css$5 = {
  code: "article.svelte-18zgchz.svelte-18zgchz{margin-left:40px}ul.svelte-18zgchz.svelte-18zgchz{list-style-type:none;display:flex;margin:0;padding:0}li.svelte-18zgchz button.svelte-18zgchz{width:44px;height:43px;border:2px solid #b6b6b6;margin:0 12px 0 0;border-radius:0}h4.svelte-18zgchz.svelte-18zgchz{text-transform:uppercase;color:#a2a2a2;font-weight:bold;font-size:11.5px;margin:12px 0 7px}li.svelte-18zgchz button.selected.svelte-18zgchz{border:6px solid #b6b6b6;width:57px;height:55px;margin-top:-6px;margin-left:-8px;margin-right:4px}",
  map: `{"version":3,"file":"ColorPicker.svelte","sources":["ColorPicker.svelte"],"sourcesContent":["<script>\\r\\n\\texport let options = ['#DA9458','#282828', '#634E41','#552A1A','#C9C3C3'];\\r\\n\\texport let selected = 1;\\r\\n<\/script>\\r\\n<article>\\r\\n\\t<h4>Color</h4>\\r\\n\\t<ul>\\r\\n\\t\\t{#each options as option,i}\\r\\n\\t\\t\\t<li><button style=\\"background: {option};\\" class:selected={i === selected}></button></li>\\t\\r\\n\\t\\t{/each}\\r\\n\\t</ul>\\r\\n</article>\\r\\n\\r\\n<style>\\r\\n\\tarticle{\\r\\n\\t\\tmargin-left: 40px;\\r\\n\\t}\\r\\n\\tul{\\r\\n\\t\\tlist-style-type: none;\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmargin: 0;\\r\\n\\t\\tpadding: 0;\\r\\n\\t}\\r\\n\\tli button{\\r\\n\\t\\twidth: 44px;\\r\\n\\t\\theight: 43px;\\r\\n\\t\\tborder: 2px solid #b6b6b6;\\r\\n\\t\\tmargin: 0 12px 0 0;\\r\\n\\t\\tborder-radius: 0;\\r\\n\\t}\\r\\n\\th4{\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tcolor: #a2a2a2;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\tfont-size: 11.5px;\\r\\n\\t\\tmargin: 12px 0 7px;\\r\\n\\t}\\r\\n\\tli button.selected{\\r\\n\\t\\tborder: 6px solid #b6b6b6;\\r\\n\\t\\twidth: 57px;\\r\\n\\t\\theight: 55px;\\r\\n\\t\\tmargin-top: -6px;\\r\\n\\t\\tmargin-left: -8px;\\r\\n\\t\\tmargin-right: 4px;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAcC,qCAAO,CAAC,AACP,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,gCAAE,CAAC,AACF,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACX,CAAC,AACD,iBAAE,CAAC,qBAAM,CAAC,AACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,MAAM,CAAE,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,CAClB,aAAa,CAAE,CAAC,AACjB,CAAC,AACD,gCAAE,CAAC,AACF,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,OAAO,CACd,WAAW,CAAE,IAAI,CACjB,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,GAAG,AACnB,CAAC,AACD,iBAAE,CAAC,MAAM,wBAAS,CAAC,AAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,IAAI,CAChB,WAAW,CAAE,IAAI,CACjB,YAAY,CAAE,GAAG,AAClB,CAAC"}`
};
var ColorPicker = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options: options2 = ["#DA9458", "#282828", "#634E41", "#552A1A", "#C9C3C3"] } = $$props;
  let { selected: selected2 = 1 } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options2 !== void 0)
    $$bindings.options(options2);
  if ($$props.selected === void 0 && $$bindings.selected && selected2 !== void 0)
    $$bindings.selected(selected2);
  $$result.css.add(css$5);
  return `<article class="${"svelte-18zgchz"}"><h4 class="${"svelte-18zgchz"}">Color</h4>
	<ul class="${"svelte-18zgchz"}">${each(options2, (option, i) => `<li class="${"svelte-18zgchz"}"><button style="${"background: " + escape2(option) + ";"}" class="${["svelte-18zgchz", i === selected2 ? "selected" : ""].join(" ").trim()}"></button></li>`)}</ul>
</article>`;
});
var css$4 = {
  code: "section.svelte-1az4jhk{margin-top:26px}article.svelte-1az4jhk{display:flex;justify-content:space-between;color:#757575;font-size:14px;border-top:2px solid #e4e4e4;padding-top:8px}article.svelte-1az4jhk:last-child{border-bottom:2px solid #e4e4e4}i.svelte-1az4jhk{font-size:30px;float:left;color:#a2a2a2;margin-right:8px;height:50px;position:relative;top:12px}i.icon-envios-01.svelte-1az4jhk{font-size:57px;float:left;top:-5px;height:50px}.label.svelte-1az4jhk{text-transform:uppercase;color:#a2a2a2;font-size:11.5px;font-weight:bold;top:17px;position:relative}.title.svelte-1az4jhk{font-weight:bold}button.svelte-1az4jhk{border:none;font-size:22px;background-color:transparent;margin-bottom:10px}",
  map: `{"version":3,"file":"PolicyInfo.svelte","sources":["PolicyInfo.svelte"],"sourcesContent":["<script>\\r\\n\\tlet policies = [\\r\\n\\t\\t{ icon: 'icon-envios-01', label: 'ENV\xCDOS GRATIS', title:'Politicas de envio'},\\r\\n\\t\\t{ icon: 'icon-devolu-01', label: 'DEVOLUCI\xD3N SIN COSTO', title:'Politicas de devoluci\xF3n'},\\r\\n\\t\\t{ icon: 'icon-garantia-01', label: 'GARANT\xCDA DE UN A\xD1O', title:'Nuestra garant\xEDa'},\\r\\n\\t]\\r\\n<\/script>\\r\\n<section>\\r\\n\\t{#each policies as policy}\\r\\n\\t\\t<article>\\r\\n\\t\\t\\t<div>\\r\\n\\t\\t\\t\\t<i class='{policy.icon}'></i>\\r\\n\\t\\t\\t\\t<span class='label'>{policy.label}</span>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t\\t<div>\\r\\n\\t\\t\\t\\t<span class='title'>{policy.title}</span>\\r\\n\\t\\t\\t\\t<button>+</button>\\r\\n\\t\\t\\t</div>\\r\\n\\t\\t</article>\\r\\n\\t{/each}\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\tmargin-top: 26px;\\r\\n\\t}\\r\\n\\tarticle{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tjustify-content: space-between;\\r\\n\\t\\tcolor: #757575;\\r\\n\\t\\tfont-size: 14px;\\r\\n\\t\\tborder-top: 2px solid #e4e4e4;\\r\\n\\t\\tpadding-top: 8px;\\r\\n\\t}\\r\\n\\tarticle:last-child{\\r\\n\\t\\tborder-bottom: 2px solid #e4e4e4;\\r\\n\\t}\\r\\n\\ti{\\r\\n\\t\\tfont-size: 30px;\\r\\n\\t\\tfloat:  left;\\r\\n\\t\\tcolor:  #a2a2a2;\\r\\n\\t\\tmargin-right: 8px;\\r\\n\\t\\theight: 50px;\\r\\n\\t\\tposition: relative;\\r\\n\\t\\ttop: 12px;\\r\\n\\t}\\r\\n\\ti.icon-envios-01{\\r\\n\\t\\tfont-size: 57px;\\r\\n\\t\\tfloat: left;\\r\\n\\t\\ttop: -5px;\\r\\n\\t\\theight: 50px;\\r\\n\\t}\\r\\n\\t.label{\\r\\n\\t\\ttext-transform: uppercase;\\r\\n\\t\\tcolor: #a2a2a2;\\r\\n\\t\\tfont-size: 11.5px;\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t\\ttop: 17px;\\r\\n\\t\\tposition: relative;\\r\\n\\t}\\r\\n\\t.title{\\r\\n\\t\\tfont-weight: bold;\\r\\n\\t}\\r\\n\\tbutton{\\r\\n\\t\\tborder: none;\\r\\n\\t\\tfont-size: 22px;\\r\\n\\t\\tbackground-color: transparent;\\r\\n\\t\\tmargin-bottom: 10px;\\r\\n\\t}\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAuBC,sBAAO,CAAC,AACP,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,sBAAO,CAAC,AACP,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,IAAI,CACf,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CAC7B,WAAW,CAAE,GAAG,AACjB,CAAC,AACD,sBAAO,WAAW,CAAC,AAClB,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,AACjC,CAAC,AACD,gBAAC,CAAC,AACD,SAAS,CAAE,IAAI,CACf,KAAK,CAAG,IAAI,CACZ,KAAK,CAAG,OAAO,CACf,YAAY,CAAE,GAAG,CACjB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,IAAI,AACV,CAAC,AACD,CAAC,8BAAe,CAAC,AAChB,SAAS,CAAE,IAAI,CACf,KAAK,CAAE,IAAI,CACX,GAAG,CAAE,IAAI,CACT,MAAM,CAAE,IAAI,AACb,CAAC,AACD,qBAAM,CAAC,AACN,cAAc,CAAE,SAAS,CACzB,KAAK,CAAE,OAAO,CACd,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,GAAG,CAAE,IAAI,CACT,QAAQ,CAAE,QAAQ,AACnB,CAAC,AACD,qBAAM,CAAC,AACN,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,qBAAM,CAAC,AACN,MAAM,CAAE,IAAI,CACZ,SAAS,CAAE,IAAI,CACf,gBAAgB,CAAE,WAAW,CAC7B,aAAa,CAAE,IAAI,AACpB,CAAC"}`
};
var PolicyInfo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let policies = [
    {
      icon: "icon-envios-01",
      label: "ENV\xCDOS GRATIS",
      title: "Politicas de envio"
    },
    {
      icon: "icon-devolu-01",
      label: "DEVOLUCI\xD3N SIN COSTO",
      title: "Politicas de devoluci\xF3n"
    },
    {
      icon: "icon-garantia-01",
      label: "GARANT\xCDA DE UN A\xD1O",
      title: "Nuestra garant\xEDa"
    }
  ];
  $$result.css.add(css$4);
  return `<section class="${"svelte-1az4jhk"}">${each(policies, (policy) => `<article class="${"svelte-1az4jhk"}"><div><i class="${escape2(null_to_empty(policy.icon)) + " svelte-1az4jhk"}"></i>
				<span class="${"label svelte-1az4jhk"}">${escape2(policy.label)}</span></div>
			<div><span class="${"title svelte-1az4jhk"}">${escape2(policy.title)}</span>
				<button class="${"svelte-1az4jhk"}">+</button></div>
		</article>`)}
</section>`;
});
var css$3 = {
  code: "section.svelte-a634ow.svelte-a634ow{margin:11px 0}.thumbs.svelte-a634ow.svelte-a634ow{display:flex;margin:17px 0}.thumbs.svelte-a634ow a.svelte-a634ow{display:block;margin-right:15px}.thumbs.svelte-a634ow a.selected.svelte-a634ow{border:3px solid #b7b7b7;margin:-3px 9px 0 -5px}.thumbs.svelte-a634ow a img.svelte-a634ow{display:block}",
  map: `{"version":3,"file":"ProductGallery.svelte","sources":["ProductGallery.svelte"],"sourcesContent":["<script>\\r\\n\\tlet images = [\\r\\n\\t\\t{thumb: '/img/temp/product0-thumb.png'},\\r\\n\\t\\t{thumb: '/img/temp/product0-thumb.png'},\\r\\n\\t\\t{thumb: '/img/temp/product0-thumb.png'},\\r\\n\\t\\t{thumb: '/img/temp/product0-thumb.png'},\\r\\n\\t]\\r\\n\\r\\n\\tlet selected = 2;\\r\\n\\r\\n<\/script>\\r\\n\\r\\n<section>\\r\\n\\t<img src='/img/temp/product0.png' alt='product 0' />\\r\\n\\t<div class='thumbs'>\\r\\n\\t\\t{#each images as image, i}\\r\\n\\t\\t\\t<a href='/' class:selected={i === selected}><img src='{image.thumb}' alt='thumbnail' /></a>\\r\\n\\t\\t{/each}\\r\\n\\t</div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n\\tsection{\\r\\n\\t\\tmargin: 11px 0;\\r\\n\\t}\\r\\n\\t.thumbs{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmargin: 17px 0;\\r\\n\\t}\\r\\n\\t.thumbs a{\\r\\n\\t\\tdisplay: block;\\r\\n\\t\\tmargin-right: 15px;\\r\\n\\t}\\r\\n\\t.thumbs a.selected{\\r\\n\\t\\tborder: 3px solid #b7b7b7;\\r\\n\\t\\tmargin: -3px 9px 0 -5px;\\r\\n\\t}\\r\\n\\t.thumbs a img{\\r\\n\\t\\tdisplay: block;\\r\\n\\t}\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAsBC,mCAAO,CAAC,AACP,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC,AACD,mCAAO,CAAC,AACP,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAAC,CAAC,AACf,CAAC,AACD,qBAAO,CAAC,eAAC,CAAC,AACT,OAAO,CAAE,KAAK,CACd,YAAY,CAAE,IAAI,AACnB,CAAC,AACD,qBAAO,CAAC,CAAC,uBAAS,CAAC,AAClB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,OAAO,CACzB,MAAM,CAAE,IAAI,CAAC,GAAG,CAAC,CAAC,CAAC,IAAI,AACxB,CAAC,AACD,qBAAO,CAAC,CAAC,CAAC,iBAAG,CAAC,AACb,OAAO,CAAE,KAAK,AACf,CAAC"}`
};
var selected = 2;
var ProductGallery = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let images = [
    { thumb: "/img/temp/product0-thumb.png" },
    { thumb: "/img/temp/product0-thumb.png" },
    { thumb: "/img/temp/product0-thumb.png" },
    { thumb: "/img/temp/product0-thumb.png" }
  ];
  $$result.css.add(css$3);
  return `<section class="${"svelte-a634ow"}"><img src="${"/img/temp/product0.png"}" alt="${"product 0"}">
	<div class="${"thumbs svelte-a634ow"}">${each(images, (image, i) => `<a href="${"/"}" class="${["svelte-a634ow", i === selected ? "selected" : ""].join(" ").trim()}"><img${add_attribute("src", image.thumb, 0)} alt="${"thumbnail"}" class="${"svelte-a634ow"}"></a>`)}</div>
</section>`;
});
var css$2 = {
  code: "main.svelte-1d56od4.svelte-1d56od4{display:flex;flex-wrap:wrap;flex-direction:row-reverse;justify-content:space-between}section.svelte-1d56od4.svelte-1d56od4:first-child{width:477px}h1.svelte-1d56od4.svelte-1d56od4{text-transform:uppercase;font-size:31px;margin:4px 0 0;color:#757575}h3.svelte-1d56od4.svelte-1d56od4{font-size:13px;font-weight:bold;margin:0;line-height:13px;color:#757575}h4.svelte-1d56od4.svelte-1d56od4{color:#757575;text-transform:uppercase}.options.svelte-1d56od4.svelte-1d56od4{display:flex}.tag.svelte-1d56od4.svelte-1d56od4{margin-top:16px}.price.svelte-1d56od4.svelte-1d56od4{margin:3px 0}.button.svelte-1d56od4.svelte-1d56od4{display:inline-block;font-size:11.5px;color:black;margin:27px 12px 10px 0;padding:12px 17px 9px 18px}.files.svelte-1d56od4.svelte-1d56od4{display:flex;margin:16px 0 45px}.files.svelte-1d56od4 .button.svelte-1d56od4{color:#a2a2a2;padding:12px 0 13px;width:162px;text-align:center}.description.svelte-1d56od4.svelte-1d56od4{font-size:13px}.description.svelte-1d56od4 p.svelte-1d56od4{margin:6px 0 22px;line-height:1.38}.description.svelte-1d56od4 ul.svelte-1d56od4{list-style-type:none;padding:0;line-height:1.58}.description.svelte-1d56od4 .note.svelte-1d56od4{font-size:11px;font-weight:bold;font-style:italic}",
  map: `{"version":3,"file":"ProductDetail.svelte","sources":["ProductDetail.svelte"],"sourcesContent":["<script>\\r\\n\\timport QuantityPicker from '$lib/QuantityPicker.svelte';\\r\\n\\timport ColorPicker from '$lib/ColorPicker.svelte';\\r\\n\\timport PolicyInfo from '$lib/PolicyInfo.svelte';\\r\\n\\timport ProductGallery from '$lib/ProductGallery.svelte';\\r\\n\\r\\n<\/script>\\r\\n<main>\\r\\n\\t<section>\\r\\n\\t\\t<h1>Mesa Multiusos</h1>\\r\\n\\t\\t<h3>SKU: AL-2627</h3>\\t\\t\\r\\n        \\r\\n        <p class='tag'>50% de desc.</p>\\r\\n        \\r\\n        <p class='price'>\\r\\n\\t        <strong>$6,128.44 mx</strong>\\r\\n\\t        <span class='original-price'>$8,128.44 mx</span>\\r\\n   \\t\\t</p>\\r\\n   \\t\\t\\r\\n   \\t\\t<div class='options'>\\r\\n\\t        <QuantityPicker />\\r\\n\\t        <ColorPicker />\\r\\n    \\t</div>\\r\\n\\r\\n\\t    <div class='cart-options'>\\r\\n\\t        <a href='/' class='button mute'>A\xF1adir al carrito </a>\\r\\n\\t        <a href='/' class='button'>Comprar ahora </a>\\r\\n\\t    </div>\\r\\n\\r\\n\\t    <PolicyInfo />\\r\\n\\t    \\r\\n\\t    <div class='files'>\\r\\n\\t\\t    <a href='/' class='button mute'>ficha tecnica</a>\\r\\n\\t\\t    <a href='/' class='button mute'>armado</a>\\r\\n\\t\\t</div>\\r\\n\\r\\n\\t\\t<div class='description'>\\r\\n\\t\\t    <h3>CARACTER\xCDSTICAS</h3>\\r\\n\\t\\t    <p>Las mesas multiusos son perfectas para adaptarse a cualquier situaci\xF3n, desde el hogar, como espacio de tareas para los estudiantes hasta las oficinas como \xE1reas de apoyo en impresi\xF3n y/o copiado, o bien, como funci\xF3n de retorno en los escritorios. </p>\\r\\n\\t\\t\\t<p>Definitivamente aportan la versatilidad que muchas empresas necesitan.</p>\\r\\n\\t\\t\\t<hr/>\\r\\n\\t\\t\\t<h4>CARACTER\xCDSTICAS T\xC9CNICAS</h4>\\r\\n\\t\\t\\t<ul>\\r\\n\\t\\t\\t\\t<li>F\xE1cil de armar. No necesita herramientas.</li>\\r\\n\\t\\t\\t\\t<li>Melamina termo-fusionada de 19 mm de espesor.</li>\\r\\n\\t\\t\\t\\t<li>Cantos protegidos con chapa cinta de PVC de 1 mm de espesor.</li>\\r\\n\\t\\t\\t\\t<li>Estructura tubular calibre 20.</li>\\r\\n\\t\\t\\t\\t<li>Estructura terminada en pintura ep\xF3xica texturizada en color.</li>\\r\\n\\t\\t\\t\\t<li>Regat\xF3n nivelador de altura 100% polipropileno.</li>\\r\\n\\t\\t\\t</ul>\\r\\n\\t\\t\\t<hr/>\\r\\n\\t\\t\\t<h4>Medidas</h4>\\r\\n\\t\\t\\t<ul>\\r\\n\\t\\t\\t\\t<li>Alto: 70 cm / 27.5 in</li>\\r\\n\\t\\t\\t\\t<li>Ancho: 120 cm / 47.2 in</li>\\r\\n\\t\\t\\t\\t<li>Profundo: 60 cm / 23.6 in</li>\\r\\n\\t\\t\\t\\t<li>*Consulta colores disponibles para entrega inmediata*</li>\\r\\n\\t\\t\\t</ul>\\r\\n\\t\\t\\t<p class='note'>Los precios no incluyen IVA</p>\\r\\n\\t\\t</div>\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t<ProductGallery />\\r\\n\\t</section>\\r\\n\\r\\n</main>\\r\\n\\r\\n<style>\\r\\nmain{\\r\\n\\tdisplay: flex;\\r\\n\\tflex-wrap: wrap;\\r\\n\\tflex-direction: row-reverse;\\r\\n\\tjustify-content: space-between;\\r\\n}\\r\\nsection:first-child{\\r\\n\\twidth: 477px;\\r\\n}\\t\\r\\nh1{\\r\\n\\ttext-transform: uppercase;\\r\\n\\tfont-size: 31px;\\r\\n\\tmargin: 4px 0 0;\\r\\n\\tcolor: #757575;\\r\\n}\\r\\nh3{\\r\\n\\tfont-size: 13px;\\r\\n\\tfont-weight: bold;\\r\\n\\tmargin: 0;\\r\\n\\tline-height: 13px;\\r\\n\\tcolor: #757575;\\r\\n}\\r\\nh4{\\r\\n\\tcolor: #757575;\\r\\n\\ttext-transform: uppercase;\\r\\n}\\r\\n.options{\\r\\n\\tdisplay: flex;\\r\\n}\\r\\n.tag{\\r\\n\\tmargin-top: 16px;\\r\\n}\\r\\n.price{\\r\\n\\tmargin: 3px 0;\\r\\n}\\r\\n.button{\\r\\n\\tdisplay: inline-block;\\r\\n\\tfont-size: 11.5px;\\r\\n\\tcolor: black;\\r\\n\\tmargin: 27px 12px 10px 0;\\r\\n\\tpadding: 12px 17px 9px 18px;\\r\\n}\\r\\n\\r\\n.files{\\r\\n\\tdisplay: flex;\\r\\n\\tmargin: 16px 0 45px;\\r\\n}\\r\\n.files .button{\\r\\n\\tcolor: #a2a2a2;\\r\\n\\tpadding: 12px 0 13px;\\r\\n\\twidth: 162px;\\r\\n\\ttext-align: center;\\r\\n}\\r\\n.description{\\r\\n\\tfont-size: 13px;\\r\\n}\\r\\n.description p{\\r\\n\\tmargin: 6px 0 22px;\\r\\n\\tline-height: 1.38;\\r\\n}\\r\\n.description ul{\\r\\n\\tlist-style-type: none;\\r\\n\\tpadding: 0;\\r\\n\\tline-height: 1.58;\\r\\n}\\r\\n.description .note{\\r\\n\\tfont-size: 11px;\\r\\n\\tfont-weight: bold;\\r\\n\\tfont-style: italic;\\r\\n}\\r\\n\\r\\n</style>"],"names":[],"mappings":"AAoEA,kCAAI,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,IAAI,CACf,cAAc,CAAE,WAAW,CAC3B,eAAe,CAAE,aAAa,AAC/B,CAAC,AACD,qCAAO,YAAY,CAAC,AACnB,KAAK,CAAE,KAAK,AACb,CAAC,AACD,gCAAE,CAAC,AACF,cAAc,CAAE,SAAS,CACzB,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,GAAG,CAAC,CAAC,CAAC,CAAC,CACf,KAAK,CAAE,OAAO,AACf,CAAC,AACD,gCAAE,CAAC,AACF,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,MAAM,CAAE,CAAC,CACT,WAAW,CAAE,IAAI,CACjB,KAAK,CAAE,OAAO,AACf,CAAC,AACD,gCAAE,CAAC,AACF,KAAK,CAAE,OAAO,CACd,cAAc,CAAE,SAAS,AAC1B,CAAC,AACD,sCAAQ,CAAC,AACR,OAAO,CAAE,IAAI,AACd,CAAC,AACD,kCAAI,CAAC,AACJ,UAAU,CAAE,IAAI,AACjB,CAAC,AACD,oCAAM,CAAC,AACN,MAAM,CAAE,GAAG,CAAC,CAAC,AACd,CAAC,AACD,qCAAO,CAAC,AACP,OAAO,CAAE,YAAY,CACrB,SAAS,CAAE,MAAM,CACjB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,CACxB,OAAO,CAAE,IAAI,CAAC,IAAI,CAAC,GAAG,CAAC,IAAI,AAC5B,CAAC,AAED,oCAAM,CAAC,AACN,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,AACpB,CAAC,AACD,qBAAM,CAAC,sBAAO,CAAC,AACd,KAAK,CAAE,OAAO,CACd,OAAO,CAAE,IAAI,CAAC,CAAC,CAAC,IAAI,CACpB,KAAK,CAAE,KAAK,CACZ,UAAU,CAAE,MAAM,AACnB,CAAC,AACD,0CAAY,CAAC,AACZ,SAAS,CAAE,IAAI,AAChB,CAAC,AACD,2BAAY,CAAC,gBAAC,CAAC,AACd,MAAM,CAAE,GAAG,CAAC,CAAC,CAAC,IAAI,CAClB,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,2BAAY,CAAC,iBAAE,CAAC,AACf,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,CAAC,CACV,WAAW,CAAE,IAAI,AAClB,CAAC,AACD,2BAAY,CAAC,oBAAK,CAAC,AAClB,SAAS,CAAE,IAAI,CACf,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACnB,CAAC"}`
};
var ProductDetail = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<main class="${"svelte-1d56od4"}"><section class="${"svelte-1d56od4"}"><h1 class="${"svelte-1d56od4"}">Mesa Multiusos</h1>
		<h3 class="${"svelte-1d56od4"}">SKU: AL-2627</h3>		
        
        <p class="${"tag svelte-1d56od4"}">50% de desc.</p>
        
        <p class="${"price svelte-1d56od4"}"><strong>$6,128.44 mx</strong>
	        <span class="${"original-price"}">$8,128.44 mx</span></p>
   		
   		<div class="${"options svelte-1d56od4"}">${validate_component(QuantityPicker, "QuantityPicker").$$render($$result, {}, {}, {})}
	        ${validate_component(ColorPicker, "ColorPicker").$$render($$result, {}, {}, {})}</div>

	    <div class="${"cart-options"}"><a href="${"/"}" class="${"button mute svelte-1d56od4"}">A\xF1adir al carrito </a>
	        <a href="${"/"}" class="${"button svelte-1d56od4"}">Comprar ahora </a></div>

	    ${validate_component(PolicyInfo, "PolicyInfo").$$render($$result, {}, {}, {})}
	    
	    <div class="${"files svelte-1d56od4"}"><a href="${"/"}" class="${"button mute svelte-1d56od4"}">ficha tecnica</a>
		    <a href="${"/"}" class="${"button mute svelte-1d56od4"}">armado</a></div>

		<div class="${"description svelte-1d56od4"}"><h3 class="${"svelte-1d56od4"}">CARACTER\xCDSTICAS</h3>
		    <p class="${"svelte-1d56od4"}">Las mesas multiusos son perfectas para adaptarse a cualquier situaci\xF3n, desde el hogar, como espacio de tareas para los estudiantes hasta las oficinas como \xE1reas de apoyo en impresi\xF3n y/o copiado, o bien, como funci\xF3n de retorno en los escritorios. </p>
			<p class="${"svelte-1d56od4"}">Definitivamente aportan la versatilidad que muchas empresas necesitan.</p>
			<hr>
			<h4 class="${"svelte-1d56od4"}">CARACTER\xCDSTICAS T\xC9CNICAS</h4>
			<ul class="${"svelte-1d56od4"}"><li>F\xE1cil de armar. No necesita herramientas.</li>
				<li>Melamina termo-fusionada de 19 mm de espesor.</li>
				<li>Cantos protegidos con chapa cinta de PVC de 1 mm de espesor.</li>
				<li>Estructura tubular calibre 20.</li>
				<li>Estructura terminada en pintura ep\xF3xica texturizada en color.</li>
				<li>Regat\xF3n nivelador de altura 100% polipropileno.</li></ul>
			<hr>
			<h4 class="${"svelte-1d56od4"}">Medidas</h4>
			<ul class="${"svelte-1d56od4"}"><li>Alto: 70 cm / 27.5 in</li>
				<li>Ancho: 120 cm / 47.2 in</li>
				<li>Profundo: 60 cm / 23.6 in</li>
				<li>*Consulta colores disponibles para entrega inmediata*</li></ul>
			<p class="${"note svelte-1d56od4"}">Los precios no incluyen IVA</p></div></section>
	<section class="${"svelte-1d56od4"}">${validate_component(ProductGallery, "ProductGallery").$$render($$result, {}, {}, {})}</section>

</main>`;
});
var css$1 = {
  code: "main.svelte-1fnc3j6{max-width:1084px;margin:38px auto}",
  map: `{"version":3,"file":"product.svelte","sources":["product.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\texport const prerender = true;\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n\\timport BreadCrumbs from '$lib/BreadCrumbs.svelte';\\r\\n\\timport ProductDetail from '$lib/ProductDetail.svelte';\\r\\n\\timport ProductSlider from '$lib/ProductSlider.svelte';\\r\\n\\timport ContactRibbon from '$lib/ContactRibbon.svelte';\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Producto - Manuel Delgado</title>\\r\\n</svelte:head>\\r\\n<main>\\r\\n\\t<BreadCrumbs />\\r\\n\\t<ProductDetail />\\r\\n</main>\\r\\n\\r\\n<ProductSlider title='Articulos recomendados' />\\r\\n<ContactRibbon />\\r\\n\\r\\n<style>\\r\\n\\tmain{\\r\\n\\t\\tmax-width: 1084px;\\r\\n\\t\\tmargin: 38px auto;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAuBC,mBAAI,CAAC,AACJ,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC"}`
};
var prerender$1 = true;
var Product = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Producto - Manuel Delgado</title>`, ""}`, ""}
<main class="${"svelte-1fnc3j6"}">${validate_component(BreadCrumbs, "BreadCrumbs").$$render($$result, {}, {}, {})}
	${validate_component(ProductDetail, "ProductDetail").$$render($$result, {}, {}, {})}</main>

${validate_component(ProductSlider, "ProductSlider").$$render($$result, { title: "Articulos recomendados" }, {}, {})}
${validate_component(ContactRibbon, "ContactRibbon").$$render($$result, {}, {}, {})}`;
});
var product = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Product,
  prerender: prerender$1
});
var css = {
  code: "nav.svelte-7ueqrg{max-width:1084px;margin:38px auto}main.svelte-7ueqrg{display:flex;max-width:1153px;margin:10px auto}",
  map: `{"version":3,"file":"cart.svelte","sources":["cart.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n\\texport const prerender = true;\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n\\timport BreadCrumbs from\\t'$lib/BreadCrumbs.svelte';\\r\\n\\timport ProductSlider from '$lib/ProductSlider.svelte';\\r\\n\\timport ContactRibbon from '$lib/ContactRibbon.svelte';\\r\\n\\timport PolicyInfo from '$lib/PolicyInfo.svelte';\\r\\n\\r\\n\\r\\n\\tlet routes = [\\r\\n\\t\\t{label: 'Inicio', link: '/'},\\r\\n\\t\\t{label: 'Carrito', link: '/cart'},\\r\\n\\t]\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n\\t<title>Carrito - Manuel Delgado</title>\\r\\n</svelte:head>\\r\\n<nav>\\r\\n\\t<BreadCrumbs {routes} />\\r\\n</nav>\\r\\n<main>\\r\\n\\t<section>\\r\\n\\t\\t\\r\\n\\t</section>\\r\\n\\t<section>\\r\\n\\t\\t\\r\\n\\t</section>\\r\\n</main>\\r\\n<ProductSlider />\\r\\n<ContactRibbon />\\r\\n\\r\\n<style>\\r\\n\\tnav{\\r\\n\\t\\tmax-width: 1084px;\\r\\n\\t\\tmargin: 38px auto;\\r\\n\\t}\\r\\n\\tmain{\\r\\n\\t\\tdisplay: flex;\\r\\n\\t\\tmax-width: 1153px;\\r\\n\\t\\tmargin: 10px auto;\\r\\n\\t}\\r\\n</style>"],"names":[],"mappings":"AAmCC,iBAAG,CAAC,AACH,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC,AACD,kBAAI,CAAC,AACJ,OAAO,CAAE,IAAI,CACb,SAAS,CAAE,MAAM,CACjB,MAAM,CAAE,IAAI,CAAC,IAAI,AAClB,CAAC"}`
};
var prerender = true;
var Cart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let routes = [{ label: "Inicio", link: "/" }, { label: "Carrito", link: "/cart" }];
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>Carrito - Manuel Delgado</title>`, ""}`, ""}
<nav class="${"svelte-7ueqrg"}">${validate_component(BreadCrumbs, "BreadCrumbs").$$render($$result, { routes }, {}, {})}</nav>
<main class="${"svelte-7ueqrg"}"><section></section>
	<section></section></main>
${validate_component(ProductSlider, "ProductSlider").$$render($$result, {}, {}, {})}
${validate_component(ContactRibbon, "ContactRibbon").$$render($$result, {}, {}, {})}`;
});
var cart = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Cart,
  prerender
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const encoding = isBase64Encoded ? "base64" : headers["content-encoding"] || "utf-8";
  const rawBody = typeof body === "string" ? Buffer.from(body, encoding) : body;
  const rendered = await render({
    method: httpMethod,
    headers,
    path,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
