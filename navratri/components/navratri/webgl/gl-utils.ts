export type GL = WebGLRenderingContext | WebGL2RenderingContext;

export interface Program {
  program: WebGLProgram;
  /** Active uniforms by name. Uniforms the compiler removed are absent. */
  uniforms: Record<string, WebGLUniformLocation | undefined>;
}

function compileShader(gl: GL, type: number, source: string): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("WebGL: could not create a shader");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS) && !gl.isContextLost()) {
    const log = gl.getShaderInfoLog(shader) ?? "unknown error";
    gl.deleteShader(shader);
    const kind = type === gl.VERTEX_SHADER ? "vertex" : "fragment";
    throw new Error(`WebGL: ${kind} shader failed to compile\n${log}`);
  }
  return shader;
}

/**
 * Compile and link a program with fixed attribute locations. The shader
 * objects are released as soon as the program is linked; only the program
 * itself needs deleting later.
 */
export function createProgram(
  gl: GL,
  vertexSource: string,
  fragmentSource: string,
  attributes: Record<string, number>,
): Program {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexSource);
  let fragment: WebGLShader;
  try {
    fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentSource);
  } catch (error) {
    gl.deleteShader(vertex);
    throw error;
  }

  const program = gl.createProgram();
  if (!program) {
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    throw new Error("WebGL: could not create a program");
  }

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  for (const [name, location] of Object.entries(attributes)) {
    gl.bindAttribLocation(program, location, name);
  }
  gl.linkProgram(program);
  gl.detachShader(program, vertex);
  gl.detachShader(program, fragment);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS) && !gl.isContextLost()) {
    const log = gl.getProgramInfoLog(program) ?? "unknown error";
    gl.deleteProgram(program);
    throw new Error(`WebGL: program failed to link\n${log}`);
  }

  const uniforms: Program["uniforms"] = {};
  const count = (gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number) ?? 0;
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i);
    if (!info) continue;
    const location = gl.getUniformLocation(program, info.name);
    // Arrays are reported as "name[0]"; address them by their bare name.
    if (location) uniforms[info.name.replace(/\[0\]$/, "")] = location;
  }

  return { program, uniforms };
}

/**
 * A `#rgb` or `#rrggbb` colour as 0‥1 floats, written into `out`. Anything
 * that does not parse leaves `out` as it was.
 */
export function hexToRgb(hex: string, out: Float32Array = new Float32Array(3)): Float32Array {
  const digits = hex.trim().replace(/^#/, "");
  const full = digits.length === 3 ? digits.replace(/./g, "$&$&") : digits;
  if (!/^[0-9a-f]{6}$/i.test(full)) return out;
  const value = parseInt(full, 16);
  out[0] = ((value >> 16) & 255) / 255;
  out[1] = ((value >> 8) & 255) / 255;
  out[2] = (value & 255) / 255;
  return out;
}

/** Human-readable GPU name, when the browser is willing to share it. */
export function describeRenderer(gl: GL): string {
  const info = gl.getExtension("WEBGL_debug_renderer_info");
  const name = info
    ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL)
    : gl.getParameter(gl.RENDERER);
  return typeof name === "string" && name ? name : "unknown";
}
